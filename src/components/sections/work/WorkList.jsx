import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import styles from './WorkList.module.css'

export default function WorkList({ projects }) {
  const [hovered, setHovered] = useState(null)
  const [seen, setSeen] = useState(() => new Set())
  const previewRef = useRef(null)

  // Move the floating preview with the cursor without re-rendering.
  const onMove = (e) => {
    const el = previewRef.current
    if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
  }

  if (!projects.length) return <p className={styles.empty}>No projects in this category yet.</p>

  return (
    <div className={styles.wrap} onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
      <div className={styles.head} aria-hidden="true">
        <span>No.</span><span>Project</span><span>Type</span><span>Location</span>
      </div>
      <ul className={styles.list}>
        {projects.map((p, i) => (
          <Reveal as="li" key={p.id} delay={Math.min(i, 8) * 40}>
            <Link
              to={`/work/${p.id}`}
              className={styles.row}
              onMouseEnter={() => {
                setHovered(p.id)
                setSeen((s) => (s.has(p.id) ? s : new Set(s).add(p.id)))
              }}
              onFocus={() => setHovered(null)}
            >
              <span className={styles.num}>{p.num}</span>
              <span className={styles.title}>{p.title}</span>
              <span className={styles.cat}>{p.category}</span>
              <span className={styles.loc}>{p.location}</span>
              <span className={styles.thumb} aria-hidden="true">
                <Img item={p.cover} sizes="96px" width={480} />
              </span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div ref={previewRef} className={styles.previewAnchor} aria-hidden="true">
        <div className={`${styles.preview} ${hovered ? styles.previewOn : ''}`}>
          {projects.filter((p) => seen.has(p.id)).map((p) => (
            <Img
              key={p.id}
              item={p.cover}
              sizes="360px"
              width={800}
              eager
              className={p.id === hovered ? styles.current : ''}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
