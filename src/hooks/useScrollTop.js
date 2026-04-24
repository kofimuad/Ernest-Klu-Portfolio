import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls the window to the top whenever the route changes.
 * Drop this into the root layout.
 */
export function useScrollTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}
