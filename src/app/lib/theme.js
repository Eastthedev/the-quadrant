export const C = {
  black:      '#0a0a0a',
  surface:    '#111111',
  surface2:   '#181818',
  surface3:   '#1f1f1f',
  border:     'rgba(255,255,255,0.07)',
  border2:    'rgba(255,255,255,0.12)',
  gold:       '#c9a84c',
  goldDim:    'rgba(201,168,76,0.12)',
  goldBorder: 'rgba(201,168,76,0.28)',
  text:       '#f0ede6',
  secondary:  '#8a8278',
  muted:      '#5a5650',
  success:    '#4caf7d',
  successDim: 'rgba(76,175,125,0.1)',
  danger:     '#e05555',
  dangerDim:  'rgba(224,85,85,0.08)',
  warn:       '#e0943a',
  warnDim:    'rgba(224,148,58,0.08)',
  blue:       '#4a9eda',
}

export const mono = "'JetBrains Mono', 'Fira Mono', monospace"
export const sans = "'Inter', system-ui, sans-serif"
export const syne = "'Syne', sans-serif"

export const inputStyle = {
  width: '100%',
  background: '#181818',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 3,
  padding: '10px 12px',
  fontFamily: mono,
  fontSize: 13,
  color: '#f0ede6',
  outline: 'none',
  boxSizing: 'border-box',
}

export const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
}

export const btnPrimary = {
  background: '#c9a84c',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: 3,
  padding: '10px 20px',
  fontFamily: mono,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}

export const btnGhost = {
  background: 'transparent',
  color: '#8a8278',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 3,
  padding: '10px 20px',
  fontFamily: mono,
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}
