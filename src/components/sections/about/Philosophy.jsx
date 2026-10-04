import { useNavigate } from 'react-router-dom'
import Eyebrow from '@/components/ui/Eyebrow'
import Button  from '@/components/ui/Button'
import styles  from './Philosophy.module.css'

export default function Philosophy() {
  const navigate = useNavigate()
  return (
    <section className={styles.section} aria-labelledby="philosophy-heading">
      <div>
        <Eyebrow>Approach</Eyebrow>
        <h2 id="philosophy-heading" className={styles.title}>
          Design for the people<br /><em>who use it</em>
        </h2>
      </div>
      <div className={styles.right}>
        <p className={styles.body}>
          A building has to suit its site, its climate and the people inside it.
          In a clinic in Swedru that meant consulting rooms where conversations
          stay private. In a lecture studio at KNUST it meant walls that stop
          echo before it reaches the microphone.
        </p>
        <p className={styles.body}>
          Ernest works from the brief and the site first, and keeps the drawings
          practical enough to price and build.
        </p>
        <Button onClick={() => navigate('/contact')} className={styles.btn}>
          Work with Ernest
        </Button>
      </div>
    </section>
  )
}
