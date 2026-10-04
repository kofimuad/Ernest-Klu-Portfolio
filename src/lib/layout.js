import { isVideo, ratio } from '@/lib/media'

/**
 * Splits gallery media into rows: videos and every other landscape image get a
 * full-width row, the rest are paired side by side (portraits always pair up).
 * Each row item keeps its aspect ratio so paired images share one height.
 */
export function galleryRows(items) {
  const rows = []
  let i = 0
  while (i < items.length) {
    const item = items[i]
    const ar = ratio(item) || 1.5
    const next = items[i + 1]
    const canPair = next && !isVideo(next) && !isVideo(item)
    const wantsFull = isVideo(item) || (ar >= 1.2 && rows.length % 2 === 0)
    if (!wantsFull && canPair) {
      rows.push({ type: 'pair', items: [item, next] })
      i += 2
    } else {
      rows.push({ type: ar < 1 && !isVideo(item) ? 'solo' : 'full', items: [item] })
      i += 1
    }
  }
  return rows
}
