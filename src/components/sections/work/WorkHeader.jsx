import Eyebrow from '@/components/ui/Eyebrow'
import styles from './WorkHeader.module.css'

export default function WorkHeader() {
  return (
    <div className={styles.wrap}>
      <div>
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className={styles.title}>Selected <em>Projects</em></h1>
      </div>
      <p className={styles.desc}>
        12+ projects across residential, commercial, healthcare,
        hospitality, and acoustic design.
      </p>
    </div>
  )
}
