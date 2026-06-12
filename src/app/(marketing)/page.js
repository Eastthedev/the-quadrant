'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  // Pullback depth simulation states:
  // 0 = no pullback (only Q1 filled)
  // 1 = pullback to Q2 entry (Q1 & Q2 filled)
  // 2 = pullback to Q3 entry (Q1, Q2 & Q3 filled)
  // 3 = pullback to Q4 entry (all filled)
  // 4 = full stop out (all filled and hit SL)
  const [pullbackIndex, setPullbackIndex] = useState(1)

  const scenarioDetails = [
    {
      title: "Straight to TP (No Pullback)",
      desc: "Price goes straight to TP. Only Q1 is filled.",
      q1: "win", q2: "miss", q3: "miss", q4: "miss",
      q1rr: 10, q2rr: 0, q3rr: 0, q4rr: 0,
      totalReward: 10,
      totalLoss: 0,
      netResult: 10
    },
    {
      title: "Dip to Q2 Zone",
      desc: "Q1 hits its tighter SL, but Q2 is filled at a deeper price level and hits TP.",
      q1: "loss", q2: "win", q3: "miss", q4: "miss",
      q1rr: -1, q2rr: 11, q3rr: 0, q4rr: 0,
      totalReward: 11,
      totalLoss: 1,
      netResult: 10
    },
    {
      title: "Dip to Q3 Zone",
      desc: "Q1 and Q2 hit their tighter SLs. Q3 is filled at a deeper price level and hits TP.",
      q1: "loss", q2: "loss", q3: "win", q4: "miss",
      q1rr: -1, q2rr: -1, q3rr: 12, q4rr: 0,
      totalReward: 12,
      totalLoss: 2,
      netResult: 10
    },
    {
      title: "Dip to Q4 Zone",
      desc: "Q1, Q2, and Q3 stop out. Q4 is filled at the absolute bottom of the SL zone and hits TP.",
      q1: "loss", q2: "loss", q3: "loss", q4: "win",
      q1rr: -1, q2rr: -1, q3rr: -1, q4rr: 13,
      totalReward: 13,
      totalLoss: 3,
      netResult: 10
    },
    {
      title: "Full Stop Out",
      desc: "Price blows through the entire SL zone. All four accounts stop out.",
      q1: "loss", q2: "loss", q3: "loss", q4: "loss",
      q1rr: -1, q2rr: -1, q3rr: -1, q4rr: -1,
      totalReward: 0,
      totalLoss: 4,
      netResult: -4
    }
  ]

  const currentScenario = scenarioDetails[pullbackIndex]

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decorative Radial Glows */}
      <div className="animate-pulse-glow" style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}></div>
      <div className="animate-pulse-glow" style={{
        position: 'absolute',
        bottom: '20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        animationDelay: '3s',
      }}></div>

      {/* HERO SECTION */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 24px 60px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 60 }} className="animate-fade-in">
          <div style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: '#c9a84c',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            // Copytrade Amplification System
          </div>
          <h1 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(44px, 7vw, 90px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: '#f5f3ee',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}>
            THE<br/>
            <span style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #f0d48a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>QUADRANT</span>
          </h1>
          <p style={{
            fontSize: 18,
            color: '#8a8680',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.6,
            fontWeight: 300,
          }}>
            A systematic method for transforming a single trade signal into four staggered entries — each with a tighter stop loss, each targeting the same take profit, each running on a separate account.
          </p>

          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link href="/calculator" style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: '#c9a84c',
              border: 'none',
              borderRadius: 3,
              color: '#0a0a0a',
              padding: '16px 32px',
              textDecoration: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(201, 168, 76, 0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(201, 168, 76, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(201, 168, 76, 0.2)'
            }}
            >
              Launch Calculator
            </Link>
            <Link href="/playbook" style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 3,
              color: '#f5f3ee',
              padding: '16px 32px',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c9a84c'
              e.currentTarget.style.color = '#c9a84c'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.color = '#f5f3ee'
            }}
            >
              System Playbook
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 1,
          background: 'rgba(201, 168, 76, 0.2)',
          border: '1px solid rgba(201, 168, 76, 0.2)',
          marginTop: 60,
          borderRadius: 4,
          overflow: 'hidden',
        }}>
          {[
            { num: "4", label: "Accounts per signal" },
            { num: "1:8+", label: "Minimum R:R on Q1" },
            { num: "10%", label: "Max Drawdown Cap" },
            { num: "0.5%", label: "Risk floor in drawdown" },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#0a0a0a',
              padding: '32px 28px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 40,
                fontWeight: 700,
                color: '#c9a84c',
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {stat.num}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 10,
                color: '#4a4844',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE PULLBACK VISUALIZER */}
      <section style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: '80px 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ textTransform: 'center', marginBottom: 48, textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 11,
            color: '#7a5e28',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            // Live Simulation
          </div>
          <h2 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 32,
            fontWeight: 700,
            color: '#f5f3ee',
          }}>
            Staggered Entries, <span>Amplified Profits</span>
          </h2>
          <p style={{
            maxWidth: 600,
            margin: '12px auto 0',
            color: '#8a8680',
            fontSize: 14,
            fontWeight: 300,
          }}>
            Drag the slider to simulate price pullback depth. Observe how deep retracements trigger high R:R quadrants, generating massive gains while preserving risk limits.
          </p>
        </div>

        {/* Visualizer Dashboard Card */}
        <div className="glass-panel border-gold" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          padding: 32,
          minHeight: 480,
        }}>
          {/* Left Column: Interactive controls & Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 11,
                color: '#c9a84c',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                Scenario Simulation
              </div>
              <h3 style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 22,
                fontWeight: 700,
                color: '#f5f3ee',
                marginBottom: 12,
              }}>
                {currentScenario.title}
              </h3>
              <p style={{ fontSize: 13, color: '#8a8680', lineHeight: 1.6, minHeight: 60, fontWeight: 300 }}>
                {currentScenario.desc}
              </p>
            </div>

            {/* Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#4a4844', marginBottom: 10, textTransform: 'uppercase' }}>
                <span>No Pullback</span>
                <span>Deep Dip</span>
                <span>Stop Out</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={pullbackIndex}
                onChange={(e) => setPullbackIndex(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#c9a84c',
                  background: '#1a1a1a',
                  height: 6,
                  borderRadius: 3,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Simulation Results grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              <div style={{ background: '#111', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Total Realized Risk</div>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 16, color: '#c0392b', fontWeight: 600 }}>
                  -{currentScenario.totalLoss}R
                </div>
              </div>
              <div style={{ background: '#111', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: '#4a4844', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Net Amplified Return</div>
                <div style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 16,
                  color: currentScenario.netResult > 0 ? '#2e7d52' : '#c0392b',
                  fontWeight: 600
                }}>
                  {currentScenario.netResult > 0 ? `+${currentScenario.netResult}R` : `${currentScenario.netResult}R`}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Price ladder simulation */}
          <div style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
            {/* Ladder header */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#4a4844', textTransform: 'uppercase' }}>
              <span>Simulation Ladder</span>
              <span>Result</span>
            </div>

            {/* Target TP */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              background: pullbackIndex < 4 ? 'rgba(46,125,82,0.08)' : 'transparent',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#5aab7a', fontWeight: 600 }}>▲ Take Profit</span>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#5aab7a' }}>TARGET REACHED</span>
            </div>

            {/* Quadrant Q1-Q4 rows */}
            {[
              { label: "Q1 Entry", index: 0, status: currentScenario.q1, rr: "+10R", color: "#c9a84c" },
              { label: "Q2 Entry", index: 1, status: currentScenario.q2, rr: "+11R", color: "#9b7e3a" },
              { label: "Q3 Entry", index: 2, status: currentScenario.q3, rr: "+12R", color: "#6d5828" },
              { label: "Q4 Entry", index: 3, status: currentScenario.q4, rr: "+13R", color: "#3f3218" },
            ].map((row) => {
              const isFilled = pullbackIndex >= row.index
              const isStoppedOut = pullbackIndex === 4
              let displayStatus = "UNFILLED"
              let statusColor = "#4a4844"
              
              if (isFilled) {
                if (isStoppedOut) {
                  displayStatus = "STOP LOSS (-1R)"
                  statusColor = "#c0392b"
                } else if (row.status === "loss") {
                  displayStatus = "STOP LOSS (-1R)"
                  statusColor = "#c0392b"
                } else if (row.status === "win") {
                  displayStatus = `HIT TP (${row.rr})`
                  statusColor = "#2e7d52"
                }
              }

              return (
                <div key={row.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: isFilled ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                  opacity: isFilled ? 1 : 0.4,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: row.color }}></div>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#f5f3ee', fontWeight: isFilled ? 500 : 300 }}>{row.label}</span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 10,
                    fontWeight: 600,
                    color: statusColor,
                    letterSpacing: '0.05em'
                  }}>
                    {displayStatus}
                  </span>
                </div>
              )
            })}

            {/* Hard Floor SL */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              background: pullbackIndex === 4 ? 'rgba(192, 57, 43, 0.08)' : 'transparent',
            }}>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#c0392b', fontWeight: 600 }}>▼ Hard Stop Loss</span>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#c0392b' }}>
                {pullbackIndex === 4 ? "STOPPED OUT" : "RISK FLOOR"}
              </span>
            </div>
          </div>
        </div>

        {/* Inline Media styling override */}
        <style jsx>{`
          @media (max-width: 768px) {
            div.glass-panel {
              grid-template-columns: 1fr !important;
              padding: 20px !important;
            }
          }
        `}</style>
      </section>

      {/* CORE BENEFITS SECTION */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '60px 24px 80px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 700, color: '#f5f3ee' }}>
            Built for <span>Institutional Math</span>
          </h2>
          <p style={{ color: '#8a8680', fontSize: 14, fontWeight: 300, marginTop: 8 }}>
            Trading rules that mathematically bias performance distributions in your favor.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {[
            {
              title: "Zone Depth Exploitation",
              desc: "Traditional limit entries miss dips. The Quadrant treats the stop loss as a zone with depth, positioning entry orders throughout the zone to capture deep wicks."
            },
            {
              title: "Asymmetric Risk-to-Reward",
              desc: "By stepping entries closer to the stop loss floor, risk remains tight while reward distances stretch. Succeed with a fraction of normal win rates."
            },
            {
              title: "Account Isolation",
              desc: "Each quadrant runs on separate capital. Prop firm drawdown restrictions are isolated—a losing streak on Q1 has zero effect on Q2 or Q3 balances."
            },
            {
              title: "Self-Sizing Risk Modes",
              desc: "The system automatically adjusts down to Recovery Mode (0.5% risk) in drawdown and recovers safely, and speeds up in green market regimes."
            }
          ].map((item, i) => (
            <div key={i} className="glass-panel hover-gold-glow" style={{ padding: 28 }}>
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 10,
                color: '#7a5e28',
                marginBottom: 12,
              }}>
                // 0{i + 1}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 18,
                fontWeight: 600,
                color: '#f5f3ee',
                marginBottom: 10,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: 13,
                color: '#8a8680',
                lineHeight: 1.6,
                fontWeight: 300,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '60px 24px 100px',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 30, fontWeight: 700, color: '#f5f3ee' }}>
            System <span>Roadmap</span>
          </h2>
          <p style={{ color: '#8a8680', fontSize: 14, fontWeight: 300, marginTop: 8 }}>
            Three stages of programmatic growth from manual tool to automated broker execution.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {[
            {
              phase: "01",
              title: "The Manual Calculator",
              status: "ACTIVE",
              desc: "Manual entry inputs for Entry, SL, and TP. Generates exact target zones, position sizing logic, and lot divisions instantly.",
              items: ["Input balance & risk factors", "Calculates Q1-Q4 exact fills", "Shows R:R matrix tables"]
            },
            {
              phase: "02",
              title: "AI Vision Chart Extractor",
              status: "IN DEVELOPMENT",
              desc: "Upload annotated chart screenshots from TradingView, Telegram, or Discord. AI identifies price lines and imports them automatically.",
              items: ["Supports Claude API vision processing", "Automatic price level coordinate matching", "Confidence score flags"]
            },
            {
              phase: "03",
              title: "Automated Broker Execution Manager",
              status: "UPCOMING",
              desc: "Connect your broker accounts via API. Places staggered limit orders programmatically across isolated MT5/cTrader terminals in one-click.",
              items: ["Broker REST & Python API integration", "Auto risk toggle on drawdown threshold", "Trade metrics and ledger sync"]
            }
          ].map((stage, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24, alignItems: 'start' }}>
              <div style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 32,
                fontWeight: 800,
                color: stage.status === "ACTIVE" ? '#c9a84c' : 'rgba(255, 255, 255, 0.1)',
                lineHeight: 1,
              }}>
                {stage.phase}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#f5f3ee',
                  }}>
                    {stage.title}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 8,
                    padding: '3px 8px',
                    borderRadius: 2,
                    background: stage.status === "ACTIVE" ? 'rgba(46, 125, 82, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: stage.status === "ACTIVE" ? '#4caf7d' : '#8a8680',
                    border: stage.status === "ACTIVE" ? '1px solid #2e7d52' : '1px solid rgba(255, 255, 255, 0.1)',
                    fontWeight: 600,
                  }}>
                    {stage.status}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#8a8680', lineHeight: 1.6, marginBottom: 12, fontWeight: 300 }}>
                  {stage.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {stage.items.map((item, idx) => (
                    <li key={idx} style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 11,
                      color: '#4a4844',
                      padding: '3px 0 3px 16px',
                      position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: '#7a5e28' }}>&mdash;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section style={{
        background: 'rgba(201, 168, 76, 0.02)',
        borderTop: '1px solid rgba(201, 168, 76, 0.15)',
        borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 700, color: '#f5f3ee', marginBottom: 16 }}>
            Ready to <span>Amplify Your Edge?</span>
          </h2>
          <p style={{ color: '#8a8680', fontSize: 15, fontWeight: 300, lineHeight: 1.6, marginBottom: 32 }}>
            Run the numbers on your latest signals using the manual calculator, or study the playbook equations to master the system structure.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/calculator" style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              background: '#c9a84c',
              border: 'none',
              borderRadius: 3,
              color: '#0a0a0a',
              padding: '14px 28px',
              textDecoration: 'none',
              fontWeight: 600,
            }}>
              Launch Calculator
            </Link>
            <Link href="/playbook" style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 3,
              color: '#f5f3ee',
              padding: '14px 28px',
              textDecoration: 'none',
              fontWeight: 500,
            }}>
              Read Playbook
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
