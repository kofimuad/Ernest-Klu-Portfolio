import { Link } from 'react-router-dom'
import Eyebrow from '@/components/ui/Eyebrow'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import { FEATURED, PROJECTS } from '@/lib/projects'
import styles from './FeaturedProjects.module.css'

export default function FeaturedProjects() {
  const list = FEATURED.length ? FEATURED : PROJECTS.slice(0, 4)
  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <Reveal className={styles.header}>
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <h2 id="projects-heading" className={styles.title}>
            Recent <em>projects</em>
          </h2>
        </div>
        <Link to="/work" className={styles.viewAll}>
          All {PROJECTS.length} projects <span aria-hidden="true">→</span>
        </Link>
      </Reveal>

      <div className={styles.list}>
        {list.map((p, i) => (
          <Link key={p.id} to={`/work/${p.id}`} className={`${styles.item} ${i % 2 ? styles.flip : ''}`}>
            <Reveal className={styles.media}>
              <Img item={p.cover} alt={p.title} sizes="(max-width: 900px) 100vw, 62vw" width={2400} className={styles.img} />
            </Reveal>
            <Reveal className={styles.text} delay={120}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <p className={styles.meta}>{p.category} · {p.location}</p>
              <h3 className={styles.itemTitle}>{p.title}</h3>
              {p.description && <p className={styles.desc}>{p.description}</p>}
              <span className={styles.cta}>View project <span aria-hidden="true">→</span></span>
            </Reveal>
          </Link>
        ))}
      </div>
    </section>
  )
}
