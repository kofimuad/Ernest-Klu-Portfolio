import { useNavigate } from 'react-router-dom'
import Eyebrow from '@/components/ui/Eyebrow'
import { HouseIcon, SoundIcon } from '@/components/ui/Icons'
import { SERVICES } from '@/data/content'
import styles from './Services.module.css'

const iconMap = { house: HouseIcon, sound: SoundIcon }

export default function Services() {
  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <div className={styles.intro}>
        <div>
          <Eyebrow>Services</Eyebrow>
          <h2 id="services-heading" className={styles.title}>
            Two disciplines.<br /><em>One vision.</em>
          </h2>
        </div>
        <p className={styles.desc}>
          Ernest combines architectural precision with acoustic intelligence —
          designing spaces that look exceptional and sound unforgettable.
        </p>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((svc) => {
          const Icon = iconMap[svc.icon]
          const isDark = svc.variant === 'dark'
          return (
            <article
              key={svc.id}
              className={`${styles.card} ${isDark ? styles.cardDark : styles.cardLight}`}
            >
              <span className={styles.num} aria-hidden="true">{svc.num}</span>
              <div className={styles.iconWrap} aria-hidden="true">
                {Icon && (
                  <Icon
                    stroke={isDark ? 'rgba(245,242,236,0.65)' : 'rgba(92,98,72,0.65)'}
                    size={18}
                  />
                )}
              </div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <ul className={styles.list} role="list">
                {svc.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
