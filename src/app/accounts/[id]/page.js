'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Nav from '../../components/Nav'
import { Badge, StatCard, SectionTitle, QuadrantPill } from '../../components/UI'
import { C, mono, syne, sans } from '../../lib/theme'
import { fmtCurrency, fmt } from '../../lib/quadrant'
import Link from 'next/link'

export default function AccountDetail() {
  const { id } = useParams()
  const [account, setAccount] = useState(null)
  const [quadrants, setQuadrants] = useState([])
  const [trades, setTrades] = useState([])
  const [outcomes, setOutcomes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { if (id) load() }, [id])

  async function load() {
    setLoading(true)
    const [{ data: acc }, { data: quads }, { data: trs }, { data: outs }] = await Promise.all([
      supabase.from('accounts').select('*').eq('id', id).single(),
      supabase.from('quadrants').select('*').eq('account_id', id).order('label'),
      supabase.from('trades').select('*').eq('account_id', id).order('created_at', { ascending: false }),
      supabase.from('trade_outcomes').select('*'),
    ])
    setAccount(acc)
    setQuadrants(quads || [])
    setTrades(trs || [])
    setOutcomes(outs || [])
    setLoading(false)
  }

  if (loading) return (
    <div style={{ background: C.black, minHeight: '100vh' }}><Nav />
      <div style={{ padding: 40, fontFamily: mono, fontSize: 11, color: C.muted }}>Loading...</div>
    </div>
  )

  if (!account) return (
    <div style={{ background: C.black, minHeight: '100vh' }}><Nav />
      <div style={{ padding: 40, fontFamily: mono, fontSize: 11, color: C.danger }}>Account not found.</div>
    </div>
  )

  // Source of truth: sum live quadrant balances (captures both trade outcomes AND manual adjustments)
  const currentBalance = quadrants.reduce((s, q) => s + parseFloat(q.current_balance || 0), 0)
  const accPnl = currentBalance - account.total_size
  const drawdown = account.total_size > 0 ? (currentBalance - account.total_size) / account.total_size : 0
  const quadColors = ['#c9a84c', '#b48c3c', '#8c6428', '#5a3c14']

  return (
    <div style={{ background: C.black, minHeight: '100vh', fontFamily: sans, color: C.text }}>
      <Nav />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        {(() => {
          const splitsCount = account.splits || (quadrants.length === 3 ? 3 : 4)
          return (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div>
                  <Link href="/accounts" style={{ fontFamily: mono, fontSize: 10, color: C.muted, textDecoration: 'none', letterSpacing: '0.08em' }}>← Accounts</Link>
                  <h1 style={{ fontFamily: syne, fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', margin: '10px 0 8px' }}>{account.name}</h1>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Badge type={account.type === 'single' ? 'gold' : 'default'}>{account.type === 'single' ? 'Single Account' : 'Multi Account'}</Badge>
                    <Badge type={splitsCount === 3 ? 'gold' : 'default'}>{splitsCount === 3 ? '⚡ Q3 Mode (3 Zones)' : 'Q4 Mode (4 Quads)'}</Badge>
                    {account.broker && <Badge type="default">{account.broker}</Badge>}
                  </div>
                </div>
                <Link href={`/trades/new?account=${id}`} style={{
                  background: C.gold, color: C.black, border: 'none', borderRadius: 3,
                  padding: '10px 20px', fontFamily: mono, fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none'
                }}>+ New Trade</Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
                <StatCard label="Current Balance" value={fmtCurrency(currentBalance)} color={accPnl >= 0 ? C.success : C.danger} sub={`Started: ${fmtCurrency(account.total_size)}`} />
                <StatCard label="Total P&L" value={(accPnl >= 0 ? '+' : '') + fmtCurrency(accPnl)} color={accPnl >= 0 ? C.success : C.danger} sub={`${(drawdown * 100).toFixed(2)}% change`} />
                <StatCard label="Total Trades" value={trades.length} color={C.text} sub={`${trades.filter(t => t.status === 'open').length} open`} />
                <StatCard label="Account Structure" value={splitsCount === 3 ? 'Q3 Mode' : 'Q4 Mode'} color={C.text} sub={account.type === 'single' ? `${splitsCount} virtual ${splitsCount === 3 ? 'zones' : 'quadrants'}` : `${splitsCount} separate accounts`} />
              </div>

              {/* Quadrant breakdown */}
              <SectionTitle>{splitsCount === 3 ? 'Tri-Zone States' : 'Quadrant States'}</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${splitsCount}, 1fr)`, gap: 10, marginBottom: 28 }}>
                {quadrants.map((q, i) => {
                  const qOutcomes = outcomes.filter(o => o.quadrant_id === q.id)
                  const qPnl = qOutcomes.reduce((s, o) => s + (o.pnl || 0), 0)
                  const riskAmt = q.current_balance * (q.risk_state === 'green' ? 0.01 : 0.005)
                  const pctChange = ((q.current_balance - q.starting_balance) / q.starting_balance * 100)

                  return (
                    <div key={q.id} style={{
                      background: C.surface, border: `1px solid ${i === 0 ? C.goldBorder : C.border}`,
                      borderRadius: 4, padding: '18px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, color: quadColors[i % quadColors.length] }}>{q.label}</span>
                        <span style={{ fontFamily: mono, fontSize: 10, color: q.risk_state === 'green' ? C.success : C.warn }}>
                          {q.risk_state === 'green' ? '● Green' : '● Recovery'}
                        </span>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Balance</div>
                        <div style={{ fontFamily: syne, fontSize: 18, fontWeight: 700, color: qPnl >= 0 ? C.text : C.danger }}>{fmtCurrency(q.current_balance)}</div>
                        <div style={{ fontFamily: mono, fontSize: 9, color: pctChange >= 0 ? C.success : C.danger }}>{pctChange >= 0 ? '+' : ''}{pctChange.toFixed(2)}%</div>
                      </div>
                      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        <div>
                          <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, marginBottom: 2 }}>Next Risk</div>
                          <div style={{ fontFamily: mono, fontSize: 12, color: quadColors[i % quadColors.length] }}>{fmtCurrency(riskAmt)}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, marginBottom: 2 }}>Record</div>
                          <div style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{q.wins}W · {q.losses}L</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )
        })()}

        {/* Trade history */}
        <SectionTitle>Trade History</SectionTitle>
        {trades.length === 0 ? (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: 40, textAlign: 'center' }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>No trades yet</div>
          </div>
        ) : (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 70px 100px 100px 100px 120px 1fr', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
              {['Pair', 'Dir', 'Entry', 'SL', 'TP', 'Status', 'P&L'].map(h => (
                <div key={h} style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
              ))}
            </div>
            {trades.map(t => {
              const tOutcomes = outcomes.filter(o => o.trade_id === t.id)
              const tPnl = tOutcomes.reduce((s, o) => s + (o.pnl || 0), 0)
              const dec = 3
              return (
                <Link key={t.id} href={`/trades/${t.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 70px 100px 100px 100px 120px 1fr', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${C.border}`, alignItems: 'center' }}>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{t.pair || '—'}</div>
                    <Badge type={t.direction === 'long' ? 'green' : 'danger'}>{t.direction}</Badge>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{parseFloat(t.entry).toFixed(dec)}</div>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.danger }}>{parseFloat(t.sl).toFixed(dec)}</div>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.success }}>{parseFloat(t.tp).toFixed(dec)}</div>
                    <Badge type={t.status === 'open' ? 'gold' : 'default'}>{t.status}</Badge>
                    <div style={{ fontFamily: mono, fontSize: 12, color: tPnl >= 0 ? C.success : C.danger }}>
                      {t.status === 'closed' ? (tPnl >= 0 ? '+' : '') + fmtCurrency(tPnl) : '—'}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
