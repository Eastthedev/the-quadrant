'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import { Badge, SectionTitle, EmptyState } from '../components/UI'
import { C, mono, syne, sans, btnPrimary } from '../lib/theme'
import { fmtCurrency, fmt } from '../lib/quadrant'
import Link from 'next/link'

export default function TradesPage() {
  const [trades, setTrades] = useState([])
  const [accounts, setAccounts] = useState([])
  const [outcomes, setOutcomes] = useState([])
  const [filter, setFilter] = useState('all') // all | open | closed
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const [{ data: trs }, { data: accs }, { data: outs }] = await Promise.all([
      supabase.from('trades').select('*').order('created_at', { ascending: false }),
      supabase.from('accounts').select('*'),
      supabase.from('trade_outcomes').select('*'),
    ])
    setTrades(trs || [])
    setAccounts(accs || [])
    setOutcomes(outs || [])
    setLoading(false)
  }

  const filtered = trades.filter(t => filter === 'all' ? true : t.status === filter)
  const totalPnl = outcomes.reduce((s, o) => s + (o.pnl || 0), 0)
  const wins = outcomes.filter(o => o.result === 'win').length
  const losses = outcomes.filter(o => o.result === 'loss').length
  const missed = outcomes.filter(o => o.result === 'missed').length
  const winRate = (wins + losses) > 0 ? (wins / (wins + losses) * 100).toFixed(1) : '—'

  return (
    <div style={{ background: C.black, minHeight: '100vh', fontFamily: sans, color: C.text }}>
      <Nav />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.gold, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.7 }}>// journal</div>
            <h1 style={{ fontFamily: syne, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Trades</h1>
          </div>
          <Link href="/trades/new" style={{
            background: C.gold, color: C.black, textDecoration: 'none',
            borderRadius: 3, padding: '10px 20px', fontFamily: mono,
            fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>+ New Trade</Link>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 24 }}>
          {[
            { label: 'Total P&L', val: (totalPnl >= 0 ? '+' : '') + fmtCurrency(totalPnl), color: totalPnl >= 0 ? C.success : C.danger },
            { label: 'Win Rate', val: winRate === '—' ? '—' : winRate + '%', color: C.gold },
            { label: 'Wins', val: wins, color: C.success },
            { label: 'Losses', val: losses, color: C.danger },
            { label: 'Missed', val: missed, color: C.muted },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: '14px 16px' }}>
              <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: syne, fontSize: 20, fontWeight: 700, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: `1px solid ${C.border}` }}>
          {['all','open','closed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily: mono, fontSize: 11, padding: '8px 16px', border: 'none',
              background: 'transparent', textTransform: 'uppercase', letterSpacing: '0.08em',
              color: filter === f ? C.gold : C.muted,
              borderBottom: filter === f ? `2px solid ${C.gold}` : '2px solid transparent',
              cursor: 'pointer', marginBottom: -1,
            }}>{f}</button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <EmptyState message="No trades yet — log your first signal" />
        ) : (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '130px 70px 100px 100px 100px 90px 80px 1fr', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
              {['Pair','Dir','Entry','SL','TP','Status','P&L','Account'].map(h => (
                <div key={h} style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
              ))}
            </div>
            {filtered.map(t => {
              const acc = accounts.find(a => a.id === t.account_id)
              const tOutcomes = outcomes.filter(o => o.trade_id === t.id)
              const tPnl = tOutcomes.reduce((s, o) => s + (o.pnl || 0), 0)
              const dec = 3
              return (
                <Link key={t.id} href={`/trades/${t.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '130px 70px 100px 100px 100px 90px 80px 1fr',
                    gap: 8, padding: '12px 16px', borderBottom: `1px solid ${C.border}`,
                    alignItems: 'center', cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{t.pair || '—'}</div>
                    <Badge type={t.direction === 'long' ? 'green' : 'danger'}>{t.direction}</Badge>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{parseFloat(t.entry).toFixed(dec)}</div>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.danger }}>{parseFloat(t.sl).toFixed(dec)}</div>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.success }}>{parseFloat(t.tp).toFixed(dec)}</div>
                    <Badge type={t.status === 'open' ? 'gold' : 'default'}>{t.status}</Badge>
                    <div style={{ fontFamily: mono, fontSize: 12, color: tPnl >= 0 ? C.success : C.danger }}>
                      {t.status === 'closed' ? (tPnl >= 0 ? '+' : '') + fmtCurrency(tPnl) : '—'}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>{acc?.name || '—'}</div>
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
