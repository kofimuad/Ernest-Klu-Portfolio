import { MARQUEE_ITEMS } from '@/data/content'
import styles from './Marquee.module.css'

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {items.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}<span className={styles.dot}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
