import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, className = '', style = {} }) {
  const { title, category, location, image, description } = project

  return (
    <div className={`${styles.card} ${className}`} style={style}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div className={styles.gradient} aria-hidden="true" />
      <div className={styles.arrow} aria-hidden="true">→</div>
      <div className={styles.body}>
        <div>
          <p className={styles.category}>{category} · {location}</p>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
      </div>
    </div>
  )
}
