import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { STATS } from '@/data/content'
import styles from './Hero.module.css'

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Left: content panel */}
      <div className={styles.contentPanel}>
        <div className={styles.contentInner}>
          <p className={styles.tag}>Architecture &amp; Sound Design</p>
          <h1 className={styles.headline}>
            Designing<br />
            Spaces.<br />
            <em>Engineering<br />Experiences.</em>
          </h1>
          <p className={styles.sub}>
            Architecture and sound design for modern residential,
            commercial, and experiential spaces.
          </p>
          <div className={styles.btns}>
            <Button onClick={() => navigate('/contact')}>Hire Ernest</Button>
            <Button variant="ghost" onClick={() => navigate('/work')}>View Projects</Button>
          </div>
        </div>

        <div className={styles.statsRow}>
          {STATS.map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <div className={styles.statNum}>{value}</div>
              <div className={styles.statLbl}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: image panel */}
      <div className={styles.imagePanel} aria-hidden="true">
        <div className={styles.imageInner} />
        <div className={styles.imageOverlay} />
        <div className={styles.imageCaption}>
          <p className={styles.captionName}>Ernest Klu</p>
          <p className={styles.captionRole}>Architect · Sound Engineer · Accra, GH</p>
        </div>
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollIndicatorLabel}>Scroll</span>
          <span className={styles.scrollIndicatorLine} />
        </div>
      </div>
    </section>
  )
}
