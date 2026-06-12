'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { C, mono, syne } from '../lib/theme'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/trades', label: 'Trades' },
]

export default function Nav() {
  const path = usePathname()
  return (
    <nav style={{
      borderBottom: `1px solid ${C.border}`,
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      background: C.black,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/dashboard" style={{ textDecoration: 'none', marginRight: 32, padding: '16px 0', display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: syne, fontSize: 15, fontWeight: 800, color: C.gold, letterSpacing: '-0.02em' }}>THE QUADRANT</span>
        <span style={{ fontFamily: mono, fontSize: 9, color: C.muted, letterSpacing: '0.1em' }}>TRACKER</span>
      </Link>
      {links.map(l => (
        <Link key={l.href} href={l.href} style={{
          textDecoration: 'none',
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: path === l.href ? C.gold : C.muted,
          borderBottom: path === l.href ? `2px solid ${C.gold}` : '2px solid transparent',
          padding: '18px 16px 16px',
          transition: 'all 0.15s',
        }}>{l.label}</Link>
      ))}
    </nav>
  )
}
