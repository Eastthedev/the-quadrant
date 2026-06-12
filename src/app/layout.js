import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['700', '800'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['300', '400', '500'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] })

export const metadata = {
  title: 'The Quadrant — Copytrade Amplification System',
  description: 'A systematic method for transforming a single trade signal into four staggered entries with tighter risk limits and amplified returns.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  )
}

