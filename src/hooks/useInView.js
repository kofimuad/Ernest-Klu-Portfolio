import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight IntersectionObserver hook.
 * Returns [ref, isInView].
 *
 * @param {object} options - IntersectionObserver options
 * @param {boolean} once   - Disconnect after first intersection (default true)
 */
export function useInView(options = {}, once = true) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        if (once) observer.disconnect()
      } else if (!once) {
        setIsInView(false)
      }
    }, { threshold: 0.15, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [once]) // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, isInView]
}
