import { useNavigate } from 'react-router-dom'
import Eyebrow from '@/components/ui/Eyebrow'
import Button  from '@/components/ui/Button'
import styles  from './Philosophy.module.css'

export default function Philosophy() {
  const navigate = useNavigate()
  return (
    <section className={styles.section} aria-labelledby="philosophy-heading">
      <div>
        <Eyebrow>Philosophy</Eyebrow>
        <h2 id="philosophy-heading" className={styles.title}>
          From mathematical models<br />to <em>immersive realities</em>
        </h2>
      </div>
      <div className={styles.right}>
        <p className={styles.body}>
          Architecture that ignores its context produces buildings that feel borrowed.
          From the acoustic properties of a diagnostic wing in Swedru to the rooftop
          sightlines of a bar in East Legon — the details are where architecture
          lives or dies.
        </p>
        <p className={styles.body}>
          The dual background means Ernest approaches every spatial problem from two
          angles simultaneously — form and sensation.
        </p>
        <Button onClick={() => navigate('/contact')} className={styles.btn}>
          Work With Ernest
        </Button>
      </div>
    </section>
  )
}
