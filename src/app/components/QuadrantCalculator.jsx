'use client'
import { useState } from 'react'

const GOLD = "#c9a84c"
const GOLD_DIM = "rgba(201,168,76,0.15)"
const GOLD_BORDER = "rgba(201,168,76,0.3)"
const SURFACE = "#111111"
const SURFACE2 = "#1a1a1a"
const BORDER = "rgba(255,255,255,0.07)"
const TEXT = "#f0ede6"
const MUTED = "#5a5650"
const SECONDARY = "#8a8278"
const SUCCESS = "#4caf7d"
const DANGER = "#e05555"
const mono = "var(--font-mono, monospace)"
const sans = "var(--font-inter, system-ui, sans-serif)"

function calcQuadrants(entry, sl, tp, direction = 'long', splits = 4) {
  const e = parseFloat(entry)
  const s = parseFloat(sl)
  const t = parseFloat(tp)
  if (isNaN(e) || isNaN(s) || isNaN(t)) return null
  const slDist = direction === 'long' ? e - s : s - e
  if (slDist <= 0) return null
  const tpDist = direction === 'long' ? t - e : e - t
  if (tpDist <= 0) return null
  const count = parseInt(splits) || 4
  const zone = slDist / count
  const indices = Array.from({ length: count }, (_, i) => i)
  return indices.map((i) => {
    const qEntry = direction === 'long' ? e - zone * i : e + zone * i
    const qSL = direction === 'long' ? qEntry - zone : qEntry + zone
    const qReward = direction === 'long' ? t - qEntry : qEntry - t
    const rr = qReward / zone
    return { label: `Q${i + 1}`, entry: qEntry, sl: qSL, tp: t, risk: zone, reward: qReward, rr }
  })
}

function fmt(n, decimals = 3) {
  if (n === undefined || n === null || isNaN(n)) return '—'
  return n.toFixed(decimals)
}

function detectDecimals(val) {
  const s = String(val)
  const dot = s.indexOf('.')
  if (dot === -1) return 0
  return s.length - dot - 1
}

function QCard({ q, index, showLotDetails, lotSize, riskAmount }) {
  const colors = [
    { bg: 'rgba(201,168,76,0.08)', border: 'rgba(201,168,76,0.35)', accent: GOLD },
    { bg: 'rgba(180,140,60,0.06)', border: 'rgba(180,140,60,0.25)', accent: '#b48c3c' },
    { bg: 'rgba(140,100,40,0.06)', border: 'rgba(140,100,40,0.2)', accent: '#8c6428' },
    { bg: 'rgba(90,60,20,0.06)', border: 'rgba(90,60,20,0.18)', accent: '#5a3c14' },
  ]
  const c = colors[index % colors.length]
  const dec = detectDecimals(q.entry) || 3

  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '20px 20px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.15em', color: c.accent, textTransform: 'uppercase' }}>{q.label}</span>
        <span style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: c.accent, lineHeight: 1 }}>1:{q.rr.toFixed(1)}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 0' }}>
        {[
          { label: 'entry', val: fmt(q.entry, dec), color: TEXT },
          { label: 'stop loss', val: fmt(q.sl, dec), color: DANGER },
          { label: 'take profit', val: fmt(q.tp, dec), color: SUCCESS },
        ].map(({ label, val, color }) => (
          <div key={label}>
            <div style={{ fontFamily: mono, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{label}</div>
            <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 500, color }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, height: 3, background: BORDER, borderRadius: 2 }}>
        <div style={{ height: 3, borderRadius: 2, background: c.accent, width: `${Math.min((q.rr / 50) * 100, 100)}%`, transition: 'width 0.4s ease' }} />
      </div>
      {showLotDetails && (
        <>
          <div style={{ height: 1, background: BORDER, margin: '16px 0 12px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>lot size</div>
              <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, color: TEXT }}>{fmt(lotSize, 3)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: mono, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>risk</div>
              <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, color: TEXT }}>${fmt(riskAmount, 2)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const INSTRUMENTS = {
  'forex-majors': { label: 'Forex Majors/Minors', pipSize: 0.0001, pipVal: 10, type: 'fixed' },
  'forex-jpy': { label: 'Forex JPY Pairs', pipSize: 0.01, type: 'jpy' },
  'gold': { label: 'Gold (XAU/USD)', pipSize: 0.01, pipVal: 100, type: 'fixed' },
  'silver': { label: 'Silver (XAG/USD)', pipSize: 0.001, pipVal: 5, type: 'fixed' },
  'us30': { label: 'US30', pipSize: 1.0, pipVal: 1, type: 'fixed' },
  'us500': { label: 'US500 (S&P 500)', pipSize: 1.0, pipVal: 1, type: 'fixed' },
  'nas100': { label: 'NAS100', pipSize: 1.0, pipVal: 1, type: 'fixed' },
  'btc': { label: 'BTC/USD', pipSize: 1.0, pipVal: 1, type: 'fixed' },
  'eth': { label: 'ETH/USD', pipSize: 1.0, pipVal: 1, type: 'fixed' },
  'crypto-other': { label: 'Other Crypto', pipSize: 1.0, pipVal: 1, type: 'fixed' },
}

export default function QuadrantCalculator() {
  const [entry, setEntry] = useState('')
  const [sl, setSl] = useState('')
  const [tp, setTp] = useState('')
  const [direction, setDirection] = useState('long')
  const [splits, setSplits] = useState(4) // 4 = Q4 mode, 3 = Q3 mode

  // Lot Size Calculator states:
  const [isLotOpen, setIsLotOpen] = useState(false)
  const [instrument, setInstrument] = useState('forex-majors')
  const [accountMode, setAccountMode] = useState('green') // 'green' or 'recovery'
  const [riskMode, setRiskMode] = useState('percent') // 'percent' or 'dollar'
  const [balance, setBalance] = useState('10000')
  const [riskPercent, setRiskPercent] = useState('1.0')
  const [riskDollar, setRiskDollar] = useState('100')

  const quadrants = calcQuadrants(entry, sl, tp, direction, splits)
  const hasValues = entry && sl && tp
  const dec = detectDecimals(entry) || 3

  const clear = () => { setEntry(''); setSl(''); setTp('') }

  const inputStyle = {
    width: '100%', background: SURFACE2, border: `1px solid ${BORDER}`,
    borderRadius: 3, padding: '10px 12px', fontFamily: mono,
    fontSize: 14, color: TEXT, outline: 'none', boxSizing: 'border-box',
  }

  const originalRR = quadrants
    ? ((parseFloat(tp) - parseFloat(entry)) / (parseFloat(entry) - parseFloat(sl)) * (direction === 'long' ? 1 : -1))
    : null

  // Lot size calculations
  const actualRiskPercent = accountMode === 'recovery' ? 0.5 : (parseFloat(riskPercent) || 0)
  const riskAmount = riskMode === 'percent'
    ? (parseFloat(balance) || 0) * (actualRiskPercent / 100)
    : (parseFloat(riskDollar) || 0)

  const zoneSize = quadrants ? quadrants[0].risk : null
  const inst = INSTRUMENTS[instrument]
  const slPips = zoneSize && inst ? zoneSize / inst.pipSize : null

  let pipValue = 0
  if (inst) {
    if (inst.type === 'jpy') {
      const entryPrice = parseFloat(entry)
      if (entryPrice > 0) {
        pipValue = 1000 / entryPrice
      }
    } else {
      pipValue = inst.pipVal
    }
  }

  let calculatedLotSize = null
  if (slPips && pipValue && riskAmount > 0) {
    const rawLots = riskAmount / (slPips * pipValue)
    calculatedLotSize = Math.max(0.001, Math.round(rawLots * 1000) / 1000)
  }

  const showLotDetails = isLotOpen && quadrants && calculatedLotSize !== null && riskAmount > 0

  return (
    <div style={{ color: TEXT, padding: '40px 0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px' }}>

        {/* Q3 Feature Banner & Call-To-Action (CTA) */}
        <div style={{
          background: splits === 3 
            ? 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(76,175,125,0.08) 100%)' 
            : 'rgba(255,255,255,0.02)',
          border: `1px solid ${splits === 3 ? GOLD : BORDER}`,
          borderRadius: 6,
          padding: '18px 20px',
          marginBottom: 24,
          transition: 'all 0.3s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontFamily: mono,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  background: splits === 3 ? GOLD : 'rgba(255,255,255,0.1)',
                  color: splits === 3 ? '#000' : MUTED,
                  padding: '3px 8px',
                  borderRadius: 3,
                  textTransform: 'uppercase'
                }}>
                  {splits === 3 ? 'Q3 Mode Active' : 'Q3 Mode Available'}
                </span>
                <span style={{ fontFamily: mono, fontSize: 11, color: SECONDARY }}>Tri-Zone Split (Divided by 3)</span>
              </div>
              <div style={{ fontFamily: sans, fontSize: 14, color: TEXT, fontWeight: 500 }}>
                {splits === 3 
                  ? 'Trade signal SL is divided into 3 equal zones (slDist / 3). Max drawdown: -3R.' 
                  : 'Want 3-way trade entries instead of 4? Switch to Q3 calculation mode.'}
              </div>
            </div>
            <button
              onClick={() => setSplits(splits === 3 ? 4 : 3)}
              style={{
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '9px 18px',
                borderRadius: 4,
                border: `1px solid ${GOLD}`,
                cursor: 'pointer',
                background: splits === 3 ? GOLD : 'transparent',
                color: splits === 3 ? '#0a0a0a' : GOLD,
                fontWeight: 700,
                transition: 'all 0.2s ease',
              }}
            >
              {splits === 3 ? '✓ Q3 Active (Switch to Q4)' : '⚡ Activate Q3 (Split by 3)'}
            </button>
          </div>
        </div>

        {/* Mode Selector & Direction toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          {/* Direction toggle */}
          <div style={{ display: 'flex', gap: 1, background: BORDER, borderRadius: 4, padding: 1 }}>
            {['long', 'short'].map(d => (
              <button key={d} onClick={() => setDirection(d)} style={{
                fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '7px 20px', borderRadius: 3, border: 'none', cursor: 'pointer',
                background: direction === d ? (d === 'long' ? SUCCESS : DANGER) : 'transparent',
                color: direction === d ? '#0a0a0a' : MUTED,
                fontWeight: direction === d ? 600 : 400, transition: 'all 0.15s',
              }}>{d === 'long' ? '▲ Long' : '▼ Short'}</button>
            ))}
          </div>

          {/* Split Mode toggle */}
          <div style={{ display: 'flex', gap: 1, background: BORDER, borderRadius: 4, padding: 1 }}>
            {[
              { num: 4, label: 'Q4 (Split by 4)' },
              { num: 3, label: 'Q3 (Split by 3)' }
            ].map(m => (
              <button key={m.num} onClick={() => setSplits(m.num)} style={{
                fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '7px 14px', borderRadius: 3, border: 'none', cursor: 'pointer',
                background: splits === m.num ? GOLD : 'transparent',
                color: splits === m.num ? '#0a0a0a' : MUTED,
                fontWeight: splits === m.num ? 700 : 400, transition: 'all 0.15s',
              }}>{m.label}</button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          {[
            { label: 'Entry', val: entry, set: setEntry, color: TEXT },
            { label: 'Stop Loss', val: sl, set: setSl, color: DANGER },
            { label: 'Take Profit', val: tp, set: setTp, color: SUCCESS },
          ].map(({ label, val, set, color }) => (
            <div key={label}>
              <label style={{ fontFamily: mono, fontSize: 10, color: color === TEXT ? MUTED : color + '99', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, display: 'block' }}>{label}</label>
              <input
                type="number" step="any" placeholder="0.00000" value={val}
                onChange={e => set(e.target.value)} style={inputStyle}
              />
            </div>
          ))}
        </div>

        {/* Clear */}
        {hasValues && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button onClick={clear} style={{ fontFamily: mono, fontSize: 10, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              ✕ clear
            </button>
          </div>
        )}

        {/* Validation */}
        {hasValues && !quadrants && (
          <div style={{ fontFamily: mono, fontSize: 12, color: DANGER, marginBottom: 16 }}>
            {direction === 'long' ? 'For a long: entry must be above SL and below TP.' : 'For a short: entry must be below SL and above TP.'}
          </div>
        )}

        {/* Lot Size Calculator Section */}
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => setIsLotOpen(!isLotOpen)}
            style={{
              background: 'transparent',
              border: `1px solid ${isLotOpen ? GOLD : 'rgba(255, 255, 255, 0.15)'}`,
              color: isLotOpen ? GOLD : TEXT,
              cursor: 'pointer',
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 500,
              padding: '10px 16px',
              borderRadius: 3,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>Lot Size Calculator</span>
            <span style={{ fontSize: 9 }}>{isLotOpen ? '▲' : '▼'}</span>
          </button>

          {isLotOpen && (
            <div style={{
              marginTop: 12,
              background: SURFACE,
              border: `1px solid ${GOLD_BORDER}`,
              borderRadius: 4,
              padding: '20px',
              boxSizing: 'border-box',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {/* Instrument Dropdown */}
                <div>
                  <label style={{ fontFamily: mono, fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, display: 'block' }}>Instrument</label>
                  <select
                    value={instrument}
                    onChange={e => setInstrument(e.target.value)}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      background: `${SURFACE2} url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>") no-repeat right 12px center`,
                      paddingRight: 32,
                    }}
                  >
                    <optgroup label="Forex" style={{ background: SURFACE2 }}>
                      <option value="forex-majors">Forex Majors/Minors</option>
                      <option value="forex-jpy">Forex JPY Pairs</option>
                    </optgroup>
                    <optgroup label="Metals" style={{ background: SURFACE2 }}>
                      <option value="gold">Gold (XAU/USD)</option>
                      <option value="silver">Silver (XAG/USD)</option>
                    </optgroup>
                    <optgroup label="Indices" style={{ background: SURFACE2 }}>
                      <option value="us30">US30</option>
                      <option value="us500">US500 (S&P 500)</option>
                      <option value="nas100">NAS100</option>
                    </optgroup>
                    <optgroup label="Crypto" style={{ background: SURFACE2 }}>
                      <option value="btc">BTC/USD</option>
                      <option value="eth">ETH/USD</option>
                      <option value="crypto-other">Other Crypto</option>
                    </optgroup>
                  </select>
                </div>

                {/* Account State Toggle */}
                <div>
                  <label style={{ fontFamily: mono, fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, display: 'block' }}>Account State</label>
                  <div style={{ display: 'flex', gap: 8, height: 42 }}>
                    {['green', 'recovery'].map(mode => {
                      const isActive = accountMode === mode
                      return (
                        <button
                          key={mode}
                          onClick={() => setAccountMode(mode)}
                          style={{
                            flex: 1,
                            fontFamily: mono,
                            fontSize: 11,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            borderRadius: 3,
                            border: `1px solid ${isActive ? (mode === 'recovery' ? DANGER : SUCCESS) : BORDER}`,
                            cursor: 'pointer',
                            background: isActive ? (mode === 'recovery' ? 'rgba(224,85,85,0.15)' : 'rgba(76,175,125,0.15)') : 'transparent',
                            color: isActive ? (mode === 'recovery' ? DANGER : SUCCESS) : MUTED,
                            fontWeight: isActive ? 600 : 400,
                            transition: 'all 0.15s',
                          }}
                        >
                          {mode === 'green' ? '🟢 Green Mode' : '⚠️ Recovery'}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Risk Row */}
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Risk Parameters</span>
                  <div style={{ display: 'flex', gap: 1, background: BORDER, borderRadius: 3, padding: 1 }}>
                    {['percent', 'dollar'].map(m => (
                      <button
                        key={m}
                        onClick={() => setRiskMode(m)}
                        style={{
                          fontFamily: mono,
                          fontSize: 9,
                          padding: '4px 10px',
                          borderRadius: 2,
                          border: 'none',
                          cursor: 'pointer',
                          background: riskMode === m ? GOLD : 'transparent',
                          color: riskMode === m ? '#0a0a0a' : MUTED,
                          fontWeight: riskMode === m ? 600 : 400,
                          transition: 'all 0.1s',
                        }}
                      >
                        {m === 'percent' ? '%' : '$'}
                      </button>
                    ))}
                  </div>
                </div>

                {accountMode === 'recovery' && (
                  <div style={{
                    fontFamily: mono,
                    fontSize: 10,
                    color: DANGER,
                    background: 'rgba(224,85,85,0.08)',
                    border: `1px solid rgba(224,85,85,0.2)`,
                    borderRadius: 3,
                    padding: '8px 12px',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <span>⚠️</span>
                    <span>Recovery Mode Active: Risk is halved and locked to 0.5% per split account.</span>
                  </div>
                )}

                {riskMode === 'percent' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
                    <div>
                      <label style={{ fontFamily: mono, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, display: 'block' }}>Account Balance ($)</label>
                      <input
                        type="number"
                        placeholder="10000"
                        value={balance}
                        onChange={e => setBalance(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: mono, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, display: 'block' }}>Risk %</label>
                      <input
                        type="number"
                        step="any"
                        disabled={accountMode === 'recovery'}
                        value={accountMode === 'recovery' ? '0.5' : riskPercent}
                        onChange={e => setRiskPercent(e.target.value)}
                        style={{
                          ...inputStyle,
                          opacity: accountMode === 'recovery' ? 0.5 : 1,
                          cursor: accountMode === 'recovery' ? 'not-allowed' : 'text',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontFamily: mono, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, display: 'block' }}>Dollar Amount to Risk ($)</label>
                    <input
                      type="number"
                      placeholder="100"
                      value={riskDollar}
                      onChange={e => setRiskDollar(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                )}

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
                  <div style={{
                    fontFamily: mono,
                    fontSize: 10,
                    background: 'rgba(201,168,76,0.1)',
                    border: `1px solid ${GOLD_BORDER}`,
                    borderRadius: 20,
                    padding: '4px 12px',
                    color: GOLD,
                    display: 'inline-block',
                  }}>
                    risk per split account: ${fmt(riskAmount, 2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Output */}
        {quadrants && (
          <>
            {/* Summary bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}>
              {[
                { label: 'SL range', val: fmt(quadrants[0].risk * splits, dec) },
                { label: 'Zone size', val: fmt(quadrants[0].risk, dec) },
                { label: 'Original R:R', val: `1:${originalRR.toFixed(1)}` },
              ].map(({ label, val }, i) => (
                <div key={label} style={{ padding: '14px 16px', borderRight: i < 2 ? `1px solid ${BORDER}` : 'none' }}>
                  <div style={{ fontFamily: mono, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 500, color: GOLD }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Q Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: splits === 3 ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr 1fr',
              gap: 10,
              marginBottom: 16
            }}>
              {quadrants.map((q, i) => (
                <QCard
                  key={i}
                  q={q}
                  index={i}
                  showLotDetails={showLotDetails}
                  lotSize={calculatedLotSize}
                  riskAmount={riskAmount}
                />
              ))}
            </div>

            {/* Summary Table */}
            {showLotDetails && (
              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: mono, fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: SURFACE2, borderBottom: `1px solid ${BORDER}` }}>
                      <th style={{ padding: '10px 16px', fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>Zone</th>
                      <th style={{ padding: '10px 16px', fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Lot Size</th>
                      <th style={{ padding: '10px 16px', fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>SL Pips</th>
                      <th style={{ padding: '10px 16px', fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Risk</th>
                      <th style={{ padding: '10px 16px', fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quadrants.map((q, idx) => {
                      const rewardVal = riskAmount * q.rr
                      const accents = [GOLD, '#b48c3c', '#8c6428', '#5a3c14']
                      return (
                        <tr key={idx} style={{ borderBottom: `1px solid ${BORDER}` }}>
                          <td style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: accents[idx % accents.length] }}>{q.label}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'right', color: TEXT }}>{fmt(calculatedLotSize, 3)}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'right', color: TEXT }}>{fmt(slPips, 1)}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'right', color: DANGER }}>-${fmt(riskAmount, 2)}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'right', color: SUCCESS }}>+${fmt(rewardVal, 2)}</td>
                        </tr>
                      )
                    })}
                    <tr style={{ background: 'rgba(255, 255, 255, 0.02)', fontWeight: 600 }}>
                      <td style={{ padding: '12px 16px', textAlign: 'left', color: GOLD }}>Total ({splits} Zones)</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: MUTED }}>—</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: MUTED }}>—</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: DANGER }}>-${fmt(riskAmount * splits, 2)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: SUCCESS }}>
                        +${fmt(quadrants.reduce((sum, q) => sum + (riskAmount * q.rr), 0), 2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Price ladder */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ padding: '10px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em' }}>price ladder ({splits} splits)</span>
                <span style={{ fontFamily: mono, fontSize: 10, color: MUTED }}>entry · sl · r:r</span>
              </div>
              {/* TP row */}
              <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 110px 60px', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${BORDER}`, alignItems: 'center', background: 'rgba(76,175,125,0.05)' }}>
                <span style={{ fontFamily: mono, fontSize: 10, color: SUCCESS }}>TP</span>
                <div style={{ height: 2, background: SUCCESS, borderRadius: 1 }} />
                <span style={{ fontFamily: mono, fontSize: 12, color: SUCCESS, textAlign: 'right' }}>{fmt(parseFloat(tp), dec)}</span>
                <span />
                <span style={{ fontFamily: mono, fontSize: 10, color: SUCCESS, textAlign: 'right' }}>target</span>
              </div>
              {/* Quadrant rows */}
              {quadrants.map((q, i) => {
                const accents = [GOLD, '#b48c3c', '#8c6428', '#5a3c14']
                const stepPct = 100 - i * (100 / splits)
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 110px 60px', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${BORDER}`, alignItems: 'center' }}>
                    <span style={{ fontFamily: mono, fontSize: 10, color: accents[i % accents.length] }}>{q.label}</span>
                    <div style={{ height: 2, background: BORDER, borderRadius: 1 }}>
                      <div style={{ height: 2, background: accents[i % accents.length], width: `${stepPct}%`, borderRadius: 1 }} />
                    </div>
                    <span style={{ fontFamily: mono, fontSize: 12, color: TEXT, textAlign: 'right' }}>{fmt(q.entry, dec)}</span>
                    <span style={{ fontFamily: mono, fontSize: 12, color: DANGER, textAlign: 'right' }}>→ {fmt(q.sl, dec)}</span>
                    <span style={{ fontFamily: mono, fontSize: 12, color: accents[i % accents.length], textAlign: 'right', fontWeight: 600 }}>1:{q.rr.toFixed(0)}</span>
                  </div>
                )
              })}
              {/* SL floor */}
              <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 110px 60px', gap: 8, padding: '10px 16px', alignItems: 'center', background: 'rgba(224,85,85,0.04)' }}>
                <span style={{ fontFamily: mono, fontSize: 10, color: DANGER }}>SL</span>
                <div style={{ height: 2, background: DANGER, borderRadius: 1, opacity: 0.4 }} />
                <span style={{ fontFamily: mono, fontSize: 12, color: DANGER, textAlign: 'right' }}>{fmt(parseFloat(sl), dec)}</span>
                <span /><span />
              </div>
            </div>

            {/* Insight bar */}
            <div style={{ padding: '12px 16px', background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, borderRadius: 3 }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: GOLD }}>// worst case: </span>
              <span style={{ fontFamily: mono, fontSize: 10, color: SECONDARY }}>
                {showLotDetails ? (
                  <>
                    all {splits} SL hit = −{splits}R (-${fmt(riskAmount * splits, 2)}). One Q1 win = +{quadrants[0].rr.toFixed(0)}R (+${fmt(riskAmount * quadrants[0].rr, 2)}). Break-even win rate on Q1: {(100 / (quadrants[0].rr + 1)).toFixed(1)}%
                  </>
                ) : (
                  <>
                    all {splits} SL hit = −{splits}R. One Q1 win = +{quadrants[0].rr.toFixed(0)}R. Break-even win rate on Q1: {(100 / (quadrants[0].rr + 1)).toFixed(1)}%
                  </>
                )}
              </span>
            </div>
          </>
        )}

        {/* Empty state */}
        {!hasValues && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: MUTED, letterSpacing: '0.1em' }}>
              enter a signal above to split into {splits === 3 ? '3 zones (Q3 mode)' : '4 quadrants (Q4 mode)'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
