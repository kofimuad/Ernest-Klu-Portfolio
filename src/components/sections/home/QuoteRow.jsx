import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { HouseIcon, SoundIcon } from '@/components/ui/Icons'
import { DISCIPLINES } from '@/data/content'
import styles from './QuoteRow.module.css'

const iconMap = { house: HouseIcon, sound: SoundIcon }

export default function QuoteRow() {
  const navigate = useNavigate()
  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <blockquote className={styles.quote}>
          <p>"I don't design rooms. I design the <em>atmosphere</em> that fills them."</p>
        </blockquote>
        <cite className={styles.attr}>— Ernest Klu, Architect &amp; Sound Engineer</cite>
        <Button variant="ghost-light" onClick={() => navigate('/about')} className={styles.btn}>
          About Ernest →
        </Button>
      </div>
      <div className={styles.right}>
        {DISCIPLINES.map((d) => {
          const Icon = iconMap[d.icon]
          return (
            <div key={d.id} className={styles.disc}>
              <div className={styles.discIcon} aria-hidden="true">
                {Icon && <Icon stroke="rgba(245,242,236,0.75)" size={16} />}
              </div>
              <div>
                <p className={styles.discTitle}>{d.title}</p>
                <p className={styles.discSub}>{d.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
