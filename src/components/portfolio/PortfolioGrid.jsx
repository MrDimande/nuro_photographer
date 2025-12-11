/**
 * PortfolioGrid - Homepage Preview Gallery
 * 
 * Curated selection: 1-2 photos per category
 * Clean presentation without filters
 */

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X, ZoomIn } from 'lucide-react'
import { useState } from 'react'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

// Curated sample items - 1-2 per category (10 total)
const sampleItems = [
  // Retratos (2)
  {
    id: 1,
    category: 'retratos',
    src: '/560914308_18404954155184208_4058324071045245347_n.jpg',
    alt: 'Retrato - Luz Natural',
    title: 'Luz Natural',
    size: 'large',
  },
  {
    id: 2,
    category: 'retratos',
    src: '/561181985_18404954164184208_5407017860984878282_n.jpg',
    alt: 'Retrato - Artístico',
    title: 'Artístico',
    size: 'medium',
  },
  // Formaturas (1)
  {
    id: 3,
    category: 'formaturas',
    src: '/formatura_1.jpg',
    alt: 'Formatura - Conquista',
    title: 'Conquista',
    size: 'medium',
  },
  // Casamentos (1)
  {
    id: 4,
    category: 'casamentos',
    src: '/550942850_18402487996184208_2384939623492755185_n.jpg',
    alt: 'Casamento - Eternidade',
    title: 'Eternidade',
    size: 'large',
  },
  // Eventos (1)
  {
    id: 5,
    category: 'eventos',
    src: '/490543632_18382917580184208_9214427187958563830_n.jpg',
    alt: 'Evento - Celebração',
    title: 'Celebração',
    size: 'small',
  },
  // Lifestyle (2)
  {
    id: 6,
    category: 'lifestyle',
    src: '/527510445_18396844174184208_2859515816573133558_n.jpg',
    alt: 'Lifestyle - Autêntico',
    title: 'Autêntico',
    size: 'medium',
  },
  {
    id: 7,
    category: 'lifestyle',
    src: '/527444076_18396844189184208_6840884165713361988_n.jpg',
    alt: 'Lifestyle - Natural',
    title: 'Natural',
    size: 'small',
  },
  // Corporativo (1)
  {
    id: 8,
    category: 'corporativo',
    src: '/2025_11_07_11_09_IMG_2706.JPG',
    alt: 'Corporativo - Business',
    title: 'Business',
    size: 'large',
  },
  // Projectos (2)
  {
    id: 9,
    category: 'projectos',
    src: '/537421951_18398961856184208_4790026944126573178_n.jpg',
    alt: 'Projecto - Criativo',
    title: 'Visão Criativa',
    size: 'medium',
  },
  {
    id: 10,
    category: 'projectos',
    src: '/562561202_18405201679184208_8445742481536646510_n.jpg',
    alt: 'Projecto - Arte',
    title: 'Arte',
    size: 'small',
  },
]

// Category pills for visual indicator
const categories = [
  { id: 'retratos', label: 'Retratos' },
  { id: 'formaturas', label: 'Formaturas' },
  { id: 'casamentos', label: 'Casamentos' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'corporativo', label: 'Corporativo' },
  { id: 'projectos', label: 'Projectos' },
]

// Single Portfolio Item
const PortfolioItem = ({ item, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-1 row-span-1 md:row-span-2',
    large: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: appleEase }}
      className={`${sizeClasses[item.size] || 'col-span-1'} relative group cursor-pointer`}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full min-h-[280px] md:min-h-[320px] overflow-hidden rounded-2xl shadow-lg shadow-black/10">
        <motion.img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: appleEase }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white/60 text-xs uppercase tracking-wider mb-1 capitalize">
            {item.category}
          </span>
          <h3 className="text-white text-lg md:text-xl font-semibold">
            {item.title}
          </h3>
        </motion.div>

        <motion.div
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ZoomIn size={18} className="text-nuro-black" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Lightbox Modal
const Lightbox = ({ item, onClose }) => {
  if (!item) return null

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.button
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
      >
        <X size={24} />
      </motion.button>

      <motion.div
        className="relative max-w-6xl max-h-[85vh] overflow-hidden rounded-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: appleEase }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.src} alt={item.alt} className="w-full h-full object-contain" />

        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white text-xl md:text-2xl font-semibold">{item.title}</h3>
          <p className="text-white/60 text-sm capitalize mt-1">{item.category} • Nuro De Sousa</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Main Portfolio Grid Component
const PortfolioGrid = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <section className="py-20 md:py-32 px-4 md:px-12 lg:px-20 bg-gradient-to-b from-[#f5f5f5] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-nuro-black mb-4"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            Portfólio
          </h2>
          <p className="text-lg md:text-xl text-nuro-dark/60 max-w-2xl mx-auto mb-8">
            Uma amostra do meu trabalho em diferentes áreas da fotografia
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat, i) => (
              <motion.span
                key={cat.id}
                className="px-4 py-1.5 rounded-full bg-nuro-black/5 text-nuro-dark/60 text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {cat.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid - Curated Selection */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[220px]"
          layout
        >
          {sampleItems.map((item, index) => (
            <PortfolioItem
              key={item.id}
              item={item}
              index={index}
              onClick={setSelectedItem}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 bg-nuro-black text-white rounded-full font-medium group"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Galeria Completa
            <span className="text-sm text-white/60">(47 fotos)</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default PortfolioGrid

