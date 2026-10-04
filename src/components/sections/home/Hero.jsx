import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Img from '@/components/ui/Img'
import { FEATURED, PROJECTS } from '@/lib/projects'
import styles from './Hero.module.css'

const SLIDE_MS = 6000
const slides = FEATURED.length ? FEATURED : PROJECTS.slice(0, 4)

export default function Hero() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [active])

  const current = slides[active]

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.contentPanel}>
        <div className={styles.contentInner}>
          <p className={styles.tag}>Architect &amp; Sound Engineer · Accra</p>
          <h1 className={styles.headline}>
            Buildings<br />
            that work,<br />
            <em>rooms that<br />sound right.</em>
          </h1>
          <p className={styles.sub}>
            Ernest Klu designs homes, commercial buildings, schools, churches
            and studios across Ghana, with acoustics planned in from the first
            drawing.
          </p>
          <div className={styles.btns}>
            <Button onClick={() => navigate('/work')}>See the work</Button>
            <Button variant="ghost" onClick={() => navigate('/contact')}>Start a project</Button>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.statNum}>{PROJECTS.length}</div>
            <div className={styles.statLbl}>Projects</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>2</div>
            <div className={styles.statLbl}>Disciplines</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>5+</div>
            <div className={styles.statLbl}>Years</div>
          </div>
        </div>
      </div>

      <div className={styles.imagePanel}>
        {slides.map((p, i) => (
          <div key={p.id} className={`${styles.slide} ${i === active ? styles.slideOn : ''}`} aria-hidden={i !== active}>
            <Img item={p.cover} alt="" sizes="(max-width: 1024px) 100vw, 55vw" width={2400} eager={i === 0} className={styles.slideImg} />
          </div>
        ))}
        <div className={styles.imageOverlay} aria-hidden="true" />

        {current && (
          <Link to={`/work/${current.id}`} className={styles.imageCaption} key={current.id}>
            <span className={styles.captionRole}>{current.category} · {current.location}</span>
            <span className={styles.captionName}>{current.title} <span aria-hidden="true">→</span></span>
          </Link>
        )}

        {slides.length > 1 && (
          <div className={styles.dots}>
            {slides.map((p, i) => (
              <button
                key={p.id}
                className={`${styles.dot} ${i === active ? styles.dotOn : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Show ${p.title}`}
                aria-current={i === active}
              >
                <span style={{ animationDuration: `${SLIDE_MS}ms` }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
