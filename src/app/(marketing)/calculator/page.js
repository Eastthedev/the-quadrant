import QuadrantCalculator from '../../components/QuadrantCalculator'

export const metadata = {
  title: 'The Quadrant — Signal Splitter Calculator',
  description: 'Split your trade signals into four staggered limit entries to improve risk-to-reward ratio and control drawdown.',
}

export default function CalculatorPage() {
  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <QuadrantCalculator />
    </div>
  )
}
