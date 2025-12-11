/**
 * ImageShowreel - Animated Image Carousel
 * 
 * Premium image slideshow with smooth transitions
 * Replaces video showreel with lightweight images
 */

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Showreel images - curated selection
const showreelImages = [
  { src: '/560914308_18404954155184208_4058324071045245347_n.jpg', caption: 'Retrato Premium' },
  { src: '/561130094_18404954173184208_1604440133301537245_n.jpg', caption: 'Sessão Editorial' },
  { src: '/561643629_18404954182184208_2493885912661405593_n.jpg', caption: 'Momentos Únicos' },
  { src: '/562506426_18405201763184208_4373451680143518619_n.jpg', caption: 'Arte & Elegância' },
  { src: '/562788130_18405201727184208_6988509653949574672_n.jpg', caption: 'Luz Natural' },
  { src: '/527444076_18396844189184208_6840884165713361988_n.jpg', caption: 'Casamentos' },
  { src: '/550942850_18402487996184208_2384939623492755185_n.jpg', caption: 'Eventos' },
  { src: '/casal_bb_beijo.jpg', caption: 'Amor em Foco' },
]

const ImageShowreel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const intervalRef = useRef(null)

  // Auto-advance slides
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % showreelImages.length)
      }, 4000) // 4 seconds per slide
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % showreelImages.length)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + showreelImages.length) % showreelImages.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.8 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  return (
    <section className="py-24 md:py-40 px-4 md:px-12 lg:px-20 bg-gradient-to-b from-white to-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-baseline gap-4 md:gap-6 mb-2">
            <span 
              className="text-6xl md:text-8xl font-bold text-nuro-black/5"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              —
            </span>
            <div>
              <h2 
                className="text-2xl md:text-4xl font-bold text-nuro-black"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                Em Movimento
              </h2>
              <p className="text-nuro-dark/50 text-xs md:text-sm mt-1 italic">
                Onde a fotografia encontra a narrativa cinematográfica
              </p>
            </div>
          </div>
        </motion.div>

        {/* Showreel Container */}
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/20 bg-nuro-black"
          style={{ aspectRatio: '16/9' }}
        >
          {/* Image Carousel */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentIndex}
              src={showreelImages[currentIndex].src}
              alt={showreelImages[currentIndex].caption}
              className="absolute inset-0 w-full h-full object-cover"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </AnimatePresence>

          {/* Subtle grain overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)'
          }} />

          {/* Top/Bottom gradients */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlay}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </motion.button>

          {/* Bottom left info */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white text-sm md:text-base font-medium">
                  {showreelImages[currentIndex].caption}
                </p>
                <p className="text-white/50 text-xs">Showreel 2024</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-1.5 z-10">
            {showreelImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Caption */}
        <motion.p 
          className="text-nuro-dark/40 text-xs md:text-sm text-center mt-6 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Uma compilação dos melhores momentos capturados em 2024
        </motion.p>
      </div>
    </section>
  )
}

export default ImageShowreel
