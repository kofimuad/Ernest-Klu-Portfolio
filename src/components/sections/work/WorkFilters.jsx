import { FILTERS, PROJECTS, matchesFilter } from '@/lib/projects'
import styles from './WorkFilters.module.css'

const counts = Object.fromEntries(FILTERS.map((f) => [f, PROJECTS.filter((p) => matchesFilter(p, f)).length]))

export default function WorkFilters({ active, onChange }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner} role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.btn} ${active === f ? styles.active : ''}`}
            onClick={() => onChange(f)}
            aria-pressed={active === f}
          >
            {f}<span className={styles.n}>{counts[f]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
