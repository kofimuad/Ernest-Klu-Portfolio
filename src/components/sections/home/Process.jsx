import Eyebrow from '@/components/ui/Eyebrow'
import { PROCESS_STEPS } from '@/data/content'
import styles from './Process.module.css'

export default function Process() {
  return (
    <section className={styles.section} aria-labelledby="process-heading">
      <div className={styles.intro}>
        <div>
          <Eyebrow>How It Works</Eyebrow>
          <h2 id="process-heading" className={styles.title}>
            A clear process.<br /><em>Zero surprises.</em>
          </h2>
        </div>
        <p className={styles.desc}>
          Ernest's approach is structured enough to give you confidence at every
          stage, and flexible enough to respond to the demands of your project.
        </p>
      </div>
      <ol className={styles.grid} role="list">
        {PROCESS_STEPS.map((step) => (
          <li key={step.num} className={styles.step}>
            <span className={styles.num} aria-hidden="true">{step.num}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
