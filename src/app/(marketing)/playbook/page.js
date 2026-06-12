export const metadata = {
  title: 'The Quadrant — System Playbook',
  description: 'The mathematical logic, scenario guidelines, risk rules, and stack specifications of The Quadrant copytrade amplification system.',
}

export default function PlaybookPage() {
  const scenarios = [
    { behavior: "Goes straight to TP from entry", q1: "+41R", q2: "no fill", q3: "no fill", q4: "no fill" },
    { behavior: "Dips to Q2 zone, then to TP", q1: "−1R", q2: "+42R", q3: "no fill", q4: "no fill" },
    { behavior: "Dips to Q3 zone, then to TP", q1: "−1R", q2: "−1R", q3: "+43R", q4: "no fill" },
    { behavior: "Dips to Q4 zone, then to TP", q1: "−1R", q2: "−1R", q3: "−1R", q4: "+44R" },
    { behavior: "Blows through full SL", q1: "−1R", q2: "−1R", q3: "−1R", q4: "−1R" }
  ]

  const riskCells = [
    {
      title: "Green Mode",
      status: "At or above breakeven",
      color: "#2e7d52",
      desc: "Risk 1% of account per trade on each account. Operating at full capacity."
    },
    {
      title: "Recovery Mode",
      status: "In drawdown",
      color: "#c9a84c",
      desc: "Drop to 0.5% per trade per account. Conserve capital, recover safely."
    },
    {
      title: "Hard Floor",
      status: "10% drawdown limit",
      color: "#c0392b",
      desc: "Prop firm's hard max drawdown ceiling. Tiers prevent ever approaching this."
    },
    {
      title: "Account Structure",
      status: "4 independent accounts",
      color: "#378add",
      desc: "Isolated accounts. A bad run on Q1 does not contaminate the other quadrant balances."
    }
  ]

  const stackGrid = [
    { layer: "// Frontend", name: "React + Vite", desc: "Fast, component-based UI dashboard and analytics." },
    { layer: "// AI Vision", name: "Claude API", desc: "Claude's vision capability reads chart screenshots and extracts price levels." },
    { layer: "// Backend", name: "Node.js + Express", desc: "API layer for handling image uploads, AI analysis, and broker endpoints." },
    { layer: "// Database", name: "Supabase", desc: "Real-time state tracking of accounts, signals, and trades." },
    { layer: "// Broker Integration", name: "MT5 / cTrader API", desc: "Automates trade placement programmatically across multiple terminals." },
    { layer: "// Hosting", name: "Vercel + Railway", desc: "Serverless frontend on Vercel, persistent broker bridge on Railway." }
  ]

  const systemRules = [
    { title: "Never move a SL", desc: "Each quadrant's SL is mathematically precise. Moving it invalidates the risk-to-reward calculation and breaks the system logic." },
    { title: "Never skip a quadrant", desc: "The statistical edge relies on placing all four positions. Selectively skipping quadrants based on feeling removes the mathematical edge." },
    { title: "Missed entries are not losses", desc: "If price goes straight to TP without filling Q2, Q3, Q4, it is a win. Do not chase unfilled orders—a missed entry costs nothing." },
    { title: "Respect the risk tiers", desc: "1% in green mode, 0.5% in recovery. Never increase size chasing losses. Let the R:R ratios compound your balance over a sample." },
    { title: "Only copy traders with a verified edge", desc: "The Quadrant amplifies an existing edge—it does not create one from nothing. Vet your signal sources before executing." }
  ]

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', padding: '60px 24px' }} className="animate-fade-in">
      
      {/* SECTION 1: THE CONCEPT */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 01
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 36, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#f5f3ee' }}>
          What is <span>The Quadrant</span>
        </h2>
        <p style={{ color: '#8a8680', marginBottom: 20, fontWeight: 300, fontSize: 15, lineHeight: 1.75 }}>
          The Quadrant is a copytrade amplification system. It takes a signal from a trusted trader — their entry, stop loss, and take profit — and rather than copying it as-is, it restructures the trade into four independent entries spread across four separate accounts.
        </p>
        <p style={{ color: '#8a8680', marginBottom: 24, fontWeight: 300, fontSize: 15, lineHeight: 1.75 }}>
          The core idea is this: <strong style={{ color: '#f5f3ee', fontWeight: 500 }}>the SL region of any trade is not a wall, it's a zone.</strong> That zone has depth. Price doesn't always hit SL directly — it often probes, dips, and reverses. The Quadrant exploits that depth by placing staggered limit entries at each quarter of the SL zone, turning one signal into up to four positions with dramatically improved risk-to-reward ratios.
        </p>

        <div className="glass-panel" style={{ padding: '24px 28px', borderLeft: '2px solid var(--gold)', background: 'rgba(201, 168, 76, 0.02)' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
            // Core insight
          </div>
          <p style={{ color: '#8a8680', margin: 0, fontSize: 14, fontWeight: 300, lineHeight: 1.6 }}>
            A trader with a 1:2 setup and a 60% win rate is profitable. The same signal, restructured through The Quadrant, gives you 1:8, 1:9, 1:10, and 1:11 across four accounts. You can be profitable at a win rate a fraction of theirs.
          </p>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '48px 0' }} />

      {/* SECTION 2: THE LOGIC */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 02
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 36, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#f5f3ee' }}>
          The <span>Logic</span>
        </h2>
        <p style={{ color: '#8a8680', marginBottom: 20, fontWeight: 300, fontSize: 15 }}>
          Given any signal, three values are extracted: <strong style={{ color: '#f5f3ee' }}>Entry (E)</strong>, <strong style={{ color: '#f5f3ee' }}>Stop Loss (SL)</strong>, and <strong style={{ color: '#f5f3ee' }}>Take Profit (TP)</strong>. The distance from entry to stop loss is divided into four equal zones.
        </p>

        <div className="glass-panel" style={{ padding: 24, fontFamily: 'var(--font-mono), monospace', fontSize: 13, lineHeight: 1.8, color: '#8a8680', marginBottom: 24 }}>
          <span style={{ color: 'var(--gold)' }}>zone_size</span> = (Entry − SL) ÷ 4<br/><br/>
          <span style={{ color: 'var(--gold)' }}>Q1_entry</span> = Entry &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844', fontSize: 11 }}>// original signal entry</span><br/>
          <span style={{ color: 'var(--gold)' }}>Q1_sl</span> &nbsp;&nbsp;&nbsp;= Entry − zone_size<br/><br/>
          <span style={{ color: 'var(--gold)' }}>Q2_entry</span> = Q1_sl &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844', fontSize: 11 }}>// Q2 enters where Q1 stops out</span><br/>
          <span style={{ color: 'var(--gold)' }}>Q2_sl</span> &nbsp;&nbsp;&nbsp;= Q2_entry − zone_size<br/><br/>
          <span style={{ color: 'var(--gold)' }}>Q3_entry</span> = Q2_sl<br/>
          <span style={{ color: 'var(--gold)' }}>Q3_sl</span> &nbsp;&nbsp;&nbsp;= Q3_entry − zone_size<br/><br/>
          <span style={{ color: 'var(--gold)' }}>Q4_entry</span> = Q3_sl<br/>
          <span style={{ color: 'var(--gold)' }}>Q4_sl</span> &nbsp;&nbsp;&nbsp;= Original SL &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844', fontSize: 11 }}>// Q4 holds the ultimate stop</span><br/><br/>
          <span style={{ color: '#4a4844', fontSize: 11 }}>// All quadrants target the same target profit</span><br/>
          <span style={{ color: 'var(--gold)' }}>Q1_tp = Q2_tp = Q3_tp = Q4_tp</span> = TP
        </div>

        <p style={{ color: '#8a8680', fontWeight: 300, fontSize: 15 }}>
          Because every quadrant shares the same zone size as its risk, but each successive quadrant is closer to the TP, the reward distance grows while risk remains constant. This is why R:R ratios improve with each deeper quadrant.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '48px 0' }} />

      {/* SECTION 3: SCENARIO MATRIX */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 03
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 36, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#f5f3ee' }}>
          Scenario <span>Matrix</span>
        </h2>
        <p style={{ color: '#8a8680', marginBottom: 24, fontWeight: 300, fontSize: 15 }}>
          Price movements dictate which quadrants fill and result in profit/loss. The matrix outlines all five possible outcomes based on pullback depths:
        </p>

        <div className="table-container glass-panel">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }}>
                <th style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '14px 16px', textAlign: 'left', fontWeight: 400 }}>Price Behaviour</th>
                <th style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '14px 16px', textAlign: 'center', fontWeight: 400 }}>Q1</th>
                <th style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '14px 16px', textAlign: 'center', fontWeight: 400 }}>Q2</th>
                <th style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '14px 16px', textAlign: 'center', fontWeight: 400 }}>Q3</th>
                <th style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '14px 16px', textAlign: 'center', fontWeight: 400 }}>Q4</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: idx < scenarios.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>
                  <td style={{ padding: '16px 16px', color: '#f5f3ee', fontWeight: 400 }}>{row.behavior}</td>
                  {[row.q1, row.q2, row.q3, row.q4].map((qVal, qIdx) => {
                    let style = { padding: '16px 16px', textAlign: 'center', fontFamily: 'var(--font-mono), monospace' }
                    let className = ""
                    if (qVal.includes('+')) className = "win"
                    else if (qVal.includes('−')) className = "loss"
                    else className = "missed"
                    
                    return (
                      <td key={qIdx} style={style} className={className}>
                        {qVal}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ color: '#8a8680', fontWeight: 300, fontSize: 15 }}>
          In the worst-case scenario — a full stop out on all four accounts — you lose 4R. However, in any winning scenario, a single filled account compensates many times over due to the skewed R:R.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '48px 0' }} />

      {/* SECTION 4: RISK MANAGEMENT */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 04
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 36, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#f5f3ee' }}>
          Risk <span>Management</span>
        </h2>
        <p style={{ color: '#8a8680', marginBottom: 24, fontWeight: 300, fontSize: 15 }}>
          Designed primarily for prop firm structures with a 10% maximum drawdown limit. The risk sizing layers safeguard your capital under all conditions:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          {riskCells.map((cell, idx) => (
            <div key={idx} style={{ background: '#111', padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                {cell.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cell.color }}></div>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#f5f3ee' }}>{cell.status}</span>
              </div>
              <p style={{ fontSize: 13, color: '#8a8680', lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
                {cell.desc}
              </p>
            </div>
          ))}
        </div>

        <p style={{ color: '#8a8680', fontWeight: 300, fontSize: 15 }}>
          With four isolated accounts each risking 1% on a signal, the maximum combined exposure per signal is <strong style={{ color: '#f5f3ee' }}>4% across all accounts</strong>. The isolation functions as a risk stabilizer; losing streaks on Q1 do not contaminate Q2 or Q3.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '48px 0' }} />

      {/* SECTION 5: TECH SPECIFICATION */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 05
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 36, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#f5f3ee' }}>
          Tech <span>Specification</span>
        </h2>
        <p style={{ color: '#8a8680', marginBottom: 24, fontWeight: 300, fontSize: 15 }}>
          The underlying development stack designed to power the system from calculator tool through fully automated trade manager:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}>
          {stackGrid.map((tech, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#7a5e28', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                {tech.layer}
              </div>
              <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 16, fontWeight: 600, color: '#f5f3ee', marginBottom: 6 }}>
                {tech.name}
              </h3>
              <p style={{ fontSize: 12, color: '#8a8680', lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '48px 0' }} />

      {/* SECTION 6: SYSTEM RULES */}
      <section>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 06
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 36, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#f5f3ee' }}>
          Rules of <span>The System</span>
        </h2>
        <p style={{ color: '#8a8680', marginBottom: 32, fontWeight: 300, fontSize: 15 }}>
          These are the core operating principles. They must be followed strictly to preserve statistical validity:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {systemRules.map((rule, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, alignItems: 'start' }}>
              <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, fontWeight: 800, color: 'rgba(201, 168, 76, 0.25)', lineHeight: 1 }}>
                {idx + 1}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 18, fontWeight: 600, color: '#f5f3ee', marginBottom: 6 }}>
                  {rule.title}
                </h3>
                <p style={{ fontSize: 13, color: '#8a8680', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
