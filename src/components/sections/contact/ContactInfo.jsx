import { SITE } from '@/data/content'
import styles from './ContactInfo.module.css'

export default function ContactInfo() {
  return (
    <div className={styles.wrap}>
      <div className={styles.block}>
        <span className={styles.label}>Location</span>
        <p className={styles.value}>{SITE.location}</p>
      </div>
      <div className={styles.block}>
        <span className={styles.label}>Availability</span>
        <p className={styles.value}>{SITE.availability}</p>
      </div>
      <div className={styles.block}>
        <span className={styles.label}>Email</span>
        <p className={styles.value}>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </div>
      <div className={styles.block}>
        <span className={styles.label}>Social</span>
        <div className={styles.social}>
          <a href={SITE.social.behance}   target="_blank" rel="noopener noreferrer">Behance</a>
          <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={SITE.social.twitter}   target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
      <div className={styles.responseBox}>
        <span className={styles.responseLabel}>Typical Response Time</span>
        <p className={styles.responseVal}>{SITE.responseTime}</p>
      </div>
    </div>
  )
}
