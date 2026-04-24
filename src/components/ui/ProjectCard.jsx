import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, className = '', style = {}, onClick }) {
  const { title, category, location, image, description, num, behance } = project

  const handleClick = () => {
    if (onClick) { onClick(); return; }
    if (behance) window.open(behance, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={`${styles.card} ${className}`}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      aria-label={`View ${title}`}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div className={styles.gradient} aria-hidden="true" />
      {num && <span className={styles.num} aria-hidden="true">{num}</span>}
      <div className={styles.arrowWrap} aria-hidden="true">
        <span className={styles.arrow}>→</span>
      </div>
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
