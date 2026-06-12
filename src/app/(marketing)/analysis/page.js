export const metadata = {
  title: 'The Quadrant — Win Rate Analysis',
  description: 'Mathematical analysis of win rates and expected values when targeting a 5R take profit through The Quadrant copytrade splitter.',
}

export default function AnalysisPage() {
  const tableData = [
    { label: "Q1", entry: "100.0", sl: "97.5", tp: "150.0", risk: "2.5", reward: "50.0", rr: "1:20" },
    { label: "Q2", entry: "97.5", sl: "95.0", tp: "150.0", risk: "2.5", reward: "52.5", rr: "1:21" },
    { label: "Q3", entry: "95.0", sl: "92.5", tp: "150.0", risk: "2.5", reward: "55.0", rr: "1:22" },
    { label: "Q4", entry: "92.5", sl: "90.0", tp: "150.0", risk: "2.5", reward: "57.5", rr: "1:23" }
  ]

  const originalTrader = {
    title: "Original Trader",
    subtitle: "1:10 · 60% win rate",
    rows: [
      { label: "Win rate", val: "60%", color: "#2e7d52" },
      { label: "Loss rate", val: "40%", color: "#c0392b" },
      { label: "R:R", val: "1:10", color: "#f5f3ee" },
      { label: "Wins contribute", val: "+6.0R", color: "#c9a84c" },
      { label: "Losses cost", val: "−0.4R", color: "#c0392b" },
      { label: "EV per trade", val: "+5.6R", color: "#c9a84c", bold: true }
    ]
  }

  const yourQ1 = {
    title: "Your Q1 at 5R TP",
    subtitle: "1:20 · ~75% win rate",
    rows: [
      { label: "Win rate", val: "~75%", color: "#2e7d52" },
      { label: "Loss rate", val: "~25%", color: "#c0392b" },
      { label: "R:R", val: "1:20", color: "#f5f3ee" },
      { label: "Wins contribute", val: "+15.0R", color: "#c9a84c" },
      { label: "Losses cost", val: "−0.25R", color: "#c0392b" },
      { label: "EV per trade", val: "+14.75R", color: "#c9a84c", bold: true }
    ]
  }

  const quadrantRates = [
    { label: "Q1 win rate", val: "~75%", percent: 75, color: "#c9a84c" },
    { label: "Q2 win rate", val: "~78%", percent: 78, color: "#b48c3c" },
    { label: "Q3 win rate", val: "~80%", percent: 80, color: "#8c6428" },
    { label: "Q4 win rate", val: "~82%", percent: 82, color: "#5a3c14" }
  ]

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* BACKGROUND DECORATIVE GLOW */}
      <div className="animate-pulse-glow" style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}></div>

      {/* HERO */}
      <section style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: '64px 24px 40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
          // Scenario Analysis
        </div>
        <h1 style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: 24,
          color: '#f5f3ee',
        }}>
          What happens to your<br/>
          <span style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #f0d48a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>win rate</span> at 5R TP?
        </h1>
        <p style={{
          fontSize: 16,
          color: '#8a8680',
          fontWeight: 300,
          maxWidth: 600,
          lineHeight: 1.65,
        }}>
          Your signal source hits 1:10 at 60% win rate. You apply The Quadrant and cap TP at 5R of the original trade. Here is exactly what your numbers look like.
        </p>
      </section>

      {/* STAT STRIP */}
      <section style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          maxWidth: 860,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.07)',
        }}>
          {[
            { label: "Your TP Target", val: "5R", sub: "of original trade" },
            { label: "Estimated Win Rate", val: "70-80%", sub: "vs original 60%", color: "#2e7d52" },
            { label: "Q1 R:R After Split", val: "1:20", sub: "vs original 1:5" },
            { label: "BE Win Rate on Q1", val: "4.8%", sub: "you're at 70%+", color: "#f5f3ee" }
          ].map((stat, i) => (
            <div key={i} style={{ background: '#0a0a0a', padding: '24px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4a4844', marginBottom: 8 }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1,
                color: stat.color || '#c9a84c',
                marginBottom: 4,
              }}>
                {stat.val}
              </div>
              <div style={{ fontSize: 11, color: '#4a4844', fontWeight: 300 }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BODY */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>

        {/* SECTION 1 */}
        <section style={{ padding: '60px 0 0' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(201, 168, 76, 0.6)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            // 01
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20, color: '#f5f3ee' }}>
            Why your win rate <span>goes up</span>
          </h2>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 16, fontSize: 14, lineHeight: 1.75 }}>
            The original trader targets 10R and wins 60% of the time. That means 60% of trades travel the full distance from entry to 10R. The critical insight: <strong style={{ color: '#f5f3ee', fontWeight: 500 }}>every winning trade passes through 5R on its way to 10R.</strong>
          </p>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 16, fontSize: 14, lineHeight: 1.75 }}>
            So when you cut TP to 5R, you capture all of those 60% winners — plus you additionally capture trades that would have reversed between 5R and 10R, that the original trader counted as losses. Those trades reached 5R but didn't reach 10R. For you, they are wins.
          </p>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 28, fontSize: 14, lineHeight: 1.75 }}>
            Conservatively estimating that another <strong style={{ color: '#f5f3ee', fontWeight: 500 }}>10–20% of trades</strong> fall into that "reached 5R but not 10R" bucket, your win rate at 5R TP moves to roughly <strong style={{ color: '#2e7d52', fontWeight: 500 }}>70–80%</strong>.
          </p>

        {/* WIN RATE BAR CHART */}
        <div className="glass-panel" style={{ padding: 28, background: '#111', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: 28 }}>
          {[
            { label: "Original (10R TP)", val: "60%", width: 60, color: "#c9a84c" },
            { label: "Your TP (5R)", val: "~75%", width: 75, color: "#2e7d52" },
            { label: "Break-even Q1", val: "4.8%", width: 4.8, color: "#4a9eda" }
          ].map((bar, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 60px', alignItems: 'center', gap: 16, marginBottom: i < 2 ? 14 : 0 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#8a8680' }}>
                {bar.label}
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: 8, background: bar.color, width: `${bar.width}%`, borderRadius: 4 }}></div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, fontWeight: 500, color: bar.color, textAlign: 'right' }}>
                {bar.val}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '2px solid var(--gold)', background: 'rgba(201, 168, 76, 0.02)' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
            // Key Insight
          </div>
          <p style={{ color: '#8a8680', margin: 0, fontSize: 13, lineHeight: 1.6, fontWeight: 300 }}>
            You are not taking a worse version of the same trade. You are taking a <strong>higher probability trade at a lower TP</strong>, then using The Quadrant to restore and exceed the R:R you gave up by targeting 5R instead of 10R.
          </p>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.07)', margin: '48px 0' }} />

      {/* SECTION 2 */}
      <section>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(201, 168, 76, 0.6)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 02
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20, color: '#f5f3ee' }}>
          The Quadrant levels at <span>5R TP</span>
        </h2>
        <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 20, fontSize: 14 }}>
          Using concrete numbers. Entry = 100, full SL = 90, so SL distance = 10 pips. Original TP at 10R = 200. Your TP at 5R = 150. Zone size = 10 ÷ 4 = <strong style={{ color: '#f5f3ee' }}>2.5 pips per quadrant.</strong>
        </p>

        <div className="table-container glass-panel" style={{ border: '1px solid rgba(255, 255, 255, 0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {["Quadrant", "Entry", "Stop Loss", "Take Profit", "Risk", "Reward", "R:R"].map((th) => (
                  <th key={th} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '10px 14px', textAlign: 'left', fontWeight: 400 }}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: idx < tableData.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <td style={{ padding: '13px 14px', fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: idx === 0 ? '#c9a84c' : idx === 1 ? '#b48c3c' : idx === 2 ? '#8c6428' : '#5a3c14' }}>{row.label}</td>
                  <td style={{ padding: '13px 14px', color: '#f5f3ee', fontFamily: 'var(--font-mono), monospace' }}>{row.entry}</td>
                  <td style={{ padding: '13px 14px', color: '#c0392b', fontFamily: 'var(--font-mono), monospace' }}>{row.sl}</td>
                  <td style={{ padding: '13px 14px', color: '#2e7d52', fontFamily: 'var(--font-mono), monospace' }}>{row.tp}</td>
                  <td style={{ padding: '13px 14px', color: '#8a8680', fontFamily: 'var(--font-mono), monospace' }}>{row.risk}</td>
                  <td style={{ padding: '13px 14px', color: '#8a8680', fontFamily: 'var(--font-mono), monospace' }}>{row.reward}</td>
                  <td style={{ padding: '13px 14px', color: '#c9a84c', fontFamily: 'var(--font-mono), monospace', fontWeight: 600 }}>{row.rr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ color: '#8a8680', fontWeight: 300, marginTop: 20, fontSize: 14, lineHeight: 1.75 }}>
          Notice what happened. By capping at 5R instead of 10R, you didn't reduce your R:R — you <strong style={{ color: '#f5f3ee' }}>doubled it</strong>. The original trade was 1:10. Your Q1 is 1:20. The quadrant structure more than compensates for the lower TP target because zone size stays the same while the reward distance to your 5R TP is still enormous relative to that zone.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.07)', margin: '48px 0' }} />

      {/* SECTION 3 */}
      <section>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(201, 168, 76, 0.6)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 03
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20, color: '#f5f3ee' }}>
          Expected value <span>comparison</span>
        </h2>
        <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 20, fontSize: 14 }}>
          EV = (Win rate × Reward) − (Loss rate × Risk). Comparing the original trader's setup against your Q1 at 5R TP, using the same 1R unit risk.
        </p>

        {/* COMPARISON PANELS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 28,
        }}>
          {[originalTrader, yourQ1].map((panel, i) => (
            <div key={i} style={{ background: '#111', padding: 28 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>
                // {i === 0 ? "Original Setup" : "Quadrant Setup"}
              </div>
              <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 17, fontWeight: 700, color: '#f5f3ee', marginBottom: 16 }}>
                {panel.subtitle}
              </h3>
              {panel.rows.map((row, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '7px 0',
                  borderBottom: idx < panel.rows.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                  fontSize: 13,
                }}>
                  <span style={{ color: '#4a4844', fontWeight: 300 }}>{row.label}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 13,
                    fontWeight: row.bold ? 600 : 400,
                    color: row.color,
                  }}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 20, fontSize: 14 }}>
          Your Q1 alone produces <strong style={{ color: '#c9a84c' }}>2.6× the expected value</strong> of the original trader's setup — per trade, per unit of risk. Across all four quadrants, combined EV per signal is substantially higher still.
        </p>

        <div className="glass-panel" style={{ padding: 24, fontFamily: 'var(--font-mono), monospace', fontSize: 12, lineHeight: 1.8, color: '#8a8680', marginBottom: 28 }}>
          <span style={{ color: '#4a4844' }}>// Original trader EV</span><br/>
          (0.60 × 10R) − (0.40 × 1R) = 6.0 − 0.4 = <span style={{ color: '#2e7d52', fontWeight: 500 }}>+5.6R</span><br/><br/>
          <span style={{ color: '#4a4844' }}>// Your Q1 EV at 5R TP (conservative 75% win rate)</span><br/>
          (0.75 × 20R) − (0.25 × 1R) = 15.0 − 0.25 = <span style={{ color: '#2e7d52', fontWeight: 500 }}>+14.75R</span><br/><br/>
          <span style={{ color: '#4a4844' }}>// Even at a pessimistic 30% win rate on Q1</span><br/>
          (0.30 × 20R) − (0.70 × 1R) = 6.0 − 0.7 = <span style={{ color: '#2e7d52' }}>+5.3R</span> &nbsp;<span style={{ color: '#4a4844' }}>// still near-matching original</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '2px solid var(--gold)', background: 'rgba(201, 168, 76, 0.02)' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
            // The Buffer
          </div>
          <p style={{ color: '#8a8680', margin: 0, fontSize: 13, lineHeight: 1.6, fontWeight: 300 }}>
            At 1:20 R:R, Q1 breaks even at a win rate of <strong>4.8%</strong>. You are operating at ~75% — a <strong>15× buffer above break-even</strong>. The original trader at 1:10 needs 9.1% win rate to break even. Your system is structurally more resilient.
          </p>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.07)', margin: '48px 0' }} />

      {/* SECTION 4 */}
      <section>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(201, 168, 76, 0.6)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 04
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20, color: '#f5f3ee' }}>
          Win rate per quadrant — <span>what changes</span>
        </h2>
        <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 16, fontSize: 14, lineHeight: 1.75 }}>
          Q1 fills immediately at the original entry. Its win rate is your full ~75%. But Q2, Q3, and Q4 only fill if price dips into their zone first — meaning they fill on deeper pullbacks. Two things happen when a quadrant fills deeper:
        </p>
        <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 24, fontSize: 14, lineHeight: 1.75 }}>
          <strong>1. Fewer fills:</strong> Some trades go straight from Q1 to TP. Deeper quadrants fill less often — but when they do, the entry is structurally better.<br/>
          <strong>2. Higher win rate when filled:</strong> A trade that sweeps to Q3 before reversing strongly toward TP exhibits deeper accumulation, following through to the target more reliably.
        </p>

        {/* QUADRANT RATES BARS */}
        <div className="glass-panel" style={{ padding: 28, background: '#111', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: 16 }}>
          {quadrantRates.map((qRate, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', alignItems: 'center', gap: 16, marginBottom: i < 3 ? 14 : 0 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#8a8680' }}>
                {qRate.label}
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: 8, background: qRate.color, width: `${qRate.percent}%`, borderRadius: 4 }}></div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, fontWeight: 500, color: qRate.color, textAlign: 'right' }}>
                {qRate.val}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: '#4a4844', margin: 0, fontStyle: 'italic', fontWeight: 300 }}>
          Note: deeper quadrant win rates are estimates based on price behavior principles. Track your own data to calibrate over time.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.07)', margin: '48px 0' }} />

      {/* SECTION 5 */}
      <section>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'rgba(201, 168, 76, 0.6)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          // 05
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20, color: '#f5f3ee' }}>
          The worst case <span>scenario</span>
        </h2>
        <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 20, fontSize: 14 }}>
          All four quadrants fill and all four stop out. This is the full loss scenario — price sweeps through the entire SL zone without reversing. Total loss = 4R across four accounts.
        </p>
        <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 24, fontSize: 14 }}>
          At a 75% win rate, this full stop-out happens roughly 25% of trades on Q1. But even when this occurs, one Q1 win returning 20R covers <strong style={{ color: '#f5f3ee' }}>five complete wipeouts</strong> with R to spare.
        </p>

        <div className="glass-panel" style={{ padding: 24, fontFamily: 'var(--font-mono), monospace', fontSize: 12, lineHeight: 1.8, color: '#8a8680' }}>
          <span style={{ color: '#4a4844' }}>// Worst case: all 4 accounts stopped out</span><br/>
          Total loss = <span style={{ color: '#c9a84c' }}>−4R</span><br/><br/>
          <span style={{ color: '#4a4844' }}>// One Q1 win covers</span><br/>
          20R ÷ 4R = <span style={{ color: '#2e7d52', fontWeight: 500 }}>5 full wipeouts</span><br/><br/>
          <span style={{ color: '#4a4844' }}>// Required win rate to break even across all 4 accounts</span><br/>
          1 ÷ (1 + 20) = <span style={{ color: '#2e7d52', fontWeight: 500 }}>4.8%</span> &nbsp;<span style={{ color: '#4a4844' }}>// you're at ~75%</span>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.07)', margin: '48px 0' }} />

      {/* VERDICT */}
      <section className="glass-panel" style={{
        background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, rgba(201,168,76,0.02) 100%)',
        border: '1px solid rgba(201, 168, 76, 0.25)',
        padding: '36px',
        borderRadius: 4,
      }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: 16 }}>
          // Bottom Line
        </div>
        <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 22, fontWeight: 700, color: '#f5f3ee', marginBottom: 14 }}>
          You've built a structurally superior system
        </h3>
        <p style={{ color: '#8a8680', fontSize: 14, lineHeight: 1.7, fontWeight: 300, marginBottom: 12 }}>
          The original trader needs a 60% win rate to make their 1:10 setup work. You need <strong>4.8% win rate</strong> to break even on Q1 alone — and you're sitting at roughly 75%. That gap between your actual win rate and your break-even rate is your <strong>margin of safety</strong>. It is enormous.
        </p>
        <p style={{ color: '#8a8680', fontSize: 14, lineHeight: 1.7, fontWeight: 300, marginBottom: 12 }}>
          Cutting TP to 5R doesn't weaken the trade. It raises your win rate, and The Quadrant structure converts that 5R target into 1:20 through 1:23 R:R across your four accounts. You've taken someone else's good system and built a mathematically superior version of it.
        </p>
        <p style={{ color: '#8a8680', fontSize: 14, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          <strong>The only variable you don't control is the signal quality.</strong> Everything else — the R:R amplification, the win rate improvement, the risk management — is structural and systematic. Vet your signal sources carefully. The system will handle the rest.
        </p>
      </section>

    </div>
  </div>
  )
}
