#!/usr/bin/env node
/**
 * Uploads project photos and videos to Cloudinary and writes src/data/media.json.
 *
 *   npm run media:upload -- "C:\Users\you\Downloads\WEBSITE FILES"
 *   npm run media:upload -- "<folder>" --dry-run     (show what would happen)
 *   npm run media:upload -- "<folder>" --force       (re-upload files already in media.json)
 *
 * Credentials come from .env.local in the project root (never commit it):
 *   CLOUDINARY_CLOUD_NAME=...
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 *
 * Folder layout: every folder that directly contains photos or videos is one
 * project. Its parent folder is the category, so
 *   WEBSITE FILES/Commercial Projects/Akwaaba Rooftop- Madina/1_1 - Photo.jpg
 * becomes project "akwaaba-rooftop-madina" (title "Akwaaba Rooftop",
 * location "Madina", category "Commercial"). Files appear on the site in
 * file-name order; the first photo is the cover.
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MANIFEST = join(ROOT, 'src', 'data', 'media.json')
const PREFIX = 'ernest-klu/projects'
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.gif'])
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm', '.avi', '.mkv'])
const CHUNK = Number(process.env.CLOUDINARY_CHUNK_BYTES) || 20 * 1024 * 1024
const IMAGE_LIMIT = 10 * 1024 * 1024 // Cloudinary free plan limit per image
const CONCURRENCY = 3

const args = process.argv.slice(2)
const flags = new Set(args.filter((a) => a.startsWith('--')))
const source = args.find((a) => !a.startsWith('--'))
const dryRun = flags.has('--dry-run')
const force = flags.has('--force')

function loadEnv() {
  for (const name of ['.env.local', '.env']) {
    const file = join(ROOT, name)
    if (!existsSync(file)) continue
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
  const url = process.env.CLOUDINARY_URL?.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/)
  return {
    cloud: process.env.CLOUDINARY_CLOUD_NAME || url?.[3],
    key: process.env.CLOUDINARY_API_KEY || url?.[1],
    secret: process.env.CLOUDINARY_API_SECRET || url?.[2],
  }
}

export function slugify(s) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** "Akwaaba Rooftop- Madina" -> { title: "Akwaaba Rooftop", location: "Madina" } */
export function parseFolderName(name) {
  const [title, ...rest] = name.split(/\s*-\s+|\s+-\s*/)
  return { title: title.trim(), location: rest.join(' - ').trim() }
}

export function parseCategory(name) {
  return name.replace(/\bprojects?\b/i, '').trim()
}

/** Cloudinary signature: sorted key=value pairs joined by &, then the secret, SHA-1. */
export function sign(params, secret) {
  const payload = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== '')
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return createHash('sha1').update(payload + secret).digest('hex')
}

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function scan(rootDir) {
  const groups = new Map()
  for (const file of walk(rootDir)) {
    const ext = extname(file).toLowerCase()
    const type = IMAGE_EXT.has(ext) ? 'image' : VIDEO_EXT.has(ext) ? 'video' : null
    if (!type) continue
    const folder = dirname(file)
    if (!groups.has(folder)) groups.set(folder, [])
    groups.get(folder).push({ file, type, size: statSync(file).size })
  }

  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
  const projects = []
  for (const [folder, files] of groups) {
    const name = basename(folder)
    const parent = dirname(folder)
    const slug = slugify(name)
    const { title, location } = parseFolderName(name)
    files.sort((a, b) => collator.compare(basename(a.file), basename(b.file)))
    const used = new Set()
    for (const f of files) {
      let id = slugify(basename(f.file, extname(f.file))) || 'file'
      while (used.has(id)) id += '-x'
      used.add(id)
      f.publicId = `${PREFIX}/${slug}/${id}`
    }
    projects.push({
      slug,
      title,
      location,
      category: resolve(parent) === resolve(rootDir) ? '' : parseCategory(basename(parent)),
      folder: relative(rootDir, folder) || '.',
      files,
    })
  }
  return projects.sort((a, b) => collator.compare(a.folder, b.folder))
}

async function post(url, form, headers = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { method: 'POST', body: form, headers })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body?.error?.message || `HTTP ${res.status}`)
      return body
    } catch (err) {
      if (attempt >= 3 || /Invalid|Signature|File size too large|api_key/i.test(err.message)) throw err
      await new Promise((r) => setTimeout(r, 1500 * attempt))
    }
  }
}

async function upload(env, item) {
  const params = {
    public_id: item.publicId,
    overwrite: 'true',
    timestamp: Math.floor(Date.now() / 1000),
  }
  const signature = sign(params, env.secret)
  const url = `${process.env.CLOUDINARY_API_BASE || 'https://api.cloudinary.com'}/v1_1/${env.cloud}/${item.type}/upload`
  const data = readFileSync(item.file)
  const makeForm = (blob) => {
    const form = new FormData()
    for (const [k, v] of Object.entries(params)) form.append(k, String(v))
    form.append('api_key', env.key)
    form.append('signature', signature)
    form.append('file', blob, basename(item.file))
    return form
  }

  if (data.length <= CHUNK) return post(url, makeForm(new Blob([data])))

  // Large files (mostly videos) go up in 20 MB chunks.
  const uploadId = `ek-${Date.now()}-${Math.random().toString(36).slice(2)}`
  let result
  for (let start = 0; start < data.length; start += CHUNK) {
    const end = Math.min(start + CHUNK, data.length) - 1
    result = await post(url, makeForm(new Blob([data.subarray(start, end + 1)])), {
      'X-Unique-Upload-Id': uploadId,
      'Content-Range': `bytes ${start}-${end}/${data.length}`,
    })
  }
  return result
}

async function pool(items, limit, fn) {
  let i = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) await fn(items[i++])
  })
  await Promise.all(workers)
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`

async function main() {
  if (!source) {
    console.error('Usage: npm run media:upload -- "<path to media folder>" [--dry-run] [--force]')
    process.exit(1)
  }
  const rootDir = resolve(source)
  if (!existsSync(rootDir)) {
    console.error(`Folder not found: ${rootDir}`)
    process.exit(1)
  }

  const env = loadEnv()
  if (!dryRun && (!env.cloud || !env.key || !env.secret)) {
    console.error('Missing Cloudinary credentials. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local')
    process.exit(1)
  }

  const manifest = existsSync(MANIFEST)
    ? JSON.parse(readFileSync(MANIFEST, 'utf8'))
    : { cloudName: '', projects: {} }
  if (env.cloud && manifest.cloudName && manifest.cloudName !== env.cloud && !force) {
    console.error(`media.json was built for cloud "${manifest.cloudName}" but .env.local says "${env.cloud}". Re-run with --force to replace everything.`)
    process.exit(1)
  }
  if (env.cloud) manifest.cloudName = env.cloud

  const projects = scan(rootDir)
  if (!projects.length) {
    console.log('No photos or videos found.')
    return
  }

  const queue = []
  for (const p of projects) {
    const existing = new Map((manifest.projects[p.slug]?.items || []).map((m) => [m.id, m]))
    console.log(`\n${p.folder}\n  -> ${p.slug}  (${p.title}${p.location ? `, ${p.location}` : ''}${p.category ? ` | ${p.category}` : ''})`)
    for (const f of p.files) {
      f.done = !force && existing.get(f.publicId)
      const note = f.done
        ? 'already uploaded'
        : f.type === 'image' && f.size > IMAGE_LIMIT
          ? 'over 10 MB, may be rejected on the free plan'
          : ''
      console.log(`     ${f.type === 'video' ? 'video' : 'photo'}  ${basename(f.file)}  ${mb(f.size)}${note ? `  [${note}]` : ''}`)
      if (!f.done) queue.push(f)
    }
  }

  const total = queue.reduce((n, f) => n + f.size, 0)
  console.log(`\n${queue.length} file(s) to upload, ${mb(total)} total.`)
  if (dryRun || !queue.length) {
    if (dryRun) console.log('Dry run: nothing uploaded.')
    if (!dryRun) writeManifest(manifest, projects)
    return
  }

  let done = 0
  const failures = []
  await pool(queue, CONCURRENCY, async (f) => {
    try {
      const res = await upload(env, f)
      f.done = { id: res.public_id, type: f.type, w: res.width, h: res.height }
      if (f.type === 'video' && res.duration) f.done.duration = Math.round(res.duration)
      console.log(`  [${++done}/${queue.length}] ${f.publicId}`)
    } catch (err) {
      failures.push(`${f.file}: ${err.message}`)
      console.log(`  [${++done}/${queue.length}] FAILED ${basename(f.file)}: ${err.message}`)
    }
  })

  writeManifest(manifest, projects)
  if (failures.length) {
    console.log(`\n${failures.length} upload(s) failed:\n  ${failures.join('\n  ')}`)
    process.exitCode = 1
  }
}

function writeManifest(manifest, projects) {
  for (const p of projects) {
    const items = p.files.map((f) => f.done).filter(Boolean)
    if (!items.length) continue
    const prev = manifest.projects[p.slug] || {}
    manifest.projects[p.slug] = {
      title: p.title,
      location: p.location,
      category: p.category,
      ...(prev.cover && items.some((i) => i.id === prev.cover) ? { cover: prev.cover } : {}),
      items,
    }
  }
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\nWrote ${relative(ROOT, MANIFEST)}. Commit it to publish the media.`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
