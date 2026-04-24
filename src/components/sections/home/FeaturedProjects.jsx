import { useNavigate } from 'react-router-dom'
import Eyebrow from '@/components/ui/Eyebrow'
import ProjectCard from '@/components/ui/ProjectCard'
import { useInView } from '@/hooks/useInView'
import { PROJECTS } from '@/data/content'
import styles from './FeaturedProjects.module.css'

export default function FeaturedProjects() {
  const navigate = useNavigate()
  const [headerRef, headerVisible] = useInView({ threshold: 0.2 })
  const [featuredRef, featuredVisible] = useInView({ threshold: 0.1 })
  const [gridRef, gridVisible] = useInView({ threshold: 0.05 })

  const featured = PROJECTS.filter((p) => p.featured)
  const grid3 = PROJECTS.filter((p) => !p.featured).slice(0, 3)

  return (
    <>
      <section
        ref={headerRef}
        className={[styles.header, 'reveal', headerVisible ? 'visible' : ''].join(' ')}
        aria-labelledby="projects-heading"
      >
        <div className={styles.headerInner}>
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 id="projects-heading" className={styles.title}>
              Built across <em>Ghana</em>
            </h2>
          </div>
          <button className={styles.viewAll} onClick={() => navigate('/work')}>
            View all projects →
          </button>
        </div>
      </section>

      <div className={styles.wrap}>
        {/* Featured: large left + stacked right */}
        <div
          ref={featuredRef}
          className={[styles.featured, 'reveal', featuredVisible ? 'visible' : ''].join(' ')}
        >
          <ProjectCard
            project={{ ...featured[0] }}
            className={styles.featuredMain}
            style={{ aspectRatio: '4/3' }}
          />
          <div className={styles.featuredCol}>
            {featured.slice(1).map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                className={[styles.featuredSmall, `reveal-d${i + 1}`].join(' ')}
              />
            ))}
          </div>
        </div>

        {/* 3-column bottom grid */}
        <div ref={gridRef} className={styles.grid3}>
          {grid3.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              className={[styles.gridCard, 'reveal', gridVisible ? 'visible' : '', `reveal-d${i + 1}`].join(' ')}
              style={{ aspectRatio: '4/3' }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
