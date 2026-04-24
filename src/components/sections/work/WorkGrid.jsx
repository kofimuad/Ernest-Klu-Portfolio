import { useRef, useEffect, useState } from 'react'
import ProjectCard from '@/components/ui/ProjectCard'
import styles from './WorkGrid.module.css'

export default function WorkGrid({ projects }) {
  const gridRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={gridRef} className={styles.grid}>
      {projects.map((p, i) => {
        const delayClass = `reveal-d${Math.min((i % 6) + 1, 6)}`
        return (
          <ProjectCard
            key={p.id}
            project={p}
            className={[
              styles.card,
              i % 5 === 2 ? styles.wide : '',
              'reveal',
              visible ? 'visible' : '',
              delayClass,
            ].filter(Boolean).join(' ')}
          />
        )
      })}
    </div>
  )
}
