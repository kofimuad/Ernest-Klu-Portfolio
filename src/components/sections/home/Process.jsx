import Eyebrow from '@/components/ui/Eyebrow'
import { PROCESS_STEPS } from '@/data/content'
import styles from './Process.module.css'

export default function Process() {
  return (
    <section className={styles.section} aria-labelledby="process-heading">
      <div className={styles.intro}>
        <div>
          <Eyebrow>Process</Eyebrow>
          <h2 id="process-heading" className={styles.title}>
            How a project<br /><em>runs</em>
          </h2>
        </div>
        <p className={styles.desc}>
          Four stages from the first call to handover. You see and sign off the
          design at each one before work moves on.
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
