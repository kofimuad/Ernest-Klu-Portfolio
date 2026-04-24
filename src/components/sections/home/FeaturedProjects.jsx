import { useNavigate } from 'react-router-dom'
import Eyebrow from '@/components/ui/Eyebrow'
import ProjectCard from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/data/content'
import styles from './FeaturedProjects.module.css'

export default function FeaturedProjects() {
  const navigate = useNavigate()
  const featured = PROJECTS.filter((p) => p.featured)
  const grid3 = PROJECTS.filter((p) => !p.featured).slice(0, 3)

  return (
    <>
      <section className={styles.header} aria-labelledby="projects-heading">
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
        <div className={styles.featured}>
          <ProjectCard
            project={{ ...featured[0], num: '01' }}
            className={styles.featuredMain}
            style={{ aspectRatio: '4/3' }}
            onClick={() => navigate('/work')}
          />
          <div className={styles.featuredCol}>
            {featured.slice(1).map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                className={styles.featuredSmall}
                onClick={() => navigate('/work')}
              />
            ))}
          </div>
        </div>

        {/* 3-column bottom grid */}
        <div className={styles.grid3}>
          {grid3.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              className={styles.gridCard}
              style={{ aspectRatio: '4/3' }}
              onClick={() => navigate('/work')}
            />
          ))}
        </div>
      </div>
    </>
  )
}
