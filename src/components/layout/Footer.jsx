import { useNavigate } from 'react-router-dom'
import { SITE } from '@/data/content'
import styles from './Footer.module.css'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className={styles.footer}>
      <span className={styles.logo} onClick={() => navigate('/')} role="link" tabIndex={0} onKeyDown={e => e.key==='Enter' && navigate('/')}>
        Ernest<span className={styles.dot}>.</span>Klu
      </span>
      <ul className={styles.links}>
        <li><a href={SITE.social.behance} target="_blank" rel="noopener noreferrer">Behance</a></li>
        <li><a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>
      </ul>
      <span className={styles.copy}>© {new Date().getFullYear()} Ernest Klu. All rights reserved.</span>
    </footer>
  )
}
