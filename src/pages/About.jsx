/**
 * About Page - Enhanced with Apple-Style Parallax
 * 
 * Features:
 * - Multi-layer parallax depth effects
 * - Scroll-driven animations
 * - Light sweep effects
 * - Staggered reveals
 * - Premium 60fps animations
 */

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionWrapper } from '../components/layout'
import {
  FadeIn,
  FloatingElement,
  LightSweep,
  ParallaxImage,
  ScaleReveal,
  StaggerReveal,
  TextReveal
} from '../components/ui'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

/**
 * Work Process Section - 4 Phases with animated icons
 */
const WorkProcess = () => {
  const phases = [
    {
      number: '01',
      title: 'Consulta',
      description: 'Conversamos sobre a sua visão, objectivos e expectativas para criar um plano personalizado.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Planeamento',
      description: 'Definimos locais, horários, styling e todos os detalhes para garantir uma sessão perfeita.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Sessão',
      description: 'O momento mágico onde capturamos a sua essência com direção artística profissional.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Entrega',
      description: 'Recebe as suas imagens editadas profissionalmente, prontas para impressão ou digital.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-nuro-dark/50 mb-4">
            Processo
          </p>
          <h2 
            className="text-3xl md:text-5xl font-bold text-nuro-black"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            Como Trabalhamos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: appleEase }}
              viewport={{ once: true, margin: '-50px' }}
              className="relative group"
            >
              {/* Connector line */}
              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-nuro-gray to-transparent z-0" />
              )}

                <div className="relative z-10 p-6 rounded-xl bg-white border border-black/5 hover:border-black/10 transition-colors duration-300 shadow-lg">
                {/* Number badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-nuro-black text-white flex items-center justify-center text-sm font-bold">
                  {phase.number}
                </div>

                {/* Icon with animation */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-nuro-black/5 flex items-center justify-center mb-6 text-nuro-black"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                  {phase.icon}
                </motion.div>

                <h3 className="text-xl font-medium text-nuro-black mb-3">
                  {phase.title}
                </h3>
                <p className="text-nuro-muted text-sm leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Equipment/Gear Section - Clean Light Theme
 */
const GearSection = () => {
  const gearCategories = [
    {
      title: 'Câmaras',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      ),
      items: [
        { name: 'Canon EOS R5', spec: '45MP Full-Frame' },
        { name: 'Canon EOS R6 Mark II', spec: 'Vídeo 4K 60fps' },
        { name: 'Canon EOS 5D Mark IV', spec: 'Backup & Eventos' },
      ],
    },
    {
      title: 'Lentes',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      items: [
        { name: 'Canon RF 24-70mm f/2.8 L', spec: 'Versatilidade' },
        { name: 'Canon RF 85mm f/1.2 L', spec: 'Retratos' },
        { name: 'Canon RF 35mm f/1.8', spec: 'Street & Editorial' },
        { name: 'Canon RF 70-200mm f/2.8 L', spec: 'Eventos & Desporto' },
      ],
    },
    {
      title: 'Drone',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="5" cy="5" r="2"/>
          <circle cx="19" cy="5" r="2"/>
          <circle cx="5" cy="19" r="2"/>
          <circle cx="19" cy="19" r="2"/>
          <rect x="8" y="8" width="8" height="8" rx="1"/>
          <line x1="7" y1="7" x2="8" y2="8"/>
          <line x1="17" y1="7" x2="16" y2="8"/>
          <line x1="7" y1="17" x2="8" y2="16"/>
          <line x1="17" y1="17" x2="16" y2="16"/>
        </svg>
      ),
      items: [
        { name: 'DJI Mavic 3 Pro', spec: '4/3 CMOS, 5.1K Video' },
        { name: 'DJI Air 3', spec: 'Dual Camera, 48MP' },
        { name: 'DJI Mini 4 Pro', spec: 'Compacto, 4K HDR' },
      ],
    },
    {
      title: 'Iluminação',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      items: [
        { name: 'Profoto A1X', spec: 'Flash portátil' },
        { name: 'Profoto B10', spec: 'Estúdio/Exterior' },
        { name: 'Godox AD600', spec: 'Alta potência' },
      ],
    },
  ]

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-nuro-dark/40 mb-4">
            Equipamento
          </p>
          <h2 
            className="text-3xl md:text-5xl font-bold text-nuro-black mb-4"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            As Ferramentas do Ofício
          </h2>
          <p className="text-nuro-dark/60 max-w-lg mx-auto">
            Equipamento profissional de última geração para capturar cada detalhe
          </p>
        </motion.div>

        {/* Gear Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gearCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15, ease: appleEase }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-black/5"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-black/5">
                <div className="w-12 h-12 rounded-xl bg-nuro-black/5 flex items-center justify-center text-nuro-black">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-nuro-black">{category.title}</h3>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.15) + (itemIndex * 0.08), ease: appleEase }}
                    viewport={{ once: true }}
                    className="group p-4 rounded-xl bg-[#f5f5f5] hover:bg-nuro-black hover:text-white transition-all duration-300 cursor-default"
                  >
                    <p className="font-medium text-nuro-black group-hover:text-white transition-colors">
                      {item.name}
                    </p>
                    <p className="text-sm text-nuro-dark/50 group-hover:text-white/70 transition-colors">
                      {item.spec}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


/**
 * Social Media Section with Instagram
 */
const SocialSection = () => {
  const instagramHandle = '@nurodesousa.fotografia'
  const instagramUrl = 'https://www.instagram.com/nurodesousa.fotografia/'

  const stats = [
    { value: '15K+', label: 'Seguidores' },
    { value: '500+', label: 'Publicações' },
    { value: '50K+', label: 'Interações/mês' },
  ]

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#f5f5f5]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-nuro-dark/50 mb-4">
            Redes Sociais
          </p>
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-nuro-black"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            Siga o Trabalho
          </h2>
          <p className="text-lg text-nuro-dark/60 max-w-xl mx-auto">
            Acompanhe os bastidores, novos projectos e inspiração diária no Instagram
          </p>
        </motion.div>

        {/* Instagram Card */}
        <motion.a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, ease: appleEase }}
          viewport={{ once: true }}
          className="block p-8 md:p-12 rounded-2xl bg-white border border-black/5 shadow-xl mb-12"
        >
          {/* Instagram Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FCAF45" />
                    <stop offset="50%" stopColor="#E1306C" />
                    <stop offset="100%" stopColor="#833AB4" />
                  </linearGradient>
                </defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-medium text-nuro-black mb-2">
            {instagramHandle}
          </h3>
          <p className="text-nuro-dark/60 mb-8">
            Clique para seguir no Instagram
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-black/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: appleEase }}
                viewport={{ once: true }}
              >
                <p className="text-2xl md:text-3xl font-semibold text-nuro-black">{stat.value}</p>
                <p className="text-sm text-nuro-dark/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.a>

        {/* Other Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
          <a
            href="https://wa.me/258845146813"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="tel:+258845146813"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-nuro-black text-white hover:bg-nuro-dark transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Ligar
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Main About Page
 */
const About = () => {
  return (
    <>
      {/* Page Header with TextReveal */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <motion.div 
              className="inline-flex items-center gap-2 text-nuro-dark/60 hover:text-nuro-black transition-colors mb-8"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Voltar ao Início</span>
            </motion.div>
          </Link>

          <FadeIn>
            <LightSweep trigger="auto" duration={2}>
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-nuro-black"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                <TextReveal>Sobre</TextReveal>
              </h1>
            </LightSweep>
            <p className="text-lg md:text-xl text-nuro-dark/60 max-w-2xl">
              A história por trás da lente.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Bio Section with ScaleReveal + FloatingElement */}
      <SectionWrapper className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image with ScaleReveal */}
          <ScaleReveal>
            <FloatingElement intensity={0.5}>
              <ParallaxImage
                src="/nuro_portrait.jpg"
                alt="Nuro De Sousa"
                aspectRatio="1/1"
                className="rounded-2xl shadow-2xl"
              />
            </FloatingElement>
          </ScaleReveal>

          {/* Content with StaggerReveal */}
          <StaggerReveal staggerDelay={0.15} direction="up">
            <div>
              <LightSweep trigger="scroll">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-nuro-black">
                  Nuro De Sousa
                </h2>
              </LightSweep>
              <p className="text-sm uppercase tracking-widest text-nuro-dark/50 mb-6">
                Artista Visual — Maputo, Moçambique
              </p>
            </div>

            <div className="space-y-4 text-nuro-dark/70 text-lg" style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              <p>
                Para mim, a fotografia não é apenas capturar imagens — é descobrir 
                o extraordinário no comum. Cada frame é uma oportunidade de revelar 
                uma verdade que poderia passar despercebida.
              </p>
              <p>
                Com mais de uma década de experiência em fotografia editorial e comercial, 
                tive o privilégio de trabalhar com marcas e pessoas incríveis em Moçambique 
                e além. A minha abordagem permanece inalterada: observação paciente, 
                conexão autêntica e respeito pelo momento.
              </p>
              <p>
                Baseado em Maputo, inspiro-me na luz única desta cidade africana — 
                uma qualidade que tem atraído artistas há séculos. Esta luz, combinada 
                com uma profunda apreciação pelas histórias humanas, molda cada fotografia que crio.
              </p>
            </div>

            <div className="pt-8 space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-widest text-nuro-dark/40 mb-2">
                  Especialidades
                </h3>
                <p className="text-nuro-dark/60">
                  Fotografia Editorial, Retratos, Casamentos, Eventos, Comercial
                </p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-widest text-nuro-dark/40 mb-2">
                  Localização
                </h3>
                <p className="text-nuro-dark/60">
                  Zimpeto, Maputo • Disponível para projectos mundiais
                </p>
              </div>
            </div>
          </StaggerReveal>
        </div>
      </SectionWrapper>

      {/* Work Process */}
      <WorkProcess />

      {/* Philosophy Section */}
      <SectionWrapper className="bg-[#fafafa]">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-nuro-dark/50 mb-4">
              Filosofia
            </p>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-nuro-black"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              Filosofia de Trabalho
            </h2>
            <blockquote className="text-xl md:text-2xl text-nuro-dark/70 leading-relaxed italic font-display">
              "Se o espectador nota a técnica, falhei. A melhor fotografia é 
              invisível — simplesmente apresenta a verdade na sua forma mais convincente."
            </blockquote>
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Equipment/Gear */}
      <GearSection />

      {/* Social Media */}
      <SocialSection />
    </>
  )
}

export default About
