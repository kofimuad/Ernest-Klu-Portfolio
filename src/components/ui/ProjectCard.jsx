import { Link } from 'react-router-dom'
import Img from './Img'
import { isVideo } from '@/lib/media'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 50vw', className = '', style }) {
  const { id, title, category, location, cover, num, media } = project
  const hasVideo = media.some(isVideo)
  return (
    <Link to={`/work/${id}`} className={`${styles.card} ${className}`} style={style}>
      <div className={styles.frame}>
        <Img item={cover} alt={title} sizes={sizes} className={styles.img} />
        <span className={styles.view} aria-hidden="true">View project</span>
        {(media.length > 1 || hasVideo) && (
          <span className={styles.badge}>
            {media.length} {media.length === 1 ? 'item' : hasVideo ? 'items' : 'images'}
            {hasVideo && <span className={styles.play} aria-label="includes video">▶</span>}
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
