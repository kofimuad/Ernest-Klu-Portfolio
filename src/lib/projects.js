/**
 * Builds the project list the site renders: entries from content.js merged
 * with their Cloudinary media from media.json. Media folders that have no
 * entry in content.js still show up, using the title, location and category
 * parsed from their folder names.
 */
import { PROJECTS as CONTENT, CATEGORY_ORDER, DISCIPLINE_FILTERS } from '@/data/content'
import manifest from '@/data/media.json'
import { isVideo } from '@/lib/media'

function withMedia(project) {
  const entry = manifest.projects[project.id]
  const media = entry?.items?.length ? entry.items : project.image ? [project.image] : []
  const cover =
    media.find((m) => typeof m === 'object' && m.id === entry?.cover) ||
    media.find((m) => !isVideo(m)) ||
    media[0] ||
    null
  return { ...project, media, cover }
}

/** A media folder named "Portrait" is used for the About page photo, not as a project. */
const RESERVED = new Set(['portrait'])
export const PORTRAIT = manifest.projects.portrait?.items?.find((m) => !isVideo(m)) || null

const known = new Set(CONTENT.map((p) => p.id))
const discovered = Object.entries(manifest.projects)
  .filter(([id]) => !known.has(id) && !RESERVED.has(id))
  .map(([id, entry]) => ({
    id,
    title: entry.title || id,
    category: entry.category || 'Other',
    location: entry.location || '',
    tags: ['Architecture'],
    description: '',
  }))

export const PROJECTS = [...CONTENT, ...discovered]
  .map(withMedia)
  .filter((p) => p.cover)
  .map((p, i) => ({ ...p, num: String(i + 1).padStart(2, '0') }))

export const FEATURED = PROJECTS.filter((p) => p.featured)

export const CATEGORIES = [
  ...CATEGORY_ORDER.filter((c) => PROJECTS.some((p) => p.category === c)),
  ...[...new Set(PROJECTS.map((p) => p.category))].filter((c) => !CATEGORY_ORDER.includes(c)),
]

export const FILTERS = ['All', ...DISCIPLINE_FILTERS.filter((d) => PROJECTS.some((p) => p.tags.includes(d))), ...CATEGORIES]

export function matchesFilter(project, filter) {
  if (!filter || filter === 'All') return true
  return project.category === filter || project.tags.includes(filter)
}

export function getProject(id) {
  return PROJECTS.find((p) => p.id === id) || null
}

export function getNeighbours(id) {
  const i = PROJECTS.findIndex((p) => p.id === id)
  if (i === -1) return {}
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  }
}
