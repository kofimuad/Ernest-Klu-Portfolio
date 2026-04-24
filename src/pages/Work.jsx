import { useState, useMemo } from 'react'
import { useNavigate }       from 'react-router-dom'
import WorkHeader  from '@/components/sections/work/WorkHeader'
import WorkFilters from '@/components/sections/work/WorkFilters'
import WorkGrid    from '@/components/sections/work/WorkGrid'
import Button      from '@/components/ui/Button'
import Footer      from '@/components/layout/Footer'
import { PROJECTS } from '@/data/content'
import styles from './Work.module.css'

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All Work')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    if (activeFilter === 'All Work') return PROJECTS
    return PROJECTS.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase()) ||
      p.category.toLowerCase() === activeFilter.toLowerCase()
    )
  }, [activeFilter])

  return (
    <>
      <WorkHeader />
      <WorkFilters active={activeFilter} onChange={setActiveFilter} />
      <WorkGrid projects={filtered} />
      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Have a project in <em>mind?</em></h2>
        <p className={styles.ctaDesc}>Let&apos;s discuss how Ernest can bring it to life.</p>
        <Button onClick={() => navigate('/contact')}>Hire Ernest</Button>
      </div>
      <Footer />
    </>
  )
}
