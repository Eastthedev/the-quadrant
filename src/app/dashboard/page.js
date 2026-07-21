'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import { StatCard, Badge, SectionTitle, EmptyState, QuadrantPill } from '../components/UI'
import { C, mono, syne, sans, btnPrimary } from '../lib/theme'
import { fmtCurrency, fmtPct } from '../lib/quadrant'
import QuadrantCalculator from '../components/QuadrantCalculator'
import Link from 'next/link'

export default function Dashboard() {
  const [accounts, setAccounts] = useState([])
  const [quadrants, setQuadrants] = useState([])
  const [recentTrades, setRecentTrades] = useState([])
  const [outcomes, setOutcomes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    const [{ data: accs }, { data: quads }, { data: trades }, { data: outs }] = await Promise.all([
      supabase.from('accounts').select('*').order('created_at', { ascending: false }),
      supabase.from('quadrants').select('*'),
      supabase.from('trades').select('*').order('created_at', { ascending: false }).limit(10),
      supabase.from('trade_outcomes').select('*'),
    ])
    setAccounts(accs || [])
    setQuadrants(quads || [])
    setRecentTrades(trades || [])
    setOutcomes(outs || [])
    setLoading(false)
  }

  // Aggregate stats
  const totalPnl = outcomes.reduce((s, o) => s + (o.pnl || 0), 0)
  const totalWins = outcomes.filter(o => o.result === 'win').length
  const totalLosses = outcomes.filter(o => o.result === 'loss').length
  const totalMissed = outcomes.filter(o => o.result === 'missed').length
  const winRate = (totalWins + totalLosses) > 0
    ? ((totalWins / (totalWins + totalLosses)) * 100).toFixed(1)
    : '—'

  return (
    <div style={{ background: C.black, minHeight: '100vh', fontFamily: sans, color: C.text }}>
      <Nav />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.gold, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.7 }}>// overview</div>
            <h1 style={{ fontFamily: syne, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Dashboard</h1>
          </div>
          <Link href="/trades/new" style={{ ...btnPrimary, textDecoration: 'none', display: 'inline-block' }}>
            + New Trade
          </Link>
        </div>

        {/* Global stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
          <StatCard label="Total P&L" value={fmtCurrency(totalPnl)} color={totalPnl >= 0 ? C.success : C.danger} sub="across all accounts" />
          <StatCard label="Win Rate" value={winRate === '—' ? '—' : winRate + '%'} color={C.gold} sub={`${totalWins}W · ${totalLosses}L`} />
          <StatCard label="Active Accounts" value={accounts.length} color={C.text} sub="tracked accounts" />
          <StatCard label="Total Trades" value={recentTrades.length} color={C.text} sub={`${totalMissed} missed entries`} />
        </div>

        {/* Accounts overview */}
        <SectionTitle>Accounts</SectionTitle>
        {loading ? (
          <div style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>Loading...</div>
        ) : accounts.length === 0 ? (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: '40px', textAlign: 'center' }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.muted, marginBottom: 16 }}>No accounts yet</div>
            <Link href="/accounts" style={{ ...btnPrimary, textDecoration: 'none', display: 'inline-block' }}>Add Account</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12, marginBottom: 32 }}>
            {accounts.map(acc => {
              const accQuads = quadrants.filter(q => q.account_id === acc.id)
              const currentBalance = accQuads.reduce((s, q) => s + parseFloat(q.current_balance || 0), 0)
              const accPnl = currentBalance - acc.total_size
              const drawdownPct = acc.total_size > 0 ? (currentBalance - acc.total_size) / acc.total_size : 0

              return (
                <Link key={acc.id} href={`/accounts/${acc.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 4, padding: '22px', cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}>
                    {(() => {
                      const splitsCount = acc.splits || (accQuads.length === 3 ? 3 : 4)
                      const quadLabels = splitsCount === 3 ? ['Q1', 'Q2', 'Q3'] : ['Q1', 'Q2', 'Q3', 'Q4']
                      return (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                            <div>
                              <div style={{ fontFamily: syne, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{acc.name}</div>
                              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                <Badge type={acc.type === 'single' ? 'gold' : 'default'}>
                                  {acc.type === 'single' ? 'Single Account' : 'Multi Account'}
                                </Badge>
                                <Badge type={splitsCount === 3 ? 'gold' : 'default'}>
                                  {splitsCount === 3 ? '⚡ Q3 Mode' : 'Q4 Mode'}
                                </Badge>
                                {acc.broker && <span style={{ fontFamily: mono, fontSize: 10, color: C.muted }}>{acc.broker}</span>}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: syne, fontSize: 20, fontWeight: 700, color: accPnl >= 0 ? C.success : C.danger }}>
                                {fmtCurrency(currentBalance)}
                              </div>
                              <div style={{ fontFamily: mono, fontSize: 10, color: drawdownPct >= 0 ? C.success : C.danger }}>
                                {drawdownPct >= 0 ? '+' : ''}{(drawdownPct * 100).toFixed(2)}%
                              </div>
                            </div>
                          </div>

                          {/* Quadrant / Tri-zone states */}
                          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${splitsCount}, 1fr)`, gap: 6 }}>
                            {quadLabels.map((ql, i) => {
                              const q = accQuads.find(x => x.label === ql)
                              const colors = ['#c9a84c', '#b48c3c', '#8c6428', '#5a3c14']
                              return (
                                <div key={ql} style={{ background: C.surface2, borderRadius: 3, padding: '8px 10px' }}>
                                  <div style={{ fontFamily: mono, fontSize: 9, color: colors[i], marginBottom: 4 }}>{ql}</div>
                                  <div style={{ fontFamily: mono, fontSize: 10, color: q?.risk_state === 'green' ? C.success : C.warn }}>
                                    {q?.risk_state === 'green' ? '● 1%' : '● 0.5%'}
                                  </div>
                                  <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, marginTop: 2 }}>
                                    {q ? fmtCurrency(q.current_balance) : '—'}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Recent trades */}
        {recentTrades.length > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <SectionTitle>Recent Trades</SectionTitle>
              <Link href="/trades" style={{ fontFamily: mono, fontSize: 10, color: C.muted, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>View all →</Link>
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 80px 100px 100px 100px 80px 1fr', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                {['Pair', 'Dir', 'Entry', 'SL', 'TP', 'Status', 'Account'].map(h => (
                  <div key={h} style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
                ))}
              </div>
              {recentTrades.map(t => {
                const acc = accounts.find(a => a.id === t.account_id)
                const dec = 3
                return (
                  <Link key={t.id} href={`/trades/${t.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 80px 100px 100px 100px 80px 1fr', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${C.border}`, alignItems: 'center', cursor: 'pointer' }}>
                      <div style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{t.pair || '—'}</div>
                      <Badge type={t.direction === 'long' ? 'green' : 'danger'}>{t.direction}</Badge>
                      <div style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{parseFloat(t.entry).toFixed(dec)}</div>
                      <div style={{ fontFamily: mono, fontSize: 12, color: C.danger }}>{parseFloat(t.sl).toFixed(dec)}</div>
                      <div style={{ fontFamily: mono, fontSize: 12, color: C.success }}>{parseFloat(t.tp).toFixed(dec)}</div>
                      <Badge type={t.status === 'open' ? 'gold' : 'default'}>{t.status}</Badge>
                      <div style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>{acc?.name || '—'}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}

        {/* Signal Splitter & Q3 Calculator */}
        <div style={{ marginTop: 40, borderTop: `1px solid ${C.border}`, paddingTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <SectionTitle>Signal Splitter & Q3 Calculator</SectionTitle>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              ⚡ Q3 (3-Split) & Q4 Mode
            </span>
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6 }}>
            <QuadrantCalculator />
          </div>
        </div>
      </div>
    </div>
  )
}
