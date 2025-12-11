/**
 * ServicesSection - Bold & Artistic Design
 * 
 * Monochromatic, artistic approach
 * Matches portfolio aesthetic concept
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

// Services data with artistic descriptions
const services = [
  {
    id: 1,
    number: '01',
    title: 'Fotografia',
    subtitle: 'A Arte de Congelar o Tempo',
    description: 'Cada frame conta uma história. Desde retratos intimistas a editoriais de moda, capturo a essência única de cada momento.',
    tags: ['Retratos', 'Editorial', 'Comercial', 'Moda'],
    image: '/561181985_18404954164184208_5407017860984878282_n.jpg',
  },
  {
    id: 2,
    number: '02',
    title: 'Videografia',
    subtitle: 'Narrativas em Movimento',
    description: 'Do conceito à entrega final. Produção cinematográfica que transforma ideias em experiências visuais memoráveis.',
    tags: ['Documentário', 'Publicidade', 'Eventos', 'Reels'],
    image: '/527510445_18396844174184208_2859515816573133558_n.jpg',
  },
  {
    id: 3,
    number: '03',
    title: 'Drone',
    subtitle: 'Perspectivas Impossíveis',
    description: 'Vistas aéreas que revelam a grandeza escondida. Tecnologia de ponta para capturas que desafiam a gravidade.',
    tags: ['Aéreo', 'Imobiliário', 'Eventos', 'Paisagens'],
    image: '/2025_11_07_11_09_IMG_2706.JPG',
  },
  {
    id: 4,
    number: '04',
    title: 'Eventos',
    subtitle: 'Momentos que Duran Para Sempre',
    description: 'Casamentos, formaturas, celebrações. Documento cada emoção, cada abraço, cada lágrima de felicidade.',
    tags: ['Casamentos', 'Formaturas', 'Corporativo', 'Festas'],
    image: '/formatura_1.jpg',
  },
]

// Service Card with image reveal on hover
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: appleEase }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="relative bg-white rounded-[2rem] p-8 md:p-10 overflow-hidden border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10">
        
        {/* Background Image (reveals on hover) */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.08 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={service.image} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          {/* Number & Title Row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              {/* Number */}
              <span 
                className="text-6xl md:text-7xl font-bold text-nuro-black/5 block leading-none mb-2"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                {service.number}
              </span>
              
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-nuro-black">
                {service.title}
              </h3>
              
              {/* Subtitle */}
              <p className="text-nuro-dark/50 text-sm mt-1 italic">
                {service.subtitle}
              </p>
            </div>

            {/* Arrow Icon */}
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-nuro-black flex items-center justify-center"
              animate={{ 
                rotate: isHovered ? 45 : 0,
                backgroundColor: isHovered ? '#0a0a0a' : 'transparent'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="text-xl"
                animate={{ color: isHovered ? '#ffffff' : '#0a0a0a' }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-nuro-dark/70 leading-relaxed mb-6 max-w-md">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-nuro-black/10 text-nuro-dark/60 text-xs font-medium"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ 
                  backgroundColor: '#0a0a0a', 
                  color: '#ffffff',
                  borderColor: '#0a0a0a'
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Decorative Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-nuro-black"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
        />
      </div>
    </motion.div>
  )
}

// Main Services Section
const ServicesSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-40 px-4 md:px-12 lg:px-20 bg-[#fafafa] relative overflow-hidden"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span 
          className="text-[20vw] font-bold text-nuro-black/[0.02] whitespace-nowrap select-none"
          style={{ fontFamily: "'Permanent Marker', cursive" }}
        >
          SERVIÇOS
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-24"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <motion.span 
                className="text-sm uppercase tracking-[0.3em] text-nuro-dark/40 block mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                O Que Faço
              </motion.span>
              <h2 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-nuro-black"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                Serviços
              </h2>
            </div>
            
            <motion.p 
              className="text-lg md:text-xl text-nuro-dark/60 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Soluções visuais completas para transformar 
              a sua visão em realidade extraordinária.
            </motion.p>
          </div>
        </motion.div>

        {/* Services Grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link to="/contact" key={service.id}>
              <ServiceCard service={service} index={index} />
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/contact">
            <motion.button
              className="group inline-flex items-center gap-4 px-8 py-4 bg-nuro-black text-white rounded-full font-medium"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Vamos Criar Juntos</span>
              <motion.span 
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
