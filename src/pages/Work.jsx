import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import WorkHeader  from '@/components/sections/work/WorkHeader'
import WorkFilters from '@/components/sections/work/WorkFilters'
import WorkGrid    from '@/components/sections/work/WorkGrid'
import WorkList    from '@/components/sections/work/WorkList'
import ClosingCTA  from '@/components/sections/home/FullbleedCTA'
import Footer      from '@/components/layout/Footer'
import { PROJECTS, FILTERS, matchesFilter } from '@/lib/projects'

const VIEW_KEY = 'ek-work-view'

function readView() {
  try { return localStorage.getItem(VIEW_KEY) === 'list' ? 'list' : 'grid' } catch { return 'grid' }
}

export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState(readView)

  const param = searchParams.get('filter')
  const active = FILTERS.includes(param) ? param : 'All'

  const filtered = useMemo(() => PROJECTS.filter((p) => matchesFilter(p, active)), [active])

  const setFilter = (f) => setSearchParams(f === 'All' ? {} : { filter: f }, { replace: true })
  const changeView = (v) => {
    setView(v)
    try { localStorage.setItem(VIEW_KEY, v) } catch { /* private mode */ }
  }

  return (
    <>
      <WorkHeader count={PROJECTS.length} view={view} onViewChange={changeView} />
      <WorkFilters active={active} onChange={setFilter} />
      {view === 'grid'
        ? <WorkGrid key={active} projects={filtered} />
        : <WorkList key={active} projects={filtered} />}
      <ClosingCTA />
      <Footer />
    </>
  )
}
