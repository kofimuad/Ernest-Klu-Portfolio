import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import { PROJECTS } from '@/lib/projects'
import styles from './ProjectStrip.module.css'

const strip = PROJECTS.filter((p) => !p.featured).slice(0, 10)

export default function ProjectStrip() {
  const trackRef = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })

  const onMouseDown = (e) => {
    const el = trackRef.current
    drag.current = { down: true, x: e.pageX, left: el.scrollLeft, moved: false }
    el.classList.add(styles.grabbing)
  }
  const onMouseMove = (e) => {
    const d = drag.current
    if (!d.down) return
    const dx = e.pageX - d.x
    if (Math.abs(dx) > 5) d.moved = true
    trackRef.current.scrollLeft = d.left - dx * 1.3
  }
  const end = () => {
    drag.current.down = false
    trackRef.current?.classList.remove(styles.grabbing)
  }
  // A drag should not open the project it ended on.
  const onClickCapture = (e) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation() }
  }

  if (!strip.length) return null

  return (
    <section className={styles.root} aria-labelledby="strip-heading">
      <Reveal className={styles.label}>
        <h2 id="strip-heading" className={styles.heading}>More work</h2>
        <span className={styles.labelText}>Drag or scroll</span>
      </Reveal>

      <div
        ref={trackRef}
        className={styles.track}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={end}
        onMouseLeave={end}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        {strip.map((p) => (
          <Link key={p.id} to={`/work/${p.id}`} className={styles.item}>
            <Img item={p.cover} alt="" sizes="(max-width: 768px) 70vw, 30vw" width={1200} className={styles.img} />
            <span className={styles.overlay} aria-hidden="true" />
            <span className={styles.meta}>
              <span className={styles.metaCat}>{p.category} · {p.location}</span>
              <span className={styles.metaTitle}>{p.title}</span>
            </span>
          </Link>
        ))}

        <Link to="/work" className={styles.seeAll}>
          <span className={styles.seeAllLabel}>All<br />projects</span>
          <span className={styles.seeAllArrow} aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
