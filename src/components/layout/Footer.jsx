/**
 * Footer Component - Modern Redesign
 * 
 * Features:
 * - Newsletter subscription
 * - Social media links with hover effects
 * - Clean grid layout
 * - Consistent light theme
 * - Lucide icons
 */

import { motion } from 'framer-motion'
import { Facebook, Heart, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

// Social Link Component
const SocialLink = ({ href, icon: Icon, label, color }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      w-12 h-12 rounded-full bg-white border border-black/5 shadow-sm
      flex items-center justify-center text-nuro-dark/60
      hover:text-white transition-all duration-300
    `}
    style={{ '--hover-bg': color }}
    whileHover={{ 
      scale: 1.1, 
      backgroundColor: color,
    }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <Icon size={20} />
  </motion.a>
)

// Footer Link Component
const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-nuro-dark/60 hover:text-nuro-black transition-colors duration-300 flex items-center gap-2 group"
  >
    <span className="w-0 group-hover:w-2 h-0.5 bg-nuro-black transition-all duration-300" />
    {children}
  </Link>
)

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <div className="bg-nuro-black rounded-2xl p-6 md:p-8">
      <h4 className="text-lg font-semibold text-white mb-2">
        Newsletter
      </h4>
      <p className="text-white/60 text-sm mb-4">
        Receba novidades sobre sessões e trabalhos exclusivos.
      </p>
      
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-green-400"
        >
          <span className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          Subscrito com sucesso!
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="o.seu@email.com"
            className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors text-sm"
            required
          />
          <motion.button
            type="submit"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-nuro-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={18} />
          </motion.button>
        </form>
      )}
    </div>
  )
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { href: 'https://www.instagram.com/nurodesousa.fotografia/', icon: Instagram, label: 'Instagram', color: '#E4405F' },
    { href: 'https://wa.me/258845146813', icon: MessageCircle, label: 'WhatsApp', color: '#25D366' },
    { href: 'https://www.facebook.com/nurodesousa.fotografia', icon: Facebook, label: 'Facebook', color: '#1877F2' },
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-[#f5f5f5] pt-20 pb-8 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <h3 
                className="text-2xl md:text-3xl text-nuro-black"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                Nuro De Sousa
              </h3>
            </Link>
            <p className="text-nuro-dark/60 leading-relaxed mb-6 text-sm md:text-base">
              Capturando momentos que transcendem o ordinário. 
              Fotografia editorial e comercial em Moçambique.
            </p>
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-700 font-medium">Disponível para projectos</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm uppercase tracking-widest text-nuro-dark/40 font-semibold mb-4">
              Links
            </h4>
            <nav className="flex flex-col gap-3">
              <FooterLink to="/">Início</FooterLink>
              <FooterLink to="/portfolio">Portfólio</FooterLink>
              <FooterLink to="/about">Sobre</FooterLink>
              <FooterLink to="/contact">Contacto</FooterLink>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm uppercase tracking-widest text-nuro-dark/40 font-semibold mb-4">
              Serviços
            </h4>
            <nav className="flex flex-col gap-3 text-nuro-dark/60 text-sm">
              <span>Sessões de Retrato</span>
              <span>Cobertura de Eventos</span>
              <span>Fotografia Comercial</span>
              <span>Projectos Editoriais</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-sm uppercase tracking-widest text-nuro-dark/40 font-semibold mb-4">
              Contacto
            </h4>
            <div className="space-y-3 mb-6">
              <a 
                href="tel:+258845146813"
                className="flex items-center gap-3 text-nuro-dark/70 hover:text-nuro-black transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-nuro-black/5 flex items-center justify-center group-hover:bg-nuro-black group-hover:text-white transition-all">
                  <Phone size={16} />
                </div>
                <span className="text-sm">+258 84 514 6813</span>
              </a>
              
              <a 
                href="mailto:nurosousa@gmail.com"
                className="flex items-center gap-3 text-nuro-dark/70 hover:text-nuro-black transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-nuro-black/5 flex items-center justify-center group-hover:bg-nuro-black group-hover:text-white transition-all">
                  <Mail size={16} />
                </div>
                <span className="text-sm">nurosousa@gmail.com</span>
              </a>

              <div className="flex items-center gap-3 text-nuro-dark/50">
                <div className="w-10 h-10 rounded-full bg-nuro-black/5 flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <span className="text-sm">Maputo, Moçambique</span>
              </div>
            </div>

            {/* Newsletter */}
            <Newsletter />
          </div>
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="pt-8 border-t border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <SocialLink key={social.label} {...social} />
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-nuro-dark/50 text-center">
              © {currentYear} Nuro De Sousa Fotografia. Todos os direitos reservados.
            </p>

            {/* Made with love */}
            <p className="flex items-center gap-1 text-sm text-nuro-dark/50">
              Feito com
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-red-500 fill-red-500" />
              </motion.span>
              em Maputo
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
