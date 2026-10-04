import Eyebrow from '@/components/ui/Eyebrow'
import Img from '@/components/ui/Img'
import { ABOUT_TAGS } from '@/data/content'
import { PROJECTS, PORTRAIT } from '@/lib/projects'
import styles from './AboutHero.module.css'

// Background: a project image. Portrait: an uploaded "Portrait" folder if there is one, else the bundled photo.
const backdrop = (PROJECTS.find((p) => p.id === 'idl-centre-knust') || PROJECTS[0])?.cover
const portrait = PORTRAIT || '/images/ernest-klu.webp'

export default function AboutHero() {
  return (
    <>
      <div className={styles.split}>
        <div className={styles.photo}>
          <Img item={backdrop} alt="" sizes="(max-width: 900px) 100vw, 40vw" width={1200} eager className={styles.photoImg} />
          <figure className={styles.portrait}>
            <Img item={portrait} alt="Ernest Klu" sizes="200px" width={480} eager className={styles.portraitImg} />
            <figcaption className={styles.portraitCap}>
              <span className={styles.portraitName}>Ernest Klu</span>
              <span className={styles.portraitRole}>Architect · Sound Engineer</span>
            </figcaption>
          </figure>
        </div>
        <div className={styles.content}>
          <Eyebrow>About Ernest</Eyebrow>
          <h1 className={styles.title}>
            Architect and<br /><em>sound engineer</em>
          </h1>
          <p className={styles.body}>
            Ernest Klu is an architect and sound engineer based in Accra. His work
            covers houses, apartments, restaurants, clinics, schools, churches and
            farm buildings, from Greater Accra to the Volta and Ashanti regions.
          </p>
          <p className={styles.body}>
            Because he trained in both fields, acoustics are part of his designs from
            the first sketch. Wall angles, finishes and room shapes are chosen for how
            a space will sound as well as how it will look.
          </p>
          <p className={styles.body}>
            He takes on commissions of all sizes in Ghana and abroad.
          </p>
          <div className={styles.tags} role="list" aria-label="Areas of expertise">
            {ABOUT_TAGS.map(({ label, accent }) => (
              <span key={label} className={[styles.tag, accent ? styles.tagAccent : ''].join(' ')} role="listitem">
                {label}
              </span>
            ))}
          </div>
          <div className={styles.stats}>
            {[[String(PROJECTS.length),'Projects'],['5+','Years in practice'],['2','Disciplines']].map(([n,l]) => (
              <div key={l}>
                <div className={styles.statNum}>{n}</div>
                <div className={styles.statLbl}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}
