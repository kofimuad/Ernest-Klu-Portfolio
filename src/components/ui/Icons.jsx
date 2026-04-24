export function HouseIcon({ stroke = 'currentColor', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function SoundIcon({ stroke = 'currentColor', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
      <path d="M4.93 4.93a10 10 0 000 14.14" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M8.46 8.46a5 5 0 000 7.07" />
    </svg>
  )
}

export function GridIcon({ stroke = 'currentColor', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}
