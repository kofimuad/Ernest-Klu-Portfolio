import { useNavigate } from 'react-router-dom'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import Img from '@/components/ui/Img'
import { PROJECTS } from '@/lib/projects'
import styles from './FullbleedCTA.module.css'

const bg = PROJECTS.find((p) => p.id === 'apartments-east-legon-hills') || PROJECTS[0]

export default function FullbleedCTA() {
  const navigate = useNavigate()
  return (
    <div className={styles.wrap}>
      {bg && <Img item={bg.cover} alt="" sizes="100vw" width={1600} className={styles.bg} />}
      <div className={styles.content}>
        <div className={styles.left}>
          <Eyebrow className={styles.eyebrow}>Start a project</Eyebrow>
          <h2 className={styles.title}>
            Have a site, a brief<br />or <em>just an idea?</em>
          </h2>
          <p className={styles.sub}>
            Send Ernest a note with what you have so far. The first
            conversation is free.
          </p>
          <div className={styles.btns}>
            <Button variant="light" onClick={() => navigate('/contact')}>Get in touch</Button>
            <Button variant="ghost-light" onClick={() => navigate('/work')}>View Projects</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
