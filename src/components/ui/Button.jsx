import { Link } from 'react-router-dom'
import styles from './Button.module.css'

/**
 * Button / Link component.
 * variant: 'dark' | 'ghost' | 'ghost-light'
 * as: 'button' | 'link' | 'a'
 */
export default function Button({
  children,
  variant = 'dark',
  as = 'button',
  to,
  href,
  onClick,
  className = '',
  fullWidth = false,
  ...props
}) {
  const cls = [
    styles.btn,
    styles[variant.replace('-', '_')],
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ')

  if (as === 'link' && to) {
    return <Link to={to} className={cls} {...props}>{children}</Link>
  }

  if (as === 'a' && href) {
    return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  }

  return (
    <button className={cls} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
