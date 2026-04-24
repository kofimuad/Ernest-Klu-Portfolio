import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '@/data/content'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropTimer = useRef(null)

  const isHeroPage = location.pathname === '/'

  const openDrop = (label) => {
    clearTimeout(dropTimer.current)
    setOpenDropdown(label)
  }
  const closeDrop = () => {
    dropTimer.current = setTimeout(() => setOpenDropdown(null), 160)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileExpanded(null)
  }, [location.pathname])

  const solid = scrolled || !isHeroPage

  return (
    <header className={[styles.navbar, solid ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      {/* Logo */}
      <span
        className={styles.logo}
        onClick={() => navigate('/')}
        role="link"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && navigate('/')}
        aria-label="Ernest Klu home"
      >
        Ernest<span className={styles.dot}>.</span>Klu
      </span>

      {/* Desktop nav */}
      <nav aria-label="Primary navigation" className={styles.nav}>
        <ul className={styles.links}>
          {NAV_LINKS.map(item => (
            <li
              key={item.label}
              className={item.children ? styles.hasDropdown : ''}
              onMouseEnter={() => item.children && openDrop(item.label)}
              onMouseLeave={() => item.children && closeDrop()}
            >
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  [styles.link, isActive ? styles.active : ''].join(' ')
                }
              >
                {item.label}
                {item.children && (
                  <span
                    className={[styles.chevron, openDropdown === item.label ? styles.chevronOpen : ''].join(' ')}
                    aria-hidden="true"
                  >›</span>
                )}
              </NavLink>
              {item.children && (
                <ul
                  className={[styles.dropdown, openDropdown === item.label ? styles.dropdownOpen : ''].join(' ')}
                  role="menu"
                  onMouseEnter={() => openDrop(item.label)}
                  onMouseLeave={closeDrop}
                >
                  {item.children.map(child => (
                    <li key={child.label} role="none">
                      <NavLink
                        to={child.path}
                        role="menuitem"
                        onClick={() => setOpenDropdown(null)}
                        className={({ isActive }) =>
                          [styles.dropLink, isActive ? styles.active : ''].join(' ')
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop CTA */}
      <button className={styles.cta} onClick={() => navigate('/contact')}>
        Hire Ernest
      </button>

      {/* Hamburger */}
      <button
        className={[styles.hamburger, menuOpen ? styles.open : ''].join(' ')}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(p => !p)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile menu */}
      <div className={[styles.mobileMenu, menuOpen ? styles.mobileMenuOpen : ''].join(' ')} aria-hidden={!menuOpen}>
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map(item => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    className={[styles.mobileLink, styles.mobileLinkToggle].join(' ')}
                    onClick={() => setMobileExpanded(p => p === item.label ? null : item.label)}
                    aria-expanded={mobileExpanded === item.label}
                  >
                    {item.label}
                    <span className={[styles.chevron, mobileExpanded === item.label ? styles.chevronOpen : ''].join(' ')} aria-hidden="true">›</span>
                  </button>
                  <ul className={[styles.mobileDropdown, mobileExpanded === item.label ? styles.mobileDropdownOpen : ''].join(' ')}>
                    {item.children.map(child => (
                      <li key={child.label}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            [styles.mobileDropLink, isActive ? styles.active : ''].join(' ')
                          }
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    [styles.mobileLink, isActive ? styles.active : ''].join(' ')
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <button
          className={styles.mobileCta}
          onClick={() => { navigate('/contact'); setMenuOpen(false) }}
        >
          Hire Ernest
        </button>
      </div>
    </header>
  )
}
