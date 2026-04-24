import { TRUST_ITEMS } from '@/data/content'
import styles from './TrustBar.module.css'

export default function TrustBar() {
  return (
    <div className={styles.wrap} aria-label="Key statistics">
      {TRUST_ITEMS.map(({ value, label }) => (
        <div key={label} className={styles.item}>
          <span className={styles.num}>{value}</span>
          <span className={styles.lbl}>{label}</span>
        </div>
      ))}
    </div>
  )
}
