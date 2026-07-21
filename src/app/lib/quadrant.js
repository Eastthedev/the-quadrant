// ── QUADRANT MATH ──

export function calcQuadrants(entry, sl, tp, direction = 'long', splits = 4) {
  const e = parseFloat(entry), s = parseFloat(sl), t = parseFloat(tp)
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
    return {
      label: `Q${i + 1}`,
      entry: qEntry,
      sl: qSL,
      tp: t,
      risk: zone,
      reward: qReward,
      rr: qReward / zone,
    }
  })
}

// ── RISK AMOUNTS ──
export function getRiskAmount(balance, riskState) {
  const pct = riskState === 'recovery' ? 0.005 : 0.01
  return balance * pct
}

// ── LOT SIZE ──
const INSTRUMENT_CONFIGS = {
  forex_major: { pipSize: 0.0001, pipValuePerLot: 10 },
  forex_jpy:   { pipSize: 0.01,   pipValuePerLot: 1000 },
  gold:        { pipSize: 0.01,   pipValuePerLot: 100 },
  silver:      { pipSize: 0.001,  pipValuePerLot: 5 },
  us30:        { pipSize: 1,      pipValuePerLot: 1 },
  us500:       { pipSize: 0.01,   pipValuePerLot: 1 },
  nas100:      { pipSize: 0.01,   pipValuePerLot: 1 },
  btcusd:      { pipSize: 1,      pipValuePerLot: 1 },
  ethusd:      { pipSize: 0.01,   pipValuePerLot: 1 },
  other:       { pipSize: 1,      pipValuePerLot: 1 },
}

export function calcLotSize(riskAmount, slPriceDiff, instrumentKey = 'forex_major') {
  const cfg = INSTRUMENT_CONFIGS[instrumentKey] || INSTRUMENT_CONFIGS.forex_major
  const slPips = Math.abs(slPriceDiff) / cfg.pipSize
  if (!slPips || slPips <= 0) return null
  const lots = riskAmount / (slPips * cfg.pipValuePerLot)
  return Math.max(0.001, Math.round(lots * 1000) / 1000)
}

// ── P&L ──
export function calcPnl(riskAmount, rr, result) {
  if (result === 'win') return riskAmount * rr
  if (result === 'loss') return -riskAmount
  return 0
}

// ── FORMAT ──
export function fmt(n, d = 3) {
  if (n == null || isNaN(n)) return '—'
  return parseFloat(n).toFixed(d)
}

export function fmtCurrency(n) {
  if (n == null || isNaN(n)) return '—'
  const abs = Math.abs(n)
  const formatted = abs >= 1000
    ? '$' + (abs / 1000).toFixed(1) + 'k'
    : '$' + abs.toFixed(2)
  return n < 0 ? '-' + formatted : formatted
}

export function fmtPct(n) {
  if (n == null || isNaN(n)) return '—'
  return (n * 100).toFixed(2) + '%'
}

export function detectDecimals(val) {
  const s = String(val); const dot = s.indexOf('.')
  return dot === -1 ? 0 : s.length - dot - 1
}
