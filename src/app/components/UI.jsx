import { C, mono, syne, sans } from '../lib/theme'

export function StatCard({ label, value, sub, color }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: '20px 22px' }}>
      <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: syne, fontSize: 26, fontWeight: 700, color: color || C.gold, lineHeight: 1, marginBottom: sub ? 4 : 0 }}>{value}</div>
      {sub && <div style={{ fontFamily: mono, fontSize: 10, color: C.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

export function Badge({ children, type = 'default' }) {
  const map = {
    green:    { bg: C.successDim, color: C.success },
    danger:   { bg: C.dangerDim,  color: C.danger },
    warn:     { bg: C.warnDim,    color: C.warn },
    gold:     { bg: C.goldDim,    color: C.gold },
    default:  { bg: 'rgba(90,86,80,0.2)', color: C.muted },
  }
  const s = map[type] || map.default
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: mono, fontSize: 10, fontWeight: 600,
      padding: '3px 9px', borderRadius: 2,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      background: s.bg, color: s.color,
    }}>{children}</span>
  )
}

export function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: syne, fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 20, letterSpacing: '-0.01em' }}>
      {children}
    </h2>
  )
}

export function Label({ children, color }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 9, color: color || C.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>
      {children}
    </div>
  )
}

export function Divider() {
  return <div style={{ borderTop: `1px solid ${C.border}`, margin: '24px 0' }} />
}

export function EmptyState({ message }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <div style={{ fontFamily: mono, fontSize: 11, color: C.muted, letterSpacing: '0.1em' }}>{message}</div>
    </div>
  )
}

export function QuadrantPill({ label, index }) {
  const colors = ['#c9a84c', '#b48c3c', '#8c6428', '#5a3c14']
  const bgs = ['rgba(201,168,76,0.12)', 'rgba(180,140,60,0.1)', 'rgba(140,100,40,0.1)', 'rgba(90,60,20,0.1)']
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: mono, fontSize: 10, fontWeight: 600,
      padding: '3px 10px', borderRadius: 2,
      background: bgs[index], color: colors[index],
      letterSpacing: '0.08em',
    }}>{label}</span>
  )
}
