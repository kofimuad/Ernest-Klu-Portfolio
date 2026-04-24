import Eyebrow from '@/components/ui/Eyebrow'
import { TESTIMONIALS } from '@/data/content'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="testi-heading">
      <Eyebrow>Client Feedback</Eyebrow>
      <h2 id="testi-heading" className={styles.title}>
        What clients <em>say</em>
      </h2>
      <div className={styles.grid}>
        {TESTIMONIALS.map((t) => (
          <figure key={t.id} className={styles.card}>
            <span className={styles.qmark} aria-hidden="true">"</span>
            <blockquote>
              <p className={styles.text}>{t.quote}</p>
            </blockquote>
            <figcaption className={styles.caption}>
              <p className={styles.name}>{t.name}</p>
              <p className={styles.role}>{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
