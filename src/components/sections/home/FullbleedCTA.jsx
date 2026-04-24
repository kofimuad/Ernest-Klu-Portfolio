import { useNavigate } from 'react-router-dom'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import styles from './FullbleedCTA.module.css'

export default function FullbleedCTA() {
  const navigate = useNavigate()
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Eyebrow className={styles.eyebrow}>Get Started</Eyebrow>
          <h2 className={styles.title}>
            Ready to bring your<br />project <em>to life?</em>
          </h2>
          <p className={styles.sub}>
            Whether you need a building designed, a studio planned, or a space
            that feels and sounds right — let&apos;s talk.
          </p>
          <div className={styles.btns}>
            <Button variant="light" onClick={() => navigate('/contact')}>Hire Ernest</Button>
            <Button variant="ghost-light" onClick={() => navigate('/work')}>View Projects</Button>
          </div>
        </div>
        <p className={styles.quote}>
          &ldquo;Architecture is not about the walls we build, but the silence we
          capture within them.&rdquo;
        </p>
      </div>
    </div>
  )
}
