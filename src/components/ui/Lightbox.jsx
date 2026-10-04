import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Img from './Img'
import styles from './Lightbox.module.css'

export default function Lightbox({ items, index, title, onClose }) {
  const [i, setI] = useState(index)
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const count = items.length

  const go = (d) => setI((n) => (n + d + count) % count)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  return createPortal(
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.bar}>
        <span className={styles.title}>{title}</span>
        <span className={styles.count}>
          {String(i + 1).padStart(2, '0')} <span>/ {String(count).padStart(2, '0')}</span>
        </span>
        <button ref={closeRef} className={styles.close} onClick={onClose} aria-label="Close gallery">
          Close
        </button>
      </div>

      <div className={styles.stage} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <Img key={i} item={items[i]} alt={`${title}, image ${i + 1} of ${count}`} sizes="100vw" width={2400} eager className={styles.img} />
      </div>

      {count > 1 && (
        <>
          <button className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous image">←</button>
          <button className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label="Next image">→</button>
        </>
      )}
    </div>,
    document.body
  )
}
