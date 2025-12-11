/**
 * Nuro De Sousa — Editorial Photography Portfolio
 * 
 * A cinematographic, scroll-driven experience inspired by Apple.com
 * but with unique editorial identity.
 * 
 * Architecture:
 * - React Router for navigation
 * - Lenis for Apple-like smooth scrolling
 * - Framer Motion for scroll-driven animations
 * - Editorial layout with asymmetric rhythm
 * - Premium CSS effects (glass, light sweep, glow)
 * 
 * Motion Philosophy:
 * - If the user notices the animation, it's wrong
 * - Less movement = more luxury
 * - 60fps always
 */

import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { Footer, Navbar } from './components/layout'
import useLenis from './hooks/useLenis'
import { About, Contact, HistoriaBB, Home, Portfolio } from './pages'
import Admin from './pages/Admin'

/**
 * Scroll to top on route change
 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

/**
 * Main App Layout
 */
const AppLayout = () => {
  // Initialize Lenis smooth scroll
  useLenis()

  // Prevent default scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  return (
    <div className="relative bg-nuro-black min-h-screen">
      {/* Scroll handler */}
      <ScrollToTop />
      
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/historias/1" element={<HistoriaBB />} />
          <Route path="/historias/casal-bb" element={<HistoriaBB />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Ambient background glow - subtle, luxurious */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(120, 119, 198, 0.03), transparent)',
        }}
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App
