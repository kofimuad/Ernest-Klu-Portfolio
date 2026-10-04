import { imageUrl, srcSet } from '@/lib/media'

/**
 * Responsive image for a media item (Cloudinary object or plain URL).
 * `sizes` should describe the rendered width so the browser picks a small file.
 */
export default function Img({ item, alt = '', sizes = '100vw', width = 1600, eager = false, className = '', ...props }) {
  const src = imageUrl(item, width)
  if (!src) return null
  const dims = typeof item === 'object' && item.w ? { width: item.w, height: item.h } : {}
  return (
    <img
      src={src}
      srcSet={srcSet(item)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...dims}
      {...props}
    />
  )
}
