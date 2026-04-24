import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROJECTS } from '@/data/content'
import styles from './ProjectStrip.module.css'

export default function ProjectStrip() {
  const navigate = useNavigate()
  const trackRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [labelVisible, setLabelVisible] = useState(false)
  const labelRef = useRef(null)

  useEffect(() => {
    const el = labelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLabelVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.4
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  const strip = PROJECTS.slice(0, 8)

  return (
    <section className={styles.root} aria-label="Project filmstrip">
      {/* Section label */}
      <div
        ref={labelRef}
        className={[styles.label, 'reveal', labelVisible ? 'visible' : ''].join(' ')}
        aria-hidden="true"
      >
        <span className={styles.labelText}>Drag to explore</span>
        <span className={styles.labelLine} />
      </div>

      {/* Scrollable strip */}
      <div
        ref={trackRef}
        className={styles.track}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {strip.map((p, i) => (
          <article
            key={p.id}
            className={styles.item}
            onClick={() => p.behance && window.open(p.behance, '_blank', 'noopener,noreferrer')}
            aria-label={p.title}
          >
            <div
              className={styles.img}
              style={{ backgroundImage: `url('${p.image}')` }}
              aria-hidden="true"
            />
            <div className={styles.overlay} aria-hidden="true" />
            <div className={styles.meta}>
              <span className={styles.metaNum}>{p.num}</span>
              <h3 className={styles.metaTitle}>{p.title}</h3>
              <p className={styles.metaCat}>{p.category} · {p.location}</p>
            </div>
            <span className={styles.index} aria-hidden="true">0{i + 1}</span>
          </article>
        ))}

        {/* "See all" cap */}
        <div className={styles.seeAll} onClick={() => navigate('/work')}>
          <span className={styles.seeAllInner}>
            <span className={styles.seeAllLabel}>View all<br />projects</span>
            <span className={styles.seeAllArrow}>→</span>
          </span>
        </div>
      </div>
    </section>
  )
}
