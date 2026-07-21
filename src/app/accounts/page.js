'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import { Badge, SectionTitle, EmptyState } from '../components/UI'
import { C, mono, syne, sans, btnPrimary, btnGhost, inputStyle, selectStyle } from '../lib/theme'
import { fmtCurrency } from '../lib/quadrant'
import Link from 'next/link'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([])
  const [quadrants, setQuadrants] = useState([])
  const [outcomes, setOutcomes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '', type: 'single', splits: 4, total_size: '', broker: '', currency: 'USD'
  })

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const [{ data: accs }, { data: quads }, { data: outs }] = await Promise.all([
      supabase.from('accounts').select('*').order('created_at', { ascending: false }),
      supabase.from('quadrants').select('*'),
      supabase.from('trade_outcomes').select('*'),
    ])
    setAccounts(accs || [])
    setQuadrants(quads || [])
    setOutcomes(outs || [])
    setLoading(false)
  }

  async function createAccount() {
    if (!form.name || !form.total_size) return
    setSaving(true)
    const splitsCount = parseInt(form.splits) || 4
    const size = parseFloat(form.total_size)
    const virtualSize = form.type === 'single' ? size / splitsCount : size

    const { data: acc, error } = await supabase.from('accounts').insert({
      name: form.name,
      type: form.type,
      splits: splitsCount,
      total_size: size,
      broker: form.broker,
      currency: form.currency,
    }).select().single()

    if (acc) {
      // Create sub-zones/quadrants
      const labels = splitsCount === 3 ? ['Q1', 'Q2', 'Q3'] : ['Q1', 'Q2', 'Q3', 'Q4']
      const quadsToInsert = labels.map(label => ({
        account_id: acc.id,
        label,
        starting_balance: virtualSize,
        current_balance: virtualSize,
        risk_state: 'green',
        wins: 0, losses: 0, missed: 0,
      }))
      await supabase.from('quadrants').insert(quadsToInsert)
      setShowForm(false)
      setForm({ name: '', type: 'single', splits: 4, total_size: '', broker: '', currency: 'USD' })
      await load()
    }
    setSaving(false)
  }

  return (
    <div style={{ background: C.black, minHeight: '100vh', fontFamily: sans, color: C.text }}>
      <Nav />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.gold, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.7 }}>// accounts</div>
            <h1 style={{ fontFamily: syne, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Accounts</h1>
          </div>
          <button onClick={() => setShowForm(v => !v)} style={showForm ? btnGhost : btnPrimary}>
            {showForm ? 'Cancel' : '+ Add Account'}
          </button>
        </div>

        {/* ADD ACCOUNT FORM */}
        {showForm && (
          <div style={{ background: C.surface, border: `1px solid ${C.goldBorder}`, borderRadius: 4, padding: 24, marginBottom: 28 }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>// new account</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Account Name</div>
                <input style={inputStyle} placeholder="e.g. FTMO 100k Main" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Broker (optional)</div>
                <input style={inputStyle} placeholder="e.g. FTMO, MyForexFunds" value={form.broker}
                  onChange={e => setForm(f => ({ ...f, broker: e.target.value }))} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Account Structure</div>
                <select style={selectStyle} value={form.splits}
                  onChange={e => setForm(f => ({ ...f, splits: parseInt(e.target.value) }))}>
                  <option value={4}>Q4 — 4 Quadrants (Divided by 4)</option>
                  <option value={3}>⚡ Q3 — 3 Tri-Zones (Divided by 3)</option>
                </select>
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Account Type</div>
                <select style={selectStyle} value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="single">Single Account ({form.splits === 3 ? '3 virtual zones' : '4 virtual quadrants'})</option>
                  <option value="multi">Multi Account ({form.splits === 3 ? '3 real accounts' : '4 real accounts'})</option>
                </select>
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
                  {form.type === 'single' ? 'Total Account Size' : 'Size Per Account'}
                </div>
                <input style={inputStyle} type="number" placeholder="100000" value={form.total_size}
                  onChange={e => setForm(f => ({ ...f, total_size: e.target.value }))} />
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Currency</div>
                <select style={selectStyle} value={form.currency}
                  onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}>
                  <option>USD</option><option>EUR</option><option>GBP</option>
                </select>
              </div>
            </div>

            {form.type === 'single' && form.total_size && (
              <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 3, padding: '10px 14px', marginBottom: 16, fontFamily: mono, fontSize: 11, color: C.secondary }}>
                Each virtual {form.splits === 3 ? 'tri-zone' : 'quadrant'} = {fmtCurrency(parseFloat(form.total_size) / form.splits)} · 1% risk = {fmtCurrency(parseFloat(form.total_size) / form.splits * 0.01)} per trade
              </div>
            )}

            <button onClick={createAccount} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        )}

        {/* ACCOUNTS LIST */}
        {loading ? (
          <div style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>Loading...</div>
        ) : accounts.length === 0 ? (
          <EmptyState message="No accounts yet — add one above" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {accounts.map(acc => {
              const accQuads = quadrants.filter(q => q.account_id === acc.id)
              const accOutcomes = outcomes.filter(o => accQuads.some(q => q.id === o.quadrant_id))
              const accPnl = accOutcomes.reduce((s, o) => s + (o.pnl || 0), 0)
              const currentBalance = acc.total_size + accPnl
              const pct = ((currentBalance - acc.total_size) / acc.total_size * 100)
              const splitsCount = acc.splits || (accQuads.length === 3 ? 3 : 4)
              const quadLabels = splitsCount === 3 ? ['Q1', 'Q2', 'Q3'] : ['Q1', 'Q2', 'Q3', 'Q4']
              const quadColors = ['#c9a84c', '#b48c3c', '#8c6428', '#5a3c14']

              return (
                <Link key={acc.id} href={`/accounts/${acc.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: '22px 24px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <div style={{ fontFamily: syne, fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 6 }}>{acc.name}</div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Badge type={acc.type === 'single' ? 'gold' : 'default'}>
                            {acc.type === 'single' ? 'Single' : 'Multi'}
                          </Badge>
                          <Badge type={splitsCount === 3 ? 'gold' : 'default'}>
                            {splitsCount === 3 ? '⚡ Q3 Mode (3 Zones)' : 'Q4 Mode (4 Quads)'}
                          </Badge>
                          <span style={{ fontFamily: mono, fontSize: 10, color: C.muted }}>Starting: {fmtCurrency(acc.total_size)}</span>
                          {acc.broker && <span style={{ fontFamily: mono, fontSize: 10, color: C.muted }}>· {acc.broker}</span>}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: syne, fontSize: 22, fontWeight: 700, color: accPnl >= 0 ? C.success : C.danger, marginBottom: 2 }}>
                          {fmtCurrency(currentBalance)}
                        </div>
                        <div style={{ fontFamily: mono, fontSize: 11, color: accPnl >= 0 ? C.success : C.danger }}>
                          {pct >= 0 ? '+' : ''}{pct.toFixed(2)}% · {accPnl >= 0 ? '+' : ''}{fmtCurrency(accPnl)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${splitsCount}, 1fr)`, gap: 8 }}>
                      {quadLabels.map((ql, i) => {
                        const q = accQuads.find(x => x.label === ql)
                        return (
                          <div key={ql} style={{ background: C.surface2, borderRadius: 3, padding: '10px 12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontFamily: mono, fontSize: 10, color: quadColors[i] }}>{ql}</span>
                              <span style={{ fontFamily: mono, fontSize: 9, color: q?.risk_state === 'green' ? C.success : C.warn }}>
                                {q?.risk_state === 'green' ? '● 1%' : '● 0.5%'}
                              </span>
                            </div>
                            <div style={{ fontFamily: mono, fontSize: 12, color: C.text }}>{q ? fmtCurrency(q.current_balance) : '—'}</div>
                            <div style={{ fontFamily: mono, fontSize: 9, color: C.muted, marginTop: 3 }}>
                              {q ? `${q.wins}W · ${q.losses}L` : '—'}
                            </div>
                          </div>
                        )
                      })}
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
