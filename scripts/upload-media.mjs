#!/usr/bin/env node
/**
 * Uploads project photos and videos to Cloudinary and writes src/data/media.json.
 *
 *   npm run media:upload -- "C:\Users\you\Downloads\WEBSITE FILES"
 *   npm run media:upload -- "<folder>" "<another folder>"   (several sources at once)
 *   npm run media:upload -- "<folder>" --dry-run            (show what would happen)
 *   npm run media:upload -- "<folder>" --force              (re-upload files already in media.json)
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
 * location "Madina", category "Commercial"). Folders with the same name in
 * different sources are merged. Files appear on the site in file-name order;
 * the first photo is the cover.
 *
 * The Cloudinary free plan caps uploads at 100 MB per video and 10 MB per
 * image. Bigger files are re-encoded with ffmpeg first (bundled through the
 * ffmpeg-static package). Every video is also given a still frame as its
 * poster image. Re-encoded files are cached in .media-cache/ so a re-run
 * does not encode them again.
 */
import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MANIFEST = join(ROOT, 'src', 'data', 'media.json')
const CACHE = join(ROOT, '.media-cache')
const PREFIX = 'ernest-klu/projects'
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.gif'])
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm', '.avi', '.mkv'])
const MB = 1024 * 1024
const CHUNK = Number(process.env.CLOUDINARY_CHUNK_BYTES) || 20 * MB
const IMAGE_LIMIT = 10 * MB // Cloudinary free plan, per image
const VIDEO_LIMIT = 100 * MB // Cloudinary free plan, per video
const VIDEO_TARGET = 88 * MB // aim below the limit to leave room for encoder overshoot
const CONCURRENCY = 3

const args = process.argv.slice(2)
const flags = new Set(args.filter((a) => a.startsWith('--')))
const sources = args.filter((a) => !a.startsWith('--'))
const dryRun = flags.has('--dry-run')
const force = flags.has('--force')

function loadEnv() {
  for (const name of ['.env.local', '.env']) {
    const file = join(ROOT, name)
    if (!existsSync(file)) continue
    for (const line of readFileSync(file, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/)) {
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

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
const mb = (n) => `${(n / MB).toFixed(1)} MB`

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

/** Groups media files by project slug across every source folder. */
function scan(rootDirs) {
  const projects = new Map()
  for (const rootDir of rootDirs) {
    for (const file of walk(rootDir)) {
      const ext = extname(file).toLowerCase()
      const type = IMAGE_EXT.has(ext) ? 'image' : VIDEO_EXT.has(ext) ? 'video' : null
      if (!type) continue
      const folder = dirname(file)
      const name = basename(folder)
      const slug = slugify(name)
      if (!projects.has(slug)) {
        const parent = dirname(folder)
        projects.set(slug, {
          slug,
          ...parseFolderName(name),
          category: resolve(parent) === resolve(rootDir) ? '' : parseCategory(basename(parent)),
          folder: relative(rootDir, folder) || '.',
          files: [],
        })
      }
      const stat = statSync(file)
      projects.get(slug).files.push({ file, type, size: stat.size, mtime: stat.mtimeMs })
    }
  }

  for (const p of projects.values()) {
    p.files.sort((a, b) => collator.compare(basename(a.file), basename(b.file)))
    const used = new Set()
    for (const f of p.files) {
      let id = slugify(basename(f.file, extname(f.file))) || 'file'
      while (used.has(id)) id += '-x'
      used.add(id)
      f.publicId = `${PREFIX}/${p.slug}/${id}`
    }
  }
  return [...projects.values()].sort((a, b) => collator.compare(a.folder, b.folder))
}

/* ── ffmpeg ─────────────────────────────────────────────── */

let ffmpegBin
async function findFfmpeg() {
  if (ffmpegBin !== undefined) return ffmpegBin
  const candidates = [process.env.FFMPEG_PATH]
  try { candidates.push((await import('ffmpeg-static')).default) } catch { /* not installed */ }
  candidates.push('ffmpeg')
  for (const bin of candidates.filter(Boolean)) {
    const ok = await run(bin, ['-version']).then(() => true, () => false)
    if (ok) return (ffmpegBin = bin)
  }
  return (ffmpegBin = null)
}

function run(bin, argv, onStderr) {
  return new Promise((res, rej) => {
    const child = spawn(bin, argv, { windowsHide: true })
    let err = ''
    child.stderr.on('data', (d) => {
      const s = d.toString()
      err = (err + s).slice(-20000)
      onStderr?.(s)
    })
    child.on('error', rej)
    child.on('close', (code) => {
      if (code === 0) return res(err)
      const e = new Error(err.split('\n').slice(-4).join(' ').trim() || `${bin} exited ${code}`)
      e.stderr = err
      rej(e)
    })
  })
}

/** Duration, size and codecs from ffmpeg's banner (avoids needing ffprobe). */
async function probe(file) {
  // ffmpeg exits with an error when given no output, but still prints the stream info.
  const out = await run(ffmpegBin, ['-hide_banner', '-i', file]).catch((e) => e.stderr || '')
  const d = out.match(/Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/)
  const v = out.match(/Video: (\w+).*?, (\d{2,5})x(\d{2,5})/)
  return {
    duration: d ? +d[1] * 3600 + +d[2] * 60 + +d[3] : 0,
    codec: v?.[1] || '',
    width: v ? +v[2] : 0,
    height: v ? +v[3] : 0,
    audio: /Audio: /.test(out),
  }
}

function cachePath(f, suffix) {
  const key = createHash('sha1').update(`${f.file}|${f.size}|${f.mtime}`).digest('hex').slice(0, 12)
  mkdirSync(CACHE, { recursive: true })
  return join(CACHE, `${slugify(basename(f.file, extname(f.file)))}-${key}${suffix}`)
}

function progress(label, duration) {
  let last = -1
  return (s) => {
    const m = s.match(/time=(\d+):(\d+):(\d+(?:\.\d+)?)/)
    if (!m || !duration) return
    const pct = Math.min(99, Math.floor(((+m[1] * 3600 + +m[2] * 60 + +m[3]) / duration) * 100))
    if (pct !== last) {
      last = pct
      process.stdout.write(`\r     ${label}: compressing ${pct}%   `)
    }
  }
}

/** Re-encodes a video to H.264 MP4 that fits under the free-plan upload limit. */
async function prepareVideo(f) {
  const info = await probe(f.file)
  f.width = info.width
  f.height = info.height
  const isWebReady = info.codec === 'h264' && extname(f.file).toLowerCase() === '.mp4'
  if (isWebReady && f.size <= VIDEO_TARGET) {
    f.web = true
    return f.file
  }
  const out = cachePath(f, '.mp4')
  if (existsSync(out) && statSync(out).size < VIDEO_LIMIT) {
    f.web = true
    return out
  }
  if (!info.duration) throw new Error('could not read the video length')

  const audioK = info.audio ? 128 : 0
  let factor = 0.92
  for (let attempt = 1; attempt <= 3; attempt++) {
    // Bitrate that lands the whole file near VIDEO_TARGET, capped at 6 Mbps.
    const budgetK = (VIDEO_TARGET * 8) / 1000 / info.duration
    const videoK = Math.floor(Math.min(6000, budgetK * factor - audioK))
    if (videoK < 250) throw new Error(`too long (${Math.round(info.duration / 60)} min) to fit in 100 MB; trim it first`)
    const maxW = videoK >= 2500 ? 1920 : videoK >= 1100 ? 1280 : 960
    const argv = [
      '-hide_banner', '-y', '-i', f.file,
      '-map', '0:v:0', ...(info.audio ? ['-map', '0:a:0'] : []),
      '-vf', `scale='min(${maxW},iw)':-2`,
      '-c:v', 'libx264', '-preset', 'medium', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-b:v', `${videoK}k`, '-maxrate', `${Math.floor(videoK * 1.5)}k`, '-bufsize', `${videoK * 2}k`,
      ...(info.audio ? ['-c:a', 'aac', '-b:a', '128k', '-ac', '2'] : ['-an']),
      '-movflags', '+faststart',
      out,
    ]
    await run(ffmpegBin, argv, progress(basename(f.file), info.duration))
    process.stdout.write(`\r     ${basename(f.file)}: compressed ${mb(f.size)} -> ${mb(statSync(out).size)}          \n`)
    if (statSync(out).size < VIDEO_LIMIT) {
      f.web = true
      return out
    }
    factor *= 0.8
  }
  throw new Error('still over 100 MB after compressing')
}

/** Grabs a still from a video to use as its poster/cover image. */
async function makePoster(f, input) {
  const out = cachePath(f, '-poster.jpg')
  if (existsSync(out)) return out
  const info = await probe(input)
  const at = info.duration ? Math.min(3, info.duration * 0.1).toFixed(2) : '0'
  await run(ffmpegBin, ['-hide_banner', '-y', '-ss', at, '-i', input, '-frames:v', '1', '-vf', "scale='min(2400,iw)':-2", '-q:v', '3', out])
  return out
}

/** Shrinks a photo that is over the free-plan 10 MB limit. */
async function prepareImage(f) {
  if (f.size <= IMAGE_LIMIT) return f.file
  const out = cachePath(f, '.jpg')
  if (!existsSync(out)) {
    await run(ffmpegBin, ['-hide_banner', '-y', '-i', f.file, '-vf', "scale='min(4800,iw)':-2", '-q:v', '3', out])
  }
  return out
}

/* ── Upload ─────────────────────────────────────────────── */

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

async function upload(env, { path, publicId, type }) {
  const params = {
    public_id: publicId,
    overwrite: 'true',
    timestamp: Math.floor(Date.now() / 1000),
  }
  const signature = sign(params, env.secret)
  const url = `${process.env.CLOUDINARY_API_BASE || 'https://api.cloudinary.com'}/v1_1/${env.cloud}/${type}/upload`
  const data = readFileSync(path)
  const makeForm = (blob) => {
    const form = new FormData()
    for (const [k, v] of Object.entries(params)) form.append(k, String(v))
    form.append('api_key', env.key)
    form.append('signature', signature)
    form.append('file', blob, basename(path))
    return form
  }

  if (data.length <= CHUNK) return post(url, makeForm(new Blob([data])))

  // Large files go up in 20 MB chunks.
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

/* ── Main ───────────────────────────────────────────────── */

async function main() {
  if (!sources.length) {
    console.error('Usage: npm run media:upload -- "<media folder>" ["<another folder>"] [--dry-run] [--force]')
    process.exit(1)
  }
  const rootDirs = sources.map((s) => resolve(s))
  for (const dir of rootDirs) {
    if (!existsSync(dir)) {
      console.error(`Folder not found: ${dir}`)
      process.exit(1)
    }
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

  const projects = scan(rootDirs)
  if (!projects.length) {
    console.log('No photos or videos found.')
    return
  }

  const ffmpeg = await findFfmpeg()
  const queue = []
  for (const p of projects) {
    const existing = new Map((manifest.projects[p.slug]?.items || []).map((m) => [m.id, m]))
    console.log(`\n${p.folder}\n  -> ${p.slug}  (${p.title}${p.location ? `, ${p.location}` : ''}${p.category ? ` | ${p.category}` : ''})`)
    for (const f of p.files) {
      f.done = !force && existing.get(f.publicId)
      const limit = f.type === 'video' ? VIDEO_TARGET : IMAGE_LIMIT
      const note = f.done
        ? 'already uploaded'
        : f.size > limit
          ? ffmpeg ? 'will be compressed first' : 'too big for the free plan; install ffmpeg to compress it'
          : ''
      console.log(`     ${f.type === 'video' ? 'video' : 'photo'}  ${basename(f.file)}  ${mb(f.size)}${note ? `  [${note}]` : ''}`)
      if (!f.done) queue.push(f)
    }
  }

  console.log(`\n${queue.length} file(s) to upload.`)
  if (!ffmpeg && queue.some((f) => f.type === 'video')) {
    console.log('ffmpeg not found: run "npm install" so ffmpeg-static is available. Videos will upload without compression or poster images.')
  }
  if (dryRun || !queue.length) {
    if (dryRun) console.log('Dry run: nothing uploaded.')
    if (!dryRun) writeManifest(manifest, projects)
    return
  }

  // Encode first, one file at a time (CPU heavy), then upload in parallel.
  const failures = []
  const fail = (f, err) => {
    failures.push(`${f.file}: ${err.message}`)
    console.log(`     FAILED ${basename(f.file)}: ${err.message}`)
  }
  const jobs = []
  if (ffmpeg && queue.some((f) => f.type === 'video' || f.size > IMAGE_LIMIT)) console.log('\nPreparing files...')
  for (const f of queue) {
    try {
      if (f.type === 'video' && ffmpeg) {
        f.path = await prepareVideo(f)
        f.posterPath = await makePoster(f, f.path)
      } else if (f.type === 'image' && ffmpeg) {
        f.path = await prepareImage(f)
      } else {
        f.path = f.file
      }
      jobs.push(f)
    } catch (err) {
      fail(f, err)
    }
  }

  console.log('\nUploading...')
  let done = 0
  await pool(jobs, CONCURRENCY, async (f) => {
    try {
      const res = await upload(env, { path: f.path, publicId: f.publicId, type: f.type })
      const item = { id: res.public_id, type: f.type, w: res.width || f.width, h: res.height || f.height }
      if (f.type === 'video') {
        if (res.duration) item.duration = Math.round(res.duration)
        if (f.web) item.web = true
        if (f.posterPath) {
          const poster = await upload(env, { path: f.posterPath, publicId: `${f.publicId}-poster`, type: 'image' })
          item.poster = poster.public_id
        }
      }
      f.done = item
      console.log(`  [${++done}/${jobs.length}] ${f.publicId}`)
    } catch (err) {
      ++done
      fail(f, err)
    }
  })

  writeManifest(manifest, projects)
  if (failures.length) {
    console.log(`\n${failures.length} file(s) failed (re-run the same command to retry just these):\n  ${failures.join('\n  ')}`)
    process.exitCode = 1
  }
}

/** Adds this run's uploads to media.json, keeping items uploaded in earlier runs. */
function writeManifest(manifest, projects) {
  for (const p of projects) {
    const prev = manifest.projects[p.slug] || {}
    const byId = new Map((prev.items || []).map((i) => [i.id, i]))
    for (const f of p.files) if (f.done) byId.set(f.done.id, f.done)
    if (!byId.size) continue
    const items = [...byId.values()].sort((a, b) => collator.compare(a.id, b.id))
    manifest.projects[p.slug] = {
      title: p.title,
      location: p.location,
      category: p.category,
      ...(prev.cover && byId.has(prev.cover) ? { cover: prev.cover } : {}),
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
