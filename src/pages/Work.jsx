import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import WorkHeader  from '@/components/sections/work/WorkHeader'
import WorkFilters from '@/components/sections/work/WorkFilters'
import WorkGrid    from '@/components/sections/work/WorkGrid'
import Button      from '@/components/ui/Button'
import Footer      from '@/components/layout/Footer'
import { PROJECTS, WORK_FILTERS } from '@/data/content'
import styles from './Work.module.css'

export default function Work() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const getInitialFilter = () => {
    const param = searchParams.get('filter')
    if (param && WORK_FILTERS.includes(param)) return param
    return 'All Work'
  }

  const [activeFilter, setActiveFilter] = useState(getInitialFilter)

  // Sync filter when URL param changes (e.g. nav link clicked again)
  useEffect(() => {
    const param = searchParams.get('filter')
    if (param && WORK_FILTERS.includes(param)) setActiveFilter(param)
    else if (!param) setActiveFilter('All Work')
  }, [searchParams])

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
