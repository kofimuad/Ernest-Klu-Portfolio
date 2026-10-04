import { useEffect, useRef } from 'react'
import { posterUrl, videoUrl } from '@/lib/media'

/** Muted looping video that only plays while it is on screen. */
export default function AutoVideo({ item, className = '', label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause() },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      src={videoUrl(item)}
      poster={posterUrl(item)}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={label}
      width={item.w}
      height={item.h}
    />
  )
}
