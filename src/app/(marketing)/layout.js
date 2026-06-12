import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MarketingLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 72px - 300px)' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
