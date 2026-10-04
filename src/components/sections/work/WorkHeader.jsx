import styles from './WorkHeader.module.css'

export default function WorkHeader({ count, view, onViewChange }) {
  return (
    <header className={styles.wrap}>
      <h1 className={styles.title}>
        Work<sup className={styles.count}>{count}</sup>
      </h1>
      <div className={styles.side}>
        <p className={styles.desc}>
          Houses, commercial buildings, schools, churches, farms and studios,
          designed by Ernest across Ghana.
        </p>
        <div className={styles.toggle} role="group" aria-label="Layout">
          {['grid', 'list'].map((v) => (
            <button
              key={v}
              className={view === v ? styles.on : ''}
              aria-pressed={view === v}
              onClick={() => onViewChange(v)}
            >
              {v === 'grid' ? 'Grid' : 'Index'}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
