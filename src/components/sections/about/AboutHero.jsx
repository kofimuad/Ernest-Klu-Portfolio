import Eyebrow from '@/components/ui/Eyebrow'
import { ABOUT_TAGS } from '@/data/content'
import styles from './AboutHero.module.css'

export default function AboutHero() {
  return (
    <>
      <div className={styles.split}>
        <div className={styles.photo} aria-hidden="true">
          <div className={styles.photoImg} />
        </div>
        <div className={styles.content}>
          <Eyebrow>About Ernest</Eyebrow>
          <h1 className={styles.title}>
            Architect.<br /><em>Sound Engineer.</em><br />Place-maker.
          </h1>
          <p className={styles.body}>
            Ernest Klu is an architect and sound engineer based in Accra, Ghana. His practice
            spans residential, commercial, healthcare, and hospitality typologies across Greater
            Accra, Central, and Western Ghana.
          </p>
          <p className={styles.body}>
            His background in both disciplines gives him an unusual sensitivity to how spaces
            feel — not just how they look.
          </p>
          <p className={styles.body}>
            Available now for freelance commissions across all typologies — locally and internationally.
          </p>
          <div className={styles.tags} role="list" aria-label="Areas of expertise">
            {ABOUT_TAGS.map(({ label, accent }) => (
              <span key={label} className={[styles.tag, accent ? styles.tagAccent : ''].join(' ')} role="listitem">
                {label}
              </span>
            ))}
          </div>
          <div className={styles.stats}>
            {[['12+','Projects delivered'],['5+','Years active'],['2','Disciplines combined']].map(([n,l]) => (
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
