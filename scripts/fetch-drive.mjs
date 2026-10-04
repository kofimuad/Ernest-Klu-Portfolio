#!/usr/bin/env node
/**
 * Downloads the project photos listed in scripts/drive-files.json from the
 * shared Google Drive folder into .media-cache/drive/, keeping the Drive
 * folder layout (Category/Project/file). `npm run media:drive` then uploads
 * that folder with upload-media.mjs.
 *
 * The Drive files must be shared as "Anyone with the link". Files already
 * downloaded (same size) are skipped.
 */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, '.media-cache', 'drive')
const LIST = JSON.parse(readFileSync(join(ROOT, 'scripts', 'drive-files.json'), 'utf8'))
const BASE = process.env.DRIVE_DOWNLOAD_BASE || 'https://drive.usercontent.google.com/download'

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`

function looksLikeImage(buf) {
  if (buf.length < 4) return false
  const jpg = buf[0] === 0xff && buf[1] === 0xd8
  const png = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47
  const webp = buf.subarray(0, 4).toString() === 'RIFF'
  return jpg || png || webp
}

async function download(file) {
  const url = `${BASE}?id=${encodeURIComponent(file.id)}&export=download&confirm=t`
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'follow' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (!looksLikeImage(buf)) {
        const err = new Error('Drive returned a web page instead of the photo; check the file is shared with "Anyone with the link"')
        err.fatal = true
        throw err
      }
      if (file.size && buf.length !== file.size) throw new Error(`incomplete download (${buf.length} of ${file.size} bytes)`)
      return buf
    } catch (err) {
      if (err.fatal || attempt >= 4) throw err
      await new Promise((r) => setTimeout(r, 2000 * attempt))
    }
  }
}

async function main() {
  console.log(`Downloading ${LIST.files.length} photos from Google Drive...\n`)
  let failed = 0
  for (const file of LIST.files) {
    const dest = join(OUT, ...file.path.split('/'))
    if (existsSync(dest) && (!file.size || statSync(dest).size === file.size)) {
      console.log(`  already downloaded  ${file.path}`)
      continue
    }
    try {
      const buf = await download(file)
      mkdirSync(dirname(dest), { recursive: true })
      writeFileSync(dest, buf)
      console.log(`  downloaded  ${file.path}  ${mb(buf.length)}`)
    } catch (err) {
      failed++
      console.log(`  FAILED  ${file.path}: ${err.message}`)
    }
  }
  if (failed) {
    console.log(`\n${failed} photo(s) failed to download. Fix that and run the command again.`)
    process.exit(1)
  }
  console.log(`\nAll photos are in ${OUT}\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
