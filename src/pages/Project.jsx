import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Img from '@/components/ui/Img'
import AutoVideo from '@/components/ui/AutoVideo'
import Lightbox from '@/components/ui/Lightbox'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import Footer from '@/components/layout/Footer'
import NotFound from '@/pages/NotFound'
import { getProject, getNeighbours } from '@/lib/projects'
import { isVideo, posterUrl, ratio, videoUrl } from '@/lib/media'
import { galleryRows } from '@/lib/layout'
import styles from './Project.module.css'

export default function ProjectRoute() {
  const { id } = useParams()
  // Keyed so state and scroll reveals reset when moving between projects.
  return <Project key={id} id={id} />
}

function Project({ id }) {
  const project = getProject(id)
  const [open, setOpen] = useState(null)
  const [filmPlaying, setFilmPlaying] = useState(false)

  const { images, rows } = useMemo(() => {
    if (!project) return { images: [], rows: [] }
    const rest = project.media.filter((m) => m !== project.cover)
    return { images: project.media.filter((m) => !isVideo(m)), rows: galleryRows(rest) }
  }, [project])

  if (!project) return <NotFound />

  const { title, category, location, description, tags, behance, cover, media } = project
  const { next } = getNeighbours(id)
  const videos = media.filter(isVideo).length
  const photos = media.length - videos
  const mediaSummary = [
    photos && `${photos} ${photos === 1 ? 'image' : 'images'}`,
    videos && `${videos} ${videos === 1 ? 'film' : 'films'}`,
  ].filter(Boolean).join(', ')
  const openImage = (item) => setOpen(images.indexOf(item))

  return (
    <>
      <section className={`${styles.hero} ${filmPlaying ? styles.heroFilm : ''}`}>
        {isVideo(cover) ? (
          <HeroFilm item={cover} title={title} onPlay={() => setFilmPlaying(true)} />
        ) : (
          <button className={styles.heroMedia} onClick={() => openImage(cover)} aria-label={`Open ${title} gallery`}>
            <Img item={cover} alt="" sizes="100vw" width={2400} eager className={styles.heroImg} />
          </button>
        )}
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroText}>
          <Link to="/work" className={styles.back}>← All work</Link>
          <p className={styles.eyebrow}>{category}{location && <> · {location}</>}</p>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </section>

      <section className={styles.info}>
        <dl className={styles.facts}>
          <div><dt>Type</dt><dd>{category}</dd></div>
          {location && <div><dt>Location</dt><dd>{location}</dd></div>}
          <div><dt>Scope</dt><dd>{tags.join(', ')}</dd></div>
          {(media.length > 1 || videos > 0) && <div><dt>Media</dt><dd>{mediaSummary}</dd></div>}
        </dl>
        <div className={styles.copy}>
          {description && <p className={styles.desc}>{description}</p>}
          <div className={styles.actions}>
            {images.length > 1 && <Button onClick={() => setOpen(0)}>View all images</Button>}
            {behance && <Button as="a" href={behance} variant="ghost">See it on Behance</Button>}
          </div>
        </div>
      </section>

      {rows.length > 0 && (
        <section className={styles.gallery} aria-label={`${title} gallery`}>
          {rows.map((row, r) => (
            <Reveal key={r} className={`${styles.row} ${styles[row.type]}`}>
              {row.items.map((item) => {
                const ar = ratio(item) || 1.5
                return isVideo(item) ? (
                  <div key={item.id} className={styles.cell} style={{ '--ar': ar }}>
                    <AutoVideo item={item} className={styles.media} label={`${title} video`} />
                  </div>
                ) : (
                  <button
                    key={item.id || item}
                    className={styles.cell}
                    style={{ '--ar': ar }}
                    onClick={() => openImage(item)}
                    aria-label={`Enlarge image ${images.indexOf(item) + 1} of ${images.length}`}
                  >
                    <Img
                      item={item}
                      alt={`${title}, image ${images.indexOf(item) + 1}`}
                      sizes={row.type === 'pair' ? '(max-width: 768px) 100vw, 50vw' : '100vw'}
                      width={2400}
                      className={styles.media}
                    />
                  </button>
                )
              })}
            </Reveal>
          ))}
        </section>
      )}

      {next && next.id !== id && (
        <Link to={`/work/${next.id}`} className={styles.next}>
          <Img item={next.cover} alt="" sizes="100vw" className={styles.nextImg} />
          <span className={styles.nextShade} aria-hidden="true" />
          <span className={styles.nextText}>
            <span className={styles.nextLabel}>Next project</span>
            <span className={styles.nextTitle}>{next.title}</span>
            <span className={styles.nextArrow} aria-hidden="true">→</span>
          </span>
        </Link>
      )}

      <Footer />

      {open !== null && open >= 0 && (
        <Lightbox items={images} index={open} title={title} onClose={() => setOpen(null)} />
      )}
    </>
  )
}

/**
 * Hero for projects whose cover is a film: plays silently in the background,
 * with a button to restart it with sound and controls. On small screens or
 * data-saver connections it waits for the button instead of autoplaying.
 */
function HeroFilm({ item, title, onPlay }) {
  const ref = useRef(null)
  const [withSound, setWithSound] = useState(false)
  const [autoplay] = useState(() =>
    !window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 640px)').matches &&
    !navigator.connection?.saveData
  )

  const play = () => {
    const v = ref.current
    if (!v) return
    v.muted = false
    v.loop = false
    v.currentTime = 0
    v.play().catch(() => {})
    setWithSound(true)
    onPlay()
  }

  return (
    <>
      <video
        ref={ref}
        className={styles.heroImg}
        src={videoUrl(item)}
        poster={posterUrl(item, 2400)}
        autoPlay={autoplay}
        muted={!withSound}
        loop={!withSound}
        controls={withSound}
        playsInline
        preload={autoplay ? 'auto' : 'none'}
        aria-label={`${title} film`}
      />
      {!withSound && (
        <button className={styles.playFilm} onClick={play}>
          <span aria-hidden="true">▶</span> Play film with sound
        </button>
      )}
    </>
  )
}
