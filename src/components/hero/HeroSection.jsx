/**
 * HeroSection - Enhanced Creative Style
 * 
 * Features:
 * - Vintage grain/noise texture
 * - Intense mouse parallax
 * - Typewriter text effect
 * - Floating particles
 * - Mobile-optimized layout
 */

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Aperture, BookOpen, Paintbrush } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

// Film Grain Overlay Component
const FilmGrain = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        opacity: 0.04,
        mixBlendMode: 'multiply',
      }}
    >
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.85" 
            numOctaves="4" 
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  )
}

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-nuro-black/5"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Typewriter Effect Component
const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowCursor(false), 1500)
        }
      }, 80)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(startDelay)
  }, [text, delay])

  return (
    <span className="inline-flex">
      {displayedText}
      {showCursor && (
        <motion.span
          className="ml-1 inline-block w-[3px] bg-nuro-black"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  )
}

// Animated text that reveals letter by letter
const AnimatedTitle = ({ text, delay = 0 }) => {
  return (
    <span className="inline-block overflow-hidden">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: appleEase,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

const HeroSection = () => {
  const sectionRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredRole, setHoveredRole] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  })

  const imageY = useTransform(smoothProgress, [0, 1], [0, 80])
  const image2Y = useTransform(smoothProgress, [0, 1], [0, 120])
  const textY = useTransform(smoothProgress, [0, 1], [0, -40])

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const roles = [
    { text: 'Fotógrafo', color: '#3B82F6', Icon: Aperture },
    { text: 'Artista Visual', color: '#F59E0B', Icon: Paintbrush },
    { text: 'Storyteller', color: '#EF4444', Icon: BookOpen },
  ]

  const photos = [
    '/560914308_18404954155184208_4058324071045245347_n.jpg',
    '/561130094_18404954173184208_1604440133301537245_n.jpg',
  ]

  return (
    <>
      {/* Film Grain Overlay - covers entire page */}
      <FilmGrain />

      <section 
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden pt-16 md:pt-20"
        style={{
          background: 'linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)',
        }}
      >
        {/* Floating Particles */}
        <FloatingParticles />

        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
              x: mousePosition.x * -30,
              y: mousePosition.y * -30,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
              x: mousePosition.x * 20,
              y: mousePosition.y * 20,
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 py-8 md:py-0">
          <div className="min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
            
            {/* Left Side - Typography */}
            <motion.div 
              className="flex-1 text-center lg:text-left order-2 lg:order-1 z-10"
              style={{ y: textY }}
            >
              {/* Name with chalk-style font */}
              <div className="mb-1 md:mb-2">
                <h1 
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] text-nuro-black tracking-tight leading-[0.85] whitespace-nowrap"
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                  <AnimatedTitle text="NURO" delay={0.3} />
                </h1>
              </div>
              <div>
                <h1 
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] text-nuro-black tracking-tight leading-[0.85] whitespace-nowrap"
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                  <AnimatedTitle text="DE SOUSA" delay={0.5} />
                </h1>
              </div>

              {/* Roles - Clean pill layout */}
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3 md:gap-4">
                {roles.map((role, index) => {
                  const Icon = role.Icon
                  return (
                    <motion.div
                      key={role.text}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.8 + index * 0.1, 
                        ease: appleEase 
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: role.color,
                      }}
                      onMouseEnter={() => setHoveredRole(index)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      <motion.div
                        animate={{ 
                          rotate: hoveredRole === index ? 360 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        style={{ color: hoveredRole === index ? '#fff' : role.color }}
                      >
                        <Icon size={18} strokeWidth={2} />
                      </motion.div>
                      <span 
                        className="text-sm md:text-base font-semibold transition-colors duration-300"
                        style={{ 
                          color: hoveredRole === index ? '#fff' : '#1c1c1e',
                        }}
                      >
                        {role.text}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Corporate Quote with Typewriter */}
              <motion.div
                className="mt-6 md:mt-10 border-l-2 border-nuro-black/20 pl-3 md:pl-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="text-base md:text-lg lg:text-xl text-nuro-dark/70 italic font-light">
                  "<TypewriterText text="Transformando momentos em memórias eternas" delay={1.5} />"
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mt-6 md:mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <motion.button
                  onClick={() => {
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-nuro-black text-white rounded-full font-medium text-sm md:text-base"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Portfólio
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
                
                <motion.a
                  href="https://wa.me/258845146813"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-nuro-black rounded-full font-medium border-2 border-nuro-black/10 text-sm md:text-base"
                  whileHover={{ scale: 1.05, borderColor: '#1c1c1e' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contactar
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - Photo Collage */}
            <motion.div 
              className="flex-1 relative order-1 lg:order-2 w-full max-w-sm md:max-w-none"
            >
              <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
                {/* Main Photo */}
                <motion.div
                  className="relative z-20"
                  style={{ 
                    y: imageY,
                    x: mousePosition.x * 25,
                    rotateY: mousePosition.x * 10,
                    rotateX: mousePosition.y * -10,
                  }}
                  initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                  animate={isLoaded ? { opacity: 1, scale: 1, rotate: 3 } : {}}
                  transition={{ duration: 1, delay: 0.3, ease: appleEase }}
                >
                  <div 
                    className="relative bg-white p-2 md:p-3 shadow-2xl rounded-sm" 
                    style={{ transform: 'rotate(3deg)', transformStyle: 'preserve-3d' }}
                  >
                    {/* Film perforations */}
                    <div className="absolute -top-2 md:-top-3 left-2 right-2 flex justify-between">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-sm bg-nuro-black/80" />
                      ))}
                    </div>
                    <div className="absolute -bottom-2 md:-bottom-3 left-2 right-2 flex justify-between">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-sm bg-nuro-black/80" />
                      ))}
                    </div>

                    <motion.img
                      src={photos[0]}
                      alt="Nuro De Sousa"
                      className="w-full aspect-[4/5] object-cover"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="absolute top-3 md:top-5 right-3 md:right-5 text-[10px] md:text-xs font-mono text-white/80 bg-black/50 px-2 py-1 rounded">
                      © 2024
                    </div>
                  </div>

                  {/* Tape decoration */}
                  <motion.div
                    className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 w-16 md:w-24 h-6 md:h-8"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.7) 0%, rgba(245, 158, 11, 0.8) 100%)',
                      transform: 'rotate(-2deg)',
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 }}
                  />
                </motion.div>

                {/* Secondary Photo */}
                <motion.div
                  className="absolute -bottom-8 md:-bottom-16 -left-4 md:-left-12 z-10 w-32 md:w-48 lg:w-56"
                  style={{ 
                    y: image2Y,
                    x: mousePosition.x * -35,
                    rotateY: mousePosition.x * -8,
                    rotateX: mousePosition.y * 8,
                  }}
                  initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                  animate={isLoaded ? { opacity: 1, scale: 1, rotate: -8 } : {}}
                  transition={{ duration: 1, delay: 0.6, ease: appleEase }}
                >
                  <div className="bg-white p-1.5 md:p-2 shadow-xl rounded-sm" style={{ transform: 'rotate(-8deg)' }}>
                    <img
                      src={photos[1]}
                      alt="Portfolio Work"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  
                  <motion.div
                    className="absolute -bottom-2 md:-bottom-4 -right-2 md:-right-4 w-10 md:w-14 h-10 md:h-14 bg-nuro-black rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isLoaded ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2, type: 'spring' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-white text-[10px] md:text-xs font-bold">
                      2024
                    </span>
                  </motion.div>
                </motion.div>

                {/* Location badge */}
                <motion.div
                  className="hidden sm:block absolute bottom-16 md:bottom-20 -right-2 md:-right-6 bg-white text-nuro-black px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg border border-nuro-black/10"
                  style={{
                    x: mousePosition.x * 15,
                    y: mousePosition.y * 15,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  📍 Maputo, Moçambique
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => {
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-nuro-dark/50">Explorar</span>
            <div className="w-5 md:w-6 h-8 md:h-10 rounded-full border-2 border-nuro-dark/20 flex justify-center pt-1.5 md:pt-2">
              <motion.div 
                className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-nuro-dark/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default HeroSection
