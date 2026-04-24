import ProjectCard from '@/components/ui/ProjectCard'
import styles from './WorkGrid.module.css'

export default function WorkGrid({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.map((p, i) => (
        <ProjectCard
          key={p.id}
          project={p}
          className={[styles.card, i === 2 ? styles.wide : ''].join(' ')}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  )
}
