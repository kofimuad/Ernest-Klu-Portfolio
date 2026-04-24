import { useNavigate } from 'react-router-dom'
import Button  from '@/components/ui/Button'
import Footer  from '@/components/layout/Footer'
import styles from './NotFound.module.css'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.wrap}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.desc}>The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
      <Footer />
    </>
  )
}
