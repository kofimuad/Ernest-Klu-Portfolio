import { WORK_FILTERS } from '@/data/content'
import styles from './WorkFilters.module.css'

export default function WorkFilters({ active, onChange }) {
  return (
    <div className={styles.wrap} role="group" aria-label="Filter projects by category">
      {WORK_FILTERS.map((f) => (
        <button
          key={f}
          className={`${styles.btn} ${active === f ? styles.active : ''}`}
          onClick={() => onChange(f)}
          aria-pressed={active === f}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
