import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.07)',
      background: '#0a0a0a',
      padding: '60px 24px',
      color: '#8a8680',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}>
        {/* Top Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#c9a84c',
              marginBottom: 6,
            }}>
              The Quadrant
            </div>
            <div style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              color: '#4a4844',
            }}>
              System Playbook v1.0 &nbsp;·&nbsp; Confidential
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#8a8680', fontSize: 13, fontFamily: 'var(--font-mono), monospace' }} className="link-hover">
              Home
            </Link>
            <Link href="/calculator" style={{ textDecoration: 'none', color: '#8a8680', fontSize: 13, fontFamily: 'var(--font-mono), monospace' }} className="link-hover">
              Calculator
            </Link>
            <Link href="/playbook" style={{ textDecoration: 'none', color: '#8a8680', fontSize: 13, fontFamily: 'var(--font-mono), monospace' }} className="link-hover">
              Playbook
            </Link>
            <Link href="/analysis" style={{ textDecoration: 'none', color: '#8a8680', fontSize: 13, fontFamily: 'var(--font-mono), monospace' }} className="link-hover">
              Analysis
            </Link>
            <Link href="/thresholds" style={{ textDecoration: 'none', color: '#8a8680', fontSize: 13, fontFamily: 'var(--font-mono), monospace' }} className="link-hover">
              Thresholds
            </Link>
          </div>


        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255, 255, 255, 0.05)' }}></div>

        {/* Disclaimer / Bottom Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <p style={{
            fontSize: 11,
            color: '#4a4844',
            lineHeight: 1.6,
            maxWidth: 800,
            margin: 0,
          }}>
            <strong>RISK WARNING:</strong> Trading foreign exchange, contracts for difference (CFDs), and other financial products carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The Quadrant system is a mathematical trade management methodology and does not guarantee profitability or protect against market volatility. Any historical performance metrics are illustrative.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: '#4a4844',
            fontFamily: 'var(--font-mono), monospace',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <span>&copy; {new Date().getFullYear()} The Quadrant. All rights reserved.</span>
            <span>RESTRICTED ACCESS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
