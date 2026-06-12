export const metadata = {
  title: 'The Quadrant — Minimum Thresholds & Break-Even Analysis',
  description: 'Learn the minimum R:R and win rates required for signal providers to stay profitable with The Quadrant, and identify the system break points.',
}

export default function ThresholdsPage() {
  const rrThresholds = [
    { label: "1:1", color: "#e05555", width: 10, q1rr: "1:4", be: "20%", badge: "avoid", badgeColor: "danger" },
    { label: "1:1.5", color: "#e0943a", width: 20, q1rr: "1:6", be: "14.3%", badge: "risky", badgeColor: "warn" },
    { label: "1:2", color: "#e0943a", width: 32, q1rr: "1:8", be: "11.1%", badge: "minimum", badgeColor: "warn" },
    { label: "1:3", color: "#c9a84c", width: 48, q1rr: "1:12", be: "7.7%", badge: "good", badgeColor: "green" },
    { label: "1:5", color: "#4caf7d", width: 65, q1rr: "1:20", be: "4.8%", badge: "strong", badgeColor: "green" },
    { label: "1:10", color: "#4caf7d", width: 90, q1rr: "1:41", be: "2.4%", badge: "elite", badgeColor: "green" }
  ]

  const winRateMatrix = [
    { prr: "1:1", pwr: "60%", qrr: "1:4", qbe: "20.0%", ev: "+2.2R", status: "marginal", badgeColor: "warn", rowClass: "rgba(224,85,85,0.05)" },
    { prr: "1:1", pwr: "40%", qrr: "1:4", qbe: "20.0%", ev: "+1.4R", status: "marginal", badgeColor: "warn", rowClass: "rgba(224,85,85,0.05)" },
    { prr: "1:1", pwr: "20%", qrr: "1:4", qbe: "20.0%", ev: "+0.0R", status: "break-even", badgeColor: "danger", rowClass: "rgba(224,85,85,0.05)" },
    { prr: "1:1", pwr: "15%", qrr: "1:4", qbe: "20.0%", ev: "−0.2R", status: "unprofitable", badgeColor: "danger", rowClass: "rgba(224,85,85,0.05)" },
    { divider: true },
    { prr: "1:2", pwr: "60%", qrr: "1:8", qbe: "11.1%", ev: "+4.7R", status: "profitable", badgeColor: "green", rowClass: "rgba(224,148,58,0.04)" },
    { prr: "1:2", pwr: "40%", qrr: "1:8", qbe: "11.1%", ev: "+2.6R", status: "profitable", badgeColor: "green", rowClass: "rgba(224,148,58,0.04)" },
    { prr: "1:2", pwr: "34%", qrr: "1:8", qbe: "11.1%", ev: "+2.0R", status: "profitable", badgeColor: "green", rowClass: "rgba(224,148,58,0.04)" },
    { prr: "1:2", pwr: "12%", qrr: "1:8", qbe: "11.1%", ev: "+0.1R", status: "barely", badgeColor: "warn", rowClass: "rgba(224,148,58,0.04)" },
    { prr: "1:2", pwr: "10%", qrr: "1:8", qbe: "11.1%", ev: "−0.1R", status: "unprofitable", badgeColor: "danger", rowClass: "rgba(224,148,58,0.04)" },
    { divider: true },
    { prr: "1:3", pwr: "60%", qrr: "1:12", qbe: "7.7%", ev: "+7.1R", status: "strong", badgeColor: "green", rowClass: "rgba(76,175,125,0.03)" },
    { prr: "1:3", pwr: "40%", qrr: "1:12", qbe: "7.7%", ev: "+4.2R", status: "strong", badgeColor: "green", rowClass: "rgba(76,175,125,0.03)" },
    { prr: "1:3", pwr: "20%", qrr: "1:12", qbe: "7.7%", ev: "+1.6R", status: "profitable", badgeColor: "green", rowClass: "rgba(76,175,125,0.03)" },
    { prr: "1:3", pwr: "8%", qrr: "1:12", qbe: "7.7%", ev: "+0.0R", status: "break-even", badgeColor: "danger", rowClass: "rgba(76,175,125,0.03)" },
    { prr: "1:3", pwr: "5%", qrr: "1:12", qbe: "7.7%", ev: "−0.3R", status: "unprofitable", badgeColor: "danger", rowClass: "rgba(76,175,125,0.03)" },
    { divider: true },
    { prr: "1:5", pwr: "60%", qrr: "1:20", qbe: "4.8%", ev: "+11.8R", status: "elite", badgeColor: "green", rowClass: "rgba(76,175,125,0.03)" },
    { prr: "1:5", pwr: "30%", qrr: "1:20", qbe: "4.8%", ev: "+5.3R", status: "strong", badgeColor: "green", rowClass: "rgba(76,175,125,0.03)" },
    { prr: "1:5", pwr: "10%", qrr: "1:20", qbe: "4.8%", ev: "+1.1R", status: "profitable", badgeColor: "green", rowClass: "rgba(76,175,125,0.03)" },
    { prr: "1:5", pwr: "5%", qrr: "1:20", qbe: "4.8%", ev: "+0.0R", status: "break-even", badgeColor: "danger", rowClass: "rgba(76,175,125,0.03)" },
    { prr: "1:5", pwr: "3%", qrr: "1:20", qbe: "4.8%", ev: "−0.4R", status: "unprofitable", badgeColor: "danger", rowClass: "rgba(76,175,125,0.03)" }
  ]

  const degradationStages = [
    {
      stage: "Stage 1 — Warning Zone",
      title: "Thin Margin",
      titleColor: "#e0943a",
      rows: [
        { label: "Provider R:R", val: "1:2 to 1:2.5", color: "#e0943a" },
        { label: "Provider Win Rate", val: "25–34%", color: "#e0943a" },
        { label: "Your Q1 R:R", val: "1:8 to 1:10" },
        { label: "Your BE Win Rate", val: "9–11%" },
        { label: "Verdict", val: "Profitable, barely", color: "#e0943a" }
      ]
    },
    {
      stage: "Stage 2 — Danger Zone",
      title: "Approaching BE",
      titleColor: "#e05555",
      rows: [
        { label: "Provider R:R", val: "1:1 to 1:1.5", color: "#e05555" },
        { label: "Provider Win Rate", val: "20–33%", color: "#e05555" },
        { label: "Your Q1 R:R", val: "1:4 to 1:6" },
        { label: "Your BE Win Rate", val: "14–20%" },
        { label: "Verdict", val: "Marginal, avoid", color: "#e05555" }
      ]
    },
    {
      stage: "Stage 3 — System Breaks",
      title: "Unprofitable",
      titleColor: "#e05555",
      rows: [
        { label: "Provider R:R", val: "< 1:1", color: "#e05555" },
        { label: "Provider Win Rate", val: "< 10% at 1:2 RR", color: "#e05555" },
        { label: "Your Q1 R:R", val: "< 1:4", color: "#e05555" },
        { label: "Your BE Win Rate", val: "> 20%", color: "#e05555" },
        { label: "Verdict", val: "System fails", color: "#e05555" }
      ]
    },
    {
      stage: "Stage 4 — Terminal",
      title: "Negative Edge",
      titleColor: "#8a8278",
      rows: [
        { label: "Provider R:R", val: "Any", color: "#8a8278" },
        { label: "Provider Win Rate", val: "0–5% consistently", color: "#8a8278" },
        { label: "Your Q1 R:R", val: "Irrelevant" },
        { label: "Your BE Win Rate", val: "Irrelevant" },
        { label: "Verdict", val: "Wrong source, stop", color: "#8a8278" }
      ]
    }
  ]

  const marketingLines = [
    {
      dotColor: "#4caf7d",
      text: "Minimum R:R: 1:2. Any signal with a take profit at least 2× the stop loss distance qualifies for The Quadrant. This is the absolute floor. Below 1:2, the system operates with insufficient margin for error."
    },
    {
      dotColor: "#4caf7d",
      text: "Minimum win rate: 34% at 1:2 R:R. A provider giving 1:2 setups needs to win at least 34% of trades to be profitable themselves — and that's enough for The Quadrant to work comfortably, since your Q1 break-even is only 11.1%."
    },
    {
      dotColor: "#c9a84c",
      text: "Recommended: 1:3 R:R minimum with 40%+ win rate. This is the sweet spot. Your Q1 becomes 1:12 with a 7.7% break-even — giving you enormous margin above any realistic drawdown scenario."
    },
    {
      dotColor: "#4a9eda",
      text: "Ideal: 1:5+ R:R with any positive win rate above 10%. At this level the system is nearly bulletproof. Your Q1 is 1:20 with a 4.8% break-even. Even a period of poor performance from the provider barely dents profitability."
    },
    {
      dotColor: "#e05555",
      text: "Disqualifying: any provider with negative EV over 50+ trades. If a provider's own results are net negative over a meaningful sample, The Quadrant cannot save it. Verify provider track records before running the system on their signals."
    }
  ]

  const badgeStyle = (type) => {
    switch (type) {
      case 'green':
      case 'elite':
      case 'strong':
      case 'profitable':
        return { background: 'rgba(76,175,125,0.15)', color: '#4caf7d' }
      case 'warn':
      case 'risky':
      case 'minimum':
      case 'marginal':
      case 'barely':
        return { background: 'rgba(224,148,58,0.15)', color: '#e0943a' }
      case 'danger':
      case 'avoid':
      case 'unprofitable':
      case 'break-even':
      case 'system fails':
        return { background: 'rgba(224,85,85,0.15)', color: '#e05555' }
      default:
        return { background: 'rgba(90,86,80,0.2)', color: '#8a8278' }
    }
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative pulse background */}
      <div className="animate-pulse-glow" style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}></div>

      {/* HERO */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '64px 24px 48px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20, opacity: 0.7 }}>
          // Signal Provider Qualification
        </div>
        <h1 style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(30px, 5vw, 56px)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginBottom: 22,
          color: '#f5f3ee',
        }}>
          At what point does<br/>
          the system <span style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #f0d48a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>break?</span>
        </h1>
        <p style={{
          fontSize: 15,
          color: '#8a8680',
          fontWeight: 300,
          maxWidth: 600,
          lineHeight: 1.7,
        }}>
          The Quadrant amplifies any edge it's given. But edge can't be manufactured from nothing. This document defines the minimum R:R and win rate a signal provider must have for The Quadrant to stay profitable — and the exact point where it stops working.
        </p>
      </section>

      {/* STAT STRIP */}
      <section style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.07)',
        }}>
          {[
            { label: "Minimum R:R to Qualify", val: "1:2", sub: "absolute floor for any signal", color: "#c9a84c" },
            { label: "Min Win Rate at 1:2", val: "34%", sub: "barely minimum, not recommended", color: "#e0943a" },
            { label: "Recommended Min Win Rate", val: "40%", sub: "comfortable operating margin", color: "#4caf7d" },
            { label: "System Breaks Below", val: "< 1:1", sub: "no R:R = no system", color: "#e05555" }
          ].map((stat, i) => (
            <div key={i} style={{ background: '#0a0a0a', padding: '26px 32px' }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4a4844', marginBottom: 8 }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1,
                color: stat.color,
                marginBottom: 5,
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
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>

        {/* SECTION 1: THE CORE MATH */}
        <section style={{ padding: '52px 0 0' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.5 }}>
            // 01
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18, color: '#f5f3ee' }}>
            The core <span>break-even formula</span>
          </h2>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            For any trading system to be profitable, expected value must be positive. The formula is simple: wins must outweigh losses over time. The Quadrant doesn't change this fundamental law — it amplifies it. Here is the base formula applied to Q1.
          </p>

          <div className="glass-panel" style={{
            borderLeft: '3px solid var(--gold)',
            borderRadius: '0 4px 4px 0',
            padding: '24px 28px',
            margin: '24px 0',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            lineHeight: 2.1,
            color: '#8a8680',
          }}>
            <span style={{ color: '#4a4844' }}>// Break-even win rate formula</span><br/>
            <span style={{ color: 'var(--gold)' }}>BE_winrate</span> = 1 ÷ (1 + R:R)<br/><br/>
            <span style={{ color: '#4a4844' }}>// Example: signal provider gives 1:2 R:R</span><br/>
            Q1 zone = SL ÷ 4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844' }}>// risk is now 25% of original</span><br/>
            Q1 reward = TP − Q1_entry &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844' }}>// same TP, closer entry = more reward</span><br/>
            Q1 R:R at original 1:2 = <span style={{ color: 'var(--gold)' }}>1:8</span> &nbsp;<span style={{ color: '#4a4844' }}>// 4× amplification on R:R</span><br/><br/>
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '8px 0' }}></div>
            BE_winrate on Q1 = 1 ÷ (1 + 8) = <span style={{ color: '#4caf7d', fontWeight: 600 }}>11.1%</span><br/><br/>
            <span style={{ color: '#4a4844' }}>// If provider wins more than 11.1% of trades → Q1 is profitable</span><br/>
            <span style={{ color: '#4a4844' }}>// A provider with 1:2 and 34% win rate gives you massive margin above 11.1%</span>
          </div>

          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            This is the structural power of The Quadrant. A signal provider only needs to be <strong>barely profitable themselves</strong> — and the system transforms their marginal edge into a substantial one on your end. Their break-even at 1:2 is 33.3%. Yours on Q1 is 11.1%.
          </p>

          <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '2px solid #4caf7d', background: 'rgba(76,175,125,0.02)', borderColor: 'rgba(76,175,125,0.3)' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4caf7d', marginBottom: 8 }}>
              // The Amplification Rule
            </div>
            <p style={{ color: '#8a8680', margin: 0, fontSize: 13, lineHeight: 1.6, fontWeight: 300 }}>
              Whatever break-even win rate the signal provider needs, <strong>The Quadrant cuts your required win rate to roughly one quarter of theirs</strong> — because your R:R is approximately 4× theirs on Q1. Their 33% becomes your 11%. Their 20% becomes your 5%.
            </p>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

        {/* SECTION 2: R:R THRESHOLDS */}
        <section>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.5 }}>
            // 02
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18, color: '#f5f3ee' }}>
            R:R thresholds — <span>what each level gives you</span>
          </h2>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            The signal provider's R:R is the foundation everything else sits on. Here is what each R:R level produces after The Quadrant splits it, and what win rate you need to stay profitable.
          </p>

          {/* ZONE VISUAL DIAGRAM */}
          <div className="glass-panel" style={{ border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', margin: '28px 0' }}>
            <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span>Provider R:R</span>
              <span>Your Q1 R:R · Your break-even win rate · Status</span>
            </div>
            {rrThresholds.map((row, idx) => (
              <div key={idx} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 80px 100px 100px',
                alignItems: 'center',
                padding: '14px 20px',
                borderBottom: idx < rrThresholds.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                gap: 12,
                background: row.badgeColor === 'danger' ? 'rgba(224,85,85,0.03)' : 'transparent',
              }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, fontWeight: 600, color: row.color }}>{row.label}</div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: 6, background: row.color, width: `${row.width}%`, borderRadius: 3 }}></div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: row.color, textAlign: 'right' }}>Q1: {row.q1rr}</div>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#4a4844', textAlign: 'right' }}>BE: {row.be}</div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge" style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 9,
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    ...badgeStyle(row.badgeColor)
                  }}>{row.badge}</span>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            The minimum viable R:R from a signal provider is <strong>1:2</strong>. Below that, the quadrant amplification still works mathematically, but the required win rate to stay profitable starts climbing uncomfortably — and there is not enough margin for error in the system.
          </p>

          <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '2px solid #e0943a', background: 'rgba(224,148,58,0.03)', borderColor: 'rgba(224,148,58,0.3)' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e0943a', marginBottom: 8 }}>
              // The 1:1.5 Warning Zone
            </div>
            <p style={{ color: '#8a8680', margin: 0, fontSize: 13, lineHeight: 1.6, fontWeight: 300 }}>
              A provider giving 1:1.5 R:R gives your Q1 a 1:6 R:R and a 14.3% break-even. That's still achievable — but <strong>only if their win rate is consistently above 20%</strong>, which is a very low bar. Don't build a system on 1:1.5 providers. The margin for error is too thin.
            </p>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

        {/* SECTION 3: WIN RATE THRESHOLDS */}
        <section>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.5 }}>
            // 03
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18, color: '#f5f3ee' }}>
            Win rate thresholds — <span>the full matrix</span>
          </h2>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            R:R and win rate work together. A low R:R can survive a high win rate. A high R:R can survive a very low win rate. The table below maps every combination and tells you exactly where The Quadrant stays profitable and where it breaks.
          </p>

          <div className="table-container glass-panel" style={{ border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {["Provider R:R", "Provider Win Rate", "Q1 R:R", "Q1 BE Win Rate", "Your EV per trade", "Status"].map((th) => (
                    <th key={th} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '10px 14px', textAlign: 'left', fontWeight: 400 }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {winRateMatrix.map((row, idx) => {
                  if (row.divider) {
                    return (
                      <tr key={idx}>
                        <td colSpan="6" style={{ padding: 0, height: 1, background: 'rgba(255,255,255,0.05)' }}></td>
                      </tr>
                    )
                  }

                  const isUnprofitable = row.status === 'unprofitable' || row.status === 'break-even'
                  
                  return (
                    <tr key={idx} style={{
                      background: row.rowClass,
                      borderBottom: idx < winRateMatrix.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                    }}>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono), monospace', color: isUnprofitable ? '#e05555' : '#f5f3ee' }}>{row.prr}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono), monospace', color: '#f5f3ee' }}>{row.pwr}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono), monospace', color: '#8a8680' }}>{row.qrr}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono), monospace', color: '#4a4844' }}>{row.qbe}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: isUnprofitable ? '#e05555' : '#c9a84c' }}>{row.ev}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span className="badge" style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: 9,
                          fontWeight: 600,
                          padding: '2px 7px',
                          borderRadius: 2,
                          textTransform: 'uppercase',
                          ...badgeStyle(row.badgeColor)
                        }}>{row.status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 11, color: '#4a4844', margin: '8px 0 0', fontStyle: 'italic', fontWeight: 300 }}>
            EV calculated as: (win rate × Q1 reward) − (loss rate × 1R). All figures are per-trade per account on Q1 only.
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

        {/* SECTION 4: THE BREAK POINT */}
        <section>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.5 }}>
            // 04
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18, color: '#f5f3ee' }}>
            Exactly where <span>it breaks</span>
          </h2>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 20, fontSize: 14 }}>
            The system doesn't break suddenly — it degrades. Here are the four stages of degradation and the exact thresholds that trigger each one.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            {degradationStages.map((stage, idx) => (
              <div key={idx} style={{ background: '#111', padding: '24px 26px' }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4a4844', marginBottom: 10 }}>
                  {stage.stage}
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 17, fontWeight: 700, color: stage.titleColor, marginBottom: 14 }}>
                  {stage.title}
                </h3>
                {stage.rows.map((row, rIdx) => (
                  <div key={rIdx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: rIdx < stage.rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    fontSize: 12,
                  }}>
                    <span style={{ color: '#4a4844', fontWeight: 300 }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', color: row.color || '#f5f3ee', fontWeight: row.color ? 600 : 400 }}>{row.val}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '2px solid #e05555', background: 'rgba(224,85,85,0.03)', borderColor: 'rgba(224,85,85,0.3)', marginTop: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e05555', marginBottom: 8 }}>
              // The Hard Break Point
            </div>
            <p style={{ color: '#8a8680', margin: 0, fontSize: 13, lineHeight: 1.6, fontWeight: 300 }}>
              The system becomes definitively unprofitable when the signal provider's win rate drops <strong>below their own break-even win rate</strong> — i.e. they themselves are losing money. The Quadrant cannot create edge from a losing source. A provider with negative EV passed through The Quadrant still produces negative EV.
            </p>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

        {/* SECTION 5: THE WIN RATE THAT KILLS IT */}
        <section>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.5 }}>
            // 05
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18, color: '#f5f3ee' }}>
            The win rate that <span>kills the system</span>
          </h2>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            For each R:R level a provider offers, here is the exact win rate at which The Quadrant becomes unprofitable on Q1. This is your disqualification line for any signal source.
          </p>

          <div className="glass-panel" style={{
            borderLeft: '3px solid var(--gold)',
            borderRadius: '0 4px 4px 0',
            padding: '24px 28px',
            margin: '24px 0',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            lineHeight: 2.1,
            color: '#8a8680',
          }}>
            <span style={{ color: '#4a4844' }}>// Unprofitable threshold per provider R:R</span><br/><br/>
            Provider <span style={{ color: 'var(--gold)' }}>1:1 R:R</span> &nbsp;&nbsp;→ Q1 is 1:4 &nbsp;&nbsp;→ unprofitable below <span style={{ color: '#e05555', fontWeight: 600 }}>20.0% win rate</span><br/>
            Provider <span style={{ color: 'var(--gold)' }}>1:2 R:R</span> &nbsp;&nbsp;→ Q1 is 1:8 &nbsp;&nbsp;→ unprofitable below <span style={{ color: '#e05555', fontWeight: 600 }}>11.1% win rate</span><br/>
            Provider <span style={{ color: 'var(--gold)' }}>1:3 R:R</span> &nbsp;&nbsp;→ Q1 is 1:12 →  unprofitable below <span style={{ color: '#e05555', fontWeight: 600 }}>7.7% win rate</span><br/>
            Provider <span style={{ color: 'var(--gold)' }}>1:5 R:R</span> &nbsp;&nbsp;→ Q1 is 1:20 →  unprofitable below <span style={{ color: '#e05555', fontWeight: 600 }}>4.8% win rate</span><br/>
            Provider <span style={{ color: 'var(--gold)' }}>1:10 R:R</span> &nbsp;→ Q1 is 1:41 →  unprofitable below <span style={{ color: '#e05555', fontWeight: 600 }}>2.4% win rate</span><br/><br/>
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '8px 0' }}></div>
            <span style={{ color: '#4a4844' }}>// The rule: as R:R goes up, the kill threshold drops fast</span><br/>
            <span style={{ color: '#4a4844' }}>// A 1:10 provider who wins 3% of trades still runs a profitable Q1</span><br/>
            <span style={{ color: '#4a4844' }}>// A 1:1 provider needs 21% to avoid losses — and most can't sustain that</span>
          </div>

          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            The practical implication: <strong>prioritise signal providers with high R:R over high win rate.</strong> A provider with 1:5 R:R and a 20% win rate is far more valuable to The Quadrant than a provider with 1:1.5 R:R and 55% win rate.
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

        {/* SECTION 6: WHAT TO TELL THE MARKET */}
        <section>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.5 }}>
            // 06
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18, color: '#f5f3ee' }}>
            What to tell the <span>market</span>
          </h2>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 20, fontSize: 14 }}>
            When positioning The Quadrant to other traders or potential users, these are the provider qualification thresholds you can state with confidence — backed by the mathematics above.
          </p>

          {/* MARKETING GORGEOUS BOX */}
          <div className="glass-panel" style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 100%)',
            border: '1px solid rgba(201, 168, 76, 0.25)',
            padding: '36px 40px',
            borderRadius: 4,
            margin: '36px 0',
          }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: 14 }}>
              // Qualification Criteria
            </div>
            <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 22, fontWeight: 700, color: '#f5f3ee', marginBottom: 16 }}>
              Signal provider minimum standards
            </h3>
            {marketingLines.map((line, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '14px 0',
                borderBottom: idx < marketingLines.length - 1 ? '1px solid rgba(255, 255, 255, 0.07)' : 'none',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: line.dotColor, flexShrink: 0, marginTop: 6 }}></div>
                <div style={{ fontSize: 13, color: '#8a8680', fontWeight: 300, lineHeight: 1.65 }}>
                  {line.text}
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '2px solid var(--gold)', background: 'rgba(201, 168, 76, 0.02)' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
              // The One-Line Pitch
            </div>
            <p style={{ color: '#8a8680', margin: 0, fontSize: 13, lineHeight: 1.6, fontWeight: 300 }}>
              The Quadrant turns a signal provider's 1:3 R:R into your 1:12 — meaning a signal source only needs to be right <strong>one in thirteen times</strong> for you to break even.
            </p>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

        {/* SECTION 7: MINIMUM VIABLE PROVIDER */}
        <section>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.5 }}>
            // 07
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18, color: '#f5f3ee' }}>
            The <span>minimum viable</span> signal provider
          </h2>
          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            To summarise everything above into a single provider profile — the absolute minimum a signal source must demonstrate before you run The Quadrant on their signals:
          </p>

          <div className="glass-panel" style={{
            borderLeft: '3px solid var(--gold)',
            borderRadius: '0 4px 4px 0',
            padding: '24px 28px',
            margin: '24px 0',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            lineHeight: 2.1,
            color: '#8a8680',
          }}>
            <span style={{ color: '#4a4844' }}>// Minimum Viable Provider (MVP) — The Quadrant qualification</span><br/><br/>
            <span style={{ color: 'var(--gold)' }}>R:R</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;≥ 1:2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844' }}>// hard minimum</span><br/>
            <span style={{ color: 'var(--gold)' }}>Win rate</span> &nbsp;&nbsp;&nbsp;≥ 34% (at 1:2 R:R) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844' }}>// scales down as R:R goes up</span><br/>
            <span style={{ color: 'var(--gold)' }}>Sample size</span> ≥ 50 trades &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844' }}>// don't judge on 10 trades</span><br/>
            <span style={{ color: 'var(--gold)' }}>EV</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt; 0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844' }}>// they must be profitable themselves</span><br/>
            <span style={{ color: 'var(--gold)' }}>Consistency</span> No single month &gt; −20% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4a4844' }}>// not just good on average</span><br/><br/>
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '8px 0' }}></div>
            <span style={{ color: '#4a4844' }}>// If provider clears all five → run The Quadrant</span><br/>
            <span style={{ color: '#4a4844' }}>// If provider fails any one → find a better source</span>
          </div>

          <p style={{ color: '#8a8680', fontWeight: 300, marginBottom: 14, fontSize: 14, lineHeight: 1.75 }}>
            The Quadrant is a multiplier. Give it a good source and it produces exceptional results. Give it a bad source and it multiplies the losses just as efficiently. <strong>The system is only as good as the signal it's given.</strong> Qualify your providers rigorously.
          </p>
        </section>

      </div>
    </div>
  )
}
