/**
 * Navbar Component
 * 
 * Elegant floating navbar - no harsh borders.
 */

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

// Signature Logo Component
const SignatureLogo = () => {
  return (
    <Link to="/" className="block">
      <svg viewBox="0 0 220 55" className="w-32 md:w-36 h-auto" fill="none">
        {/* Decorative swirl at start */}
        <path
          d="M5 32 Q12 10, 22 25 Q28 35, 25 22"
          stroke="#1c1c1e"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* "Nuro" text */}
        <text
          x="22"
          y="32"
          fill="#1c1c1e"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '26px',
            fontWeight: 600,
          }}
        >
          Nuro
        </text>
        
        {/* "De Sousa" text */}
        <text
          x="68"
          y="32"
          fill="#1c1c1e"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '26px',
            fontWeight: 400,
          }}
        >
          De Sousa
        </text>
        
        {/* Underline with flourish */}
        <path
          d="M22 38 L185 38 Q200 38, 210 30"
          stroke="#1c1c1e"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* PHOTOGRAPHY text */}
        <text
          x="110"
          y="50"
          fill="#9ca3af"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: '8px',
            letterSpacing: '0.25em',
            fontWeight: 300,
          }}
        >
          PHOTOGRAPHY
        </text>
      </svg>
    </Link>
  )
}

const NavLink = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`
        text-sm font-medium tracking-wide
        transition-all duration-300
        relative pb-1
        ${isActive 
          ? 'text-nuro-black' 
          : 'text-nuro-dark/50 hover:text-nuro-black'
        }
      `}
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-nuro-black rounded-full"
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </Link>
  )
}

const Navbar = () => {
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Track scroll for shadow effect
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    
    // Show/hide on scroll
    if (latest > previous && latest > 150) {
      setHidden(true)
      setMobileMenuOpen(false)
    } else {
      setHidden(false)
    }
    
    // Shadow after scroll
    setScrolled(latest > 20)
  })

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/portfolio', label: 'Portfólio' },
    { to: '/about', label: 'Sobre' },
    { to: '/contact', label: 'Contacto' },
  ]

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' }
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: appleEase }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Background with smooth shadow transition */}
      <motion.div 
        className="absolute inset-0 bg-white/98 backdrop-blur-2xl"
        animate={{
          boxShadow: scrolled 
            ? '0 4px 30px rgba(0, 0, 0, 0.05)' 
            : '0 0px 0px rgba(0, 0, 0, 0)'
        }}
        transition={{ duration: 0.3 }}
      />

      <nav className="relative px-6 md:px-12 lg:px-20 py-2 md:py-3 flex items-center justify-between">
        {/* Signature Logo */}
        <SignatureLogo />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-nuro-dark hover:text-nuro-black transition-colors"
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <motion.g
              animate={mobileMenuOpen ? 'open' : 'closed'}
            >
              {mobileMenuOpen ? (
                <>
                  <motion.line 
                    x1="6" y1="6" x2="18" y2="18"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <motion.line 
                    x1="6" y1="18" x2="18" y2="6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </motion.g>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen 
          ? { height: 'auto', opacity: 1 } 
          : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: appleEase }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, x: -20 }}
              animate={mobileMenuOpen 
                ? { opacity: 1, x: 0, transition: { delay: index * 0.1 } }
                : { opacity: 0, x: -20 }
              }
            >
              <Link
                to={link.to}
                className="text-xl text-nuro-dark hover:text-nuro-black transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          
          {/* WhatsApp CTA */}
          <motion.a
            href="https://wa.me/258845146813"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-nuro-black text-white rounded-full font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={mobileMenuOpen 
              ? { opacity: 1, y: 0, transition: { delay: 0.4 } }
              : { opacity: 0, y: 10 }
            }
            whileTap={{ scale: 0.95 }}
          >
            Contactar via WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Navbar
