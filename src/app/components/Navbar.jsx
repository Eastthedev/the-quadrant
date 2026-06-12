'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Playbook', path: '/playbook' },
    { name: 'Analysis', path: '/analysis' },
    { name: 'Thresholds', path: '/thresholds' },
  ]



  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 10, 10, 0.75)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: 20,
            fontWeight: 800,
            color: '#c9a84c',
            letterSpacing: '-0.02em',
          }}>
            THE QUADRANT
          </span>
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            color: '#4a4844',
            letterSpacing: '0.1em'
          }}>
            v1.0
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {links.map((link) => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.path}
                href={link.path}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  color: isActive ? '#c9a84c' : '#8a8680',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'color 0.2s ease',
                  padding: '6px 0',
                  borderBottom: isActive ? '1px solid #c9a84c' : '1px solid transparent',
                }}
                className={isActive ? '' : 'link-hover'}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* CTA Launch Button */}
        <div className="desktop-cta">
          <Link href="/dashboard" style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            background: 'rgba(201, 168, 76, 0.1)',
            border: '1px solid #c9a84c',
            borderRadius: 3,
            color: '#c9a84c',
            padding: '10px 20px',
            textDecoration: 'none',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#c9a84c'
            e.currentTarget.style.color = '#0a0a0a'
            e.currentTarget.style.boxShadow = '0 0 15px rgba(201, 168, 76, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(201, 168, 76, 0.1)'
            e.currentTarget.style.color = '#c9a84c'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            Launch App
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'none', // Managed by media queries (injected styled block below)
            flexDirection: 'column',
            gap: 5,
          }}
          className="mobile-toggle"
        >
          <div style={{ width: 22, height: 1.5, background: '#f5f3ee', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
          <div style={{ width: 22, height: 1.5, background: '#f5f3ee', transition: '0.3s', opacity: mobileMenuOpen ? 0 : 1 }}></div>
          <div style={{ width: 22, height: 1.5, background: '#f5f3ee', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none' }}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 72,
          left: 0,
          width: '100%',
          background: 'rgba(10, 10, 10, 0.95)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          zIndex: 99,
        }}>
          {links.map((link) => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 14,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  color: isActive ? '#c9a84c' : '#8a8680',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {link.name}
              </Link>
            )
          })}
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: '#c9a84c',
              border: 'none',
              borderRadius: 3,
              color: '#0a0a0a',
              padding: '12px',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Launch App
          </Link>
        </div>
      )}
    </header>
  )
}

