'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Nav from '../../components/Nav'
import { Badge } from '../../components/UI'
import { C, mono, syne, sans, btnPrimary, btnGhost, inputStyle, selectStyle } from '../../lib/theme'
import { calcQuadrants, getRiskAmount, calcLotSize, fmt, fmtCurrency, detectDecimals } from '../../lib/quadrant'

const INSTRUMENTS = [
  { value: 'forex_major', label: 'Forex Majors/Minors' },
  { value: 'forex_jpy',   label: 'Forex JPY Pairs' },
  { value: 'gold',        label: 'Gold (XAU/USD)' },
  { value: 'silver',      label: 'Silver (XAG/USD)' },
  { value: 'us30',        label: 'US30 (Dow Jones)' },
  { value: 'us500',       label: 'US500 (S&P 500)' },
  { value: 'nas100',      label: 'NAS100 (Nasdaq)' },
  { value: 'btcusd',      label: 'BTC/USD' },
  { value: 'ethusd',      label: 'ETH/USD' },
  { value: 'other',       label: 'Other' },
]

const Q_COLORS = ['#c9a84c','#b48c3c','#8c6428','#5a3c14']
const Q_BG     = ['rgba(201,168,76,0.08)','rgba(180,140,60,0.06)','rgba(140,100,40,0.06)','rgba(90,60,20,0.06)']
const Q_BORDER = ['rgba(201,168,76,0.35)','rgba(180,140,60,0.25)','rgba(140,100,40,0.2)','rgba(90,60,20,0.18)']

function NewTradeInner() {
  const params = useSearchParams()
  const router = useRouter()
  const preselectedAccount = params.get('account') || ''

  const [accounts, setAccounts] = useState([])
  const [quadrants, setQuadrants] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(preselectedAccount)
  const [saving, setSaving] = useState(false)

  // Signal inputs
  const [pair, setPair] = useState('')
  const [direction, setDirection] = useState('long')
  const [entry, setEntry] = useState('')
  const [sl, setSl] = useState('')
  const [tp, setTp] = useState('')
  const [instrument, setInstrument] = useState('forex_major')
  const [notes, setNotes] = useState('')

  useEffect(() => { loadAccounts() }, [])
  useEffect(() => {
    if (selectedAccount) loadQuadrants(selectedAccount)
  }, [selectedAccount])

  async function loadAccounts() {
    const { data } = await supabase.from('accounts').select('*').order('created_at', { ascending: false })
    setAccounts(data || [])
    if (!preselectedAccount && data?.length > 0) setSelectedAccount(data[0].id)
  }

  async function loadQuadrants(accountId) {
    const { data } = await supabase.from('quadrants').select('*').eq('account_id', accountId).order('label')
    setQuadrants(data || [])
  }

  const quads = calcQuadrants(entry, sl, tp, direction)
  const dec = detectDecimals(entry) || 3
  const account = accounts.find(a => a.id === selectedAccount)

  const originalRR = quads
    ? (direction === 'long'
        ? (parseFloat(tp) - parseFloat(entry)) / (parseFloat(entry) - parseFloat(sl))
        : (parseFloat(entry) - parseFloat(tp)) / (parseFloat(sl) - parseFloat(entry)))
    : null

  async function saveTrade() {
    if (!quads || !selectedAccount) return
    setSaving(true)

    const { data: trade, error } = await supabase.from('trades').insert({
      account_id: selectedAccount,
      pair: pair || null,
      direction,
      entry: parseFloat(entry),
      sl: parseFloat(sl),
      tp: parseFloat(tp),
      zone_size: quads[0].risk,
      q1_entry: quads[0].entry, q1_sl: quads[0].sl,
      q2_entry: quads[1].entry, q2_sl: quads[1].sl,
      q3_entry: quads[2].entry, q3_sl: quads[2].sl,
      q4_entry: quads[3].entry, q4_sl: quads[3].sl,
      status: 'open',
      notes: notes || null,
    }).select().single()

    if (trade) {
      router.push(`/trades/${trade.id}`)
    }
    setSaving(false)
  }

  const labelStyle = { fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, display: 'block' }

  return (
    <div style={{ background: C.black, minHeight: '100vh', fontFamily: sans, color: C.text }}>
      <Nav />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: C.gold, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.7 }}>// new trade</div>
          <h1 style={{ fontFamily: syne, fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Log Signal</h1>
        </div>

        {/* Account selector */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={labelStyle}>Account</label>
              <select style={selectStyle} value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)}>
                {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Instrument Type</label>
              <select style={selectStyle} value={instrument} onChange={e => setInstrument(e.target.value)}>
                {INSTRUMENTS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Signal inputs */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: C.gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, opacity: 0.7 }}>// signal</div>

          {/* Direction */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Direction</label>
            <div style={{ display: 'flex', gap: 1, background: C.border, borderRadius: 4, padding: 1, width: 'fit-content' }}>
              {['long','short'].map(d => (
                <button key={d} onClick={() => setDirection(d)} style={{
                  fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '7px 24px', borderRadius: 3, border: 'none', cursor: 'pointer',
                  background: direction === d ? (d === 'long' ? C.success : C.danger) : 'transparent',
                  color: direction === d ? '#0a0a0a' : C.muted,
                  fontWeight: direction === d ? 600 : 400, transition: 'all 0.15s',
                }}>{d === 'long' ? '▲ Long' : '▼ Short'}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 0 }}>
            <div>
              <label style={labelStyle}>Pair (optional)</label>
              <input style={inputStyle} placeholder="GBPJPY" value={pair} onChange={e => setPair(e.target.value.toUpperCase())} />
            </div>
            <div>
              <label style={labelStyle}>Entry</label>
              <input style={inputStyle} type="number" step="any" placeholder="0.00000" value={entry} onChange={e => setEntry(e.target.value)} />
            </div>
            <div>
              <label style={{ ...labelStyle, color: C.danger + '88' }}>Stop Loss</label>
              <input style={inputStyle} type="number" step="any" placeholder="0.00000" value={sl} onChange={e => setSl(e.target.value)} />
            </div>
            <div>
              <label style={{ ...labelStyle, color: C.success + '88' }}>Take Profit</label>
              <input style={inputStyle} type="number" step="any" placeholder="0.00000" value={tp} onChange={e => setTp(e.target.value)} />
            </div>
          </div>

          {entry && sl && tp && !quads && (
            <div style={{ fontFamily: mono, fontSize: 11, color: C.danger, marginTop: 10 }}>
              {direction === 'long' ? 'Long: entry must be above SL and below TP.' : 'Short: entry must be below SL and above TP.'}
            </div>
          )}
        </div>

        {/* Quadrant analysis */}
        {quads && (
          <>
            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, marginBottom: 12, overflow: 'hidden' }}>
              {[
                { label: 'SL Range', val: fmt(quads[0].risk * 4, dec) },
                { label: 'Zone Size', val: fmt(quads[0].risk, dec) },
                { label: 'Original R:R', val: `1:${originalRR?.toFixed(1)}` },
              ].map(({ label, val }, i) => (
                <div key={label} style={{ padding: '12px 16px', borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 500, color: C.gold }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Q Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              {quads.map((q, i) => {
                const qData = quadrants[i]
                const riskAmt = qData ? getRiskAmount(qData.current_balance, qData.risk_state) : null
                const lotSize = riskAmt ? calcLotSize(riskAmt, q.risk, instrument) : null
                return (
                  <div key={i} style={{ background: Q_BG[i], border: `1px solid ${Q_BORDER[i]}`, borderRadius: 4, padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.15em', color: Q_COLORS[i], textTransform: 'uppercase' }}>{q.label}</span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: syne, fontSize: 18, fontWeight: 700, color: Q_COLORS[i] }}>1:{q.rr.toFixed(1)}</span>
                        {qData && <div style={{ fontFamily: mono, fontSize: 9, color: qData.risk_state === 'green' ? C.success : C.warn, marginTop: 2 }}>
                          {qData.risk_state === 'green' ? '● Green' : '● Recovery'}
                        </div>}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
                      {[
                        { label: 'entry', val: fmt(q.entry, dec), color: C.text },
                        { label: 'stop loss', val: fmt(q.sl, dec), color: C.danger },
                        { label: 'take profit', val: fmt(q.tp, dec), color: C.success },
                      ].map(({ label, val, color }) => (
                        <div key={label}>
                          <div style={{ fontFamily: mono, fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</div>
                          <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 500, color }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    {riskAmt && (
                      <div style={{ borderTop: `1px solid ${Q_BORDER[i]}`, paddingTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                        <div>
                          <div style={{ fontFamily: mono, fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>risk</div>
                          <div style={{ fontFamily: mono, fontSize: 12, color: C.danger }}>{fmtCurrency(riskAmt)}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: mono, fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>reward</div>
                          <div style={{ fontFamily: mono, fontSize: 12, color: C.success }}>{fmtCurrency(riskAmt * q.rr)}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: mono, fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>lots</div>
                          <div style={{ fontFamily: mono, fontSize: 12, color: Q_COLORS[i], fontWeight: 600 }}>{lotSize ?? '—'}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Insight bar */}
            <div style={{ padding: '10px 14px', background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 3, marginBottom: 16 }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.gold }}>// worst case: </span>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.secondary }}>
                all 4 SL hit = −4R. One Q1 win = +{quads[0].rr.toFixed(0)}R. Q1 break-even win rate: {(100 / (quads[0].rr + 1)).toFixed(1)}%
              </span>
            </div>
          </>
        )}

        {/* Notes */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20, marginBottom: 20 }}>
          <label style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, display: 'block' }}>Notes (optional)</label>
          <textarea style={{ ...inputStyle, height: 80, resize: 'vertical', fontFamily: sans, fontSize: 13 }}
            placeholder="Trade rationale, confluence, session..." value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={saveTrade} disabled={!quads || saving} style={{ ...btnPrimary, opacity: (!quads || saving) ? 0.5 : 1 }}>
            {saving ? 'Saving...' : 'Save Trade →'}
          </button>
          <button onClick={() => router.back()} style={btnGhost}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function NewTradePage() {
  return <Suspense><NewTradeInner /></Suspense>
}
