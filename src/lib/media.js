/**
 * Media helpers.
 *
 * A media item is either a plain URL string (legacy Behance images) or an
 * object from src/data/media.json:
 *   { id: 'ernest-klu/projects/idl-centre-knust/01', type: 'image' | 'video', w, h }
 *
 * Cloudinary items are resized and compressed on the fly, so the site never
 * ships the multi-megabyte originals.
 */
import manifest from '@/data/media.json'

const CLOUD = manifest.cloudName
const BASE = CLOUD ? `https://res.cloudinary.com/${CLOUD}` : ''

export const WIDTHS = [480, 800, 1200, 1600, 2400]

export function isVideo(item) {
  return typeof item === 'object' && item?.type === 'video'
}

export function imageUrl(item, width = 1600) {
  if (!item) return ''
  if (typeof item === 'string') return item
  if (!BASE) return ''
  if (isVideo(item)) return posterUrl(item, width)
  return `${BASE}/image/upload/f_auto,q_auto,c_limit,w_${width}/${item.id}`
}

export function srcSet(item) {
  if (!item || typeof item === 'string' || !BASE) return undefined
  const max = item.w || Infinity
  const widths = WIDTHS.filter((w) => w <= max * 1.1)
  if (!widths.length) widths.push(WIDTHS[0])
  return widths.map((w) => `${imageUrl(item, w)} ${w}w`).join(', ')
}

export function videoUrl(item) {
  return `${BASE}/video/upload/q_auto,c_limit,w_1920/${item.id}.mp4`
}

export function posterUrl(item, width = 1600) {
  return `${BASE}/video/upload/so_0,f_auto,q_auto,c_limit,w_${width}/${item.id}.jpg`
}

export function ratio(item) {
  if (item && typeof item === 'object' && item.w && item.h) return item.w / item.h
  return null
}

export function projectMedia(projectId) {
  return manifest.projects[projectId] || null
}
