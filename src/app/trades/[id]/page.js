'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Nav from '../../components/Nav'
import { Badge, QuadrantPill } from '../../components/UI'
import { C, mono, syne, sans, btnPrimary, btnGhost } from '../../lib/theme'
import { getRiskAmount, calcLotSize, fmt, fmtCurrency, calcPnl, detectDecimals } from '../../lib/quadrant'

const Q_COLORS = ['#c9a84c','#b48c3c','#8c6428','#5a3c14']
const Q_BG     = ['rgba(201,168,76,0.08)','rgba(180,140,60,0.06)','rgba(140,100,40,0.06)','rgba(90,60,20,0.06)']
const Q_BORDER = ['rgba(201,168,76,0.35)','rgba(180,140,60,0.25)','rgba(140,100,40,0.2)','rgba(90,60,20,0.18)']

const OUTCOMES = [
  { value: 'win',    label: '✓ Win',          type: 'green' },
  { value: 'loss',   label: '✗ Loss',         type: 'danger' },
  { value: 'missed', label: '— Missed Entry', type: 'default' },
]

export default function TradeDetail() {
  const { id } = useParams()
  const router = useRouter()

  const [trade, setTrade] = useState(null)
  const [account, setAccount] = useState(null)
  const [quadrants, setQuadrants] = useState([])
  const [outcomes, setOutcomes] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Outcome selections per quadrant
  const [selections, setSelections] = useState({ Q1: null, Q2: null, Q3: null, Q4: null })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => { if (id) load() }, [id])

  async function load() {
    setLoading(true)
    const { data: tr } = await supabase.from('trades').select('*').eq('id', id).single()
    if (!tr) { setLoading(false); return }
    setTrade(tr)

    const [{ data: acc }, { data: quads }, { data: outs }] = await Promise.all([
      supabase.from('accounts').select('*').eq('id', tr.account_id).single(),
      supabase.from('quadrants').select('*').eq('account_id', tr.account_id).order('label'),
      supabase.from('trade_outcomes').select('*').eq('trade_id', id),
    ])

    setAccount(acc)
    setQuadrants(quads || [])
    setOutcomes(outs || [])

    // Pre-fill selections if already logged
    if (outs?.length > 0) {
      const sel = {}
      outs.forEach(o => { sel[o.quadrant_label] = o.result })
      setSelections(sel)
      setSubmitted(true)
    }
    setLoading(false)
  }

  const tradeQuads = trade ? [
    { label: 'Q1', entry: trade.q1_entry, sl: trade.q1_sl, tp: trade.tp },
    { label: 'Q2', entry: trade.q2_entry, sl: trade.q2_sl, tp: trade.tp },
    { label: 'Q3', entry: trade.q3_entry, sl: trade.q3_sl, tp: trade.tp },
    { label: 'Q4', entry: trade.q4_entry, sl: trade.q4_sl, tp: trade.tp },
  ] : []

  const dec = trade ? (detectDecimals(trade.entry) || 3) : 3

  async function submitOutcomes() {
    const allSelected = ['Q1','Q2','Q3','Q4'].every(ql => selections[ql] !== null)
    if (!allSelected || !trade) return
    setSaving(true)

    const outcomeInserts = []
    const quadrantUpdates = []

    for (let i = 0; i < 4; i++) {
      const ql = `Q${i + 1}`
      const result = selections[ql]
      const q = quadrants.find(x => x.label === ql)
      if (!q) continue

      const tq = tradeQuads[i]
      const riskAmt = getRiskAmount(q.current_balance, q.risk_state)
      const reward = trade.direction === 'long'
        ? trade.tp - tq.entry
        : tq.entry - trade.tp
      const rr = reward / trade.zone_size
      const pnl = calcPnl(riskAmt, rr, result)
      const lotSize = calcLotSize(riskAmt, trade.zone_size, 'forex_major')

      outcomeInserts.push({
        trade_id: trade.id,
        quadrant_id: q.id,
        quadrant_label: ql,
        result,
        lot_size: lotSize,
        risk_amount: riskAmt,
        pnl,
        rr_achieved: result === 'win' ? rr : result === 'loss' ? -1 : 0,
      })

      const newBalance = result === 'missed' ? q.current_balance : q.current_balance + pnl
      const newRiskState = newBalance >= q.starting_balance ? 'green' : 'recovery'
      const newWins = q.wins + (result === 'win' ? 1 : 0)
      const newLosses = q.losses + (result === 'loss' ? 1 : 0)
      const newMissed = q.missed + (result === 'missed' ? 1 : 0)

      quadrantUpdates.push(supabase.from('quadrants').update({
        current_balance: newBalance,
        risk_state: newRiskState,
        wins: newWins,
        losses: newLosses,
        missed: newMissed,
      }).eq('id', q.id))
    }

    await supabase.from('trade_outcomes').insert(outcomeInserts)
    await Promise.all(quadrantUpdates)
    await supabase.from('trades').update({ status: 'closed' }).eq('id', trade.id)

    setSubmitted(true)
    await load()
    setSaving(false)
  }

  const totalPnl = outcomes.reduce((s, o) => s + (o.pnl || 0), 0)

  if (loading) return <div style={{ background: C.black, minHeight: '100vh' }}><Nav /><div style={{ padding: 40, fontFamily: mono, fontSize: 11, color: C.muted }}>Loading...</div></div>
  if (!trade) return <div style={{ background: C.black, minHeight: '100vh' }}><Nav /><div style={{ padding: 40, fontFamily: mono, fontSize: 11, color: C.danger }}>Trade not found.</div></div>

  return (
    <div style={{ background: C.black, minHeight: '100vh', fontFamily: sans, color: C.text }}>
      <Nav />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', fontFamily: mono, fontSize: 10, color: C.muted, cursor: 'pointer', letterSpacing: '0.08em', marginBottom: 10, padding: 0 }}>← Back</button>
            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <h1 style={{ fontFamily: syne, fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                {trade.pair || 'Trade'} — {trade.direction === 'long' ? '▲ Long' : '▼ Short'}
              </h1>
              <Badge type={trade.status === 'open' ? 'gold' : 'default'}>{trade.status}</Badge>
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.muted, marginTop: 6 }}>{account?.name} · {new Date(trade.created_at).toLocaleString()}</div>
          </div>
          {submitted && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Total P&L</div>
              <div style={{ fontFamily: syne, fontSize: 24, fontWeight: 700, color: totalPnl >= 0 ? C.success : C.danger }}>
                {totalPnl >= 0 ? '+' : ''}{fmtCurrency(totalPnl)}
              </div>
            </div>
          )}
        </div>

        {/* Signal summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}>
          {[
            { label: 'Entry', val: fmt(trade.entry, dec), color: C.text },
            { label: 'Stop Loss', val: fmt(trade.sl, dec), color: C.danger },
            { label: 'Take Profit', val: fmt(trade.tp, dec), color: C.success },
            { label: 'Zone Size', val: fmt(trade.zone_size, dec), color: C.gold },
          ].map(({ label, val, color }, i) => (
            <div key={label} style={{ padding: '12px 16px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 500, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Quadrant cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {tradeQuads.map((tq, i) => {
            const q = quadrants.find(x => x.label === tq.label)
            const riskAmt = q ? getRiskAmount(q.current_balance, q.risk_state) : null
            const reward = trade.direction === 'long' ? trade.tp - tq.entry : tq.entry - trade.tp
            const rr = reward / trade.zone_size
            const outcome = outcomes.find(o => o.quadrant_label === tq.label)

            return (
              <div key={i} style={{ background: Q_BG[i], border: `1px solid ${Q_BORDER[i]}`, borderRadius: 4, padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.15em', color: Q_COLORS[i], textTransform: 'uppercase' }}>{tq.label}</span>
                    {q && <div style={{ fontFamily: mono, fontSize: 9, color: q.risk_state === 'green' ? C.success : C.warn, marginTop: 3 }}>
                      {q.risk_state === 'green' ? '● Green 1%' : '● Recovery 0.5%'}
                    </div>}
                  </div>
                  <span style={{ fontFamily: syne, fontSize: 18, fontWeight: 700, color: Q_COLORS[i] }}>1:{rr.toFixed(1)}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
                  {[
                    { label: 'entry', val: fmt(tq.entry, dec), color: C.text },
                    { label: 'stop loss', val: fmt(tq.sl, dec), color: C.danger },
                    { label: 'take profit', val: fmt(tq.tp, dec), color: C.success },
                  ].map(({ label, val, color }) => (
                    <div key={label}>
                      <div style={{ fontFamily: mono, fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 500, color }}>{val}</div>
                    </div>
                  ))}
                </div>

                {riskAmt && (
                  <div style={{ borderTop: `1px solid ${Q_BORDER[i]}`, paddingTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>risk</div>
                      <div style={{ fontFamily: mono, fontSize: 12, color: C.danger }}>{fmtCurrency(riskAmt)}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>reward</div>
                      <div style={{ fontFamily: mono, fontSize: 12, color: C.success }}>{fmtCurrency(riskAmt * rr)}</div>
                    </div>
                  </div>
                )}

                {/* Outcome result or selector */}
                {submitted && outcome ? (
                  <div style={{
                    borderTop: `1px solid ${Q_BORDER[i]}`, paddingTop: 10,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <Badge type={outcome.result === 'win' ? 'green' : outcome.result === 'loss' ? 'danger' : 'default'}>
                      {outcome.result === 'win' ? '✓ Win' : outcome.result === 'loss' ? '✗ Loss' : '— Missed'}
                    </Badge>
                    {outcome.result !== 'missed' && (
                      <span style={{ fontFamily: mono, fontSize: 12, color: outcome.pnl >= 0 ? C.success : C.danger, fontWeight: 600 }}>
                        {outcome.pnl >= 0 ? '+' : ''}{fmtCurrency(outcome.pnl)}
                      </span>
                    )}
                  </div>
                ) : !submitted ? (
                  <div style={{ borderTop: `1px solid ${Q_BORDER[i]}`, paddingTop: 10 }}>
                    <div style={{ fontFamily: mono, fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>outcome</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {OUTCOMES.map(o => (
                        <button key={o.value} onClick={() => setSelections(s => ({ ...s, [tq.label]: o.value }))} style={{
                          flex: 1, fontFamily: mono, fontSize: 10, padding: '6px 4px',
                          borderRadius: 3, border: `1px solid ${selections[tq.label] === o.value
                            ? (o.value === 'win' ? C.success : o.value === 'loss' ? C.danger : C.muted)
                            : C.border}`,
                          background: selections[tq.label] === o.value
                            ? (o.value === 'win' ? C.successDim : o.value === 'loss' ? C.dangerDim : 'rgba(90,86,80,0.2)')
                            : 'transparent',
                          color: selections[tq.label] === o.value
                            ? (o.value === 'win' ? C.success : o.value === 'loss' ? C.danger : C.secondary)
                            : C.muted,
                          cursor: 'pointer', transition: 'all 0.1s',
                          letterSpacing: '0.04em',
                        }}>{o.label}</button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* Submit outcomes */}
        {!submitted && (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20 }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.muted, marginBottom: 14 }}>
              Select an outcome for each quadrant, then submit to update account balances and risk states.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={submitOutcomes}
                disabled={!['Q1','Q2','Q3','Q4'].every(ql => selections[ql]) || saving}
                style={{ ...btnPrimary, opacity: (!['Q1','Q2','Q3','Q4'].every(ql => selections[ql]) || saving) ? 0.4 : 1 }}
              >
                {saving ? 'Saving...' : 'Submit Outcomes →'}
              </button>
            </div>
          </div>
        )}

        {/* Submitted summary */}
        {submitted && (
          <div style={{ padding: '14px 18px', background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 3 }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.gold, marginBottom: 4 }}>// trade closed</div>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.secondary }}>
              Quadrant balances and risk states have been updated. Check each quadrant card to see the new risk allocation for the next trade.
            </div>
          </div>
        )}

        {trade.notes && (
          <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: 16 }}>
            <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Notes</div>
            <div style={{ fontFamily: sans, fontSize: 13, color: C.secondary, lineHeight: 1.65 }}>{trade.notes}</div>
          </div>
        )}
      </div>
    </div>
  )
}
