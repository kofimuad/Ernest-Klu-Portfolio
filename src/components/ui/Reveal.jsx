import { useInView } from '@/hooks/useInView'

/** Fades and lifts its children in the first time they scroll into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...props }) {
  const [ref, visible] = useInView({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  return (
    <Tag
      ref={ref}
      className={['reveal', visible ? 'visible' : '', className].filter(Boolean).join(' ')}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
