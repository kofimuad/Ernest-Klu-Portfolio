import { Link } from 'react-router-dom'
import Img from './Img'
import { isVideo } from '@/lib/media'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 50vw', className = '', style }) {
  const { id, title, category, location, cover, num, media } = project
  const films = media.filter(isVideo).length
  const photos = media.length - films
  const badge = [
    photos > 1 && `${photos} images`,
    films > 0 && (films === 1 ? 'Film' : `${films} films`),
  ].filter(Boolean).join(' + ')
  return (
    <Link to={`/work/${id}`} className={`${styles.card} ${className}`} style={style}>
      <div className={styles.frame}>
        <Img item={cover} alt={title} sizes={sizes} className={styles.img} />
        <span className={styles.view} aria-hidden="true">View project</span>
        {badge && (
          <span className={styles.badge}>
            {badge}
            {films > 0 && <span className={styles.play} aria-hidden="true">▶</span>}
          </span>
        )}
      </div>
      <div className={styles.caption}>
        <span className={styles.num}>{num}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>{category}{location && <> · {location}</>}</p>
      </div>
    </Link>
  )
}
