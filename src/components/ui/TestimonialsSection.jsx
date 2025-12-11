/**
 * Testimonials Section - Modern Redesign
 * 
 * Features:
 * - Carousel with auto-play
 * - Modern card design with avatars
 * - Animated quote marks
 * - Stats section with counters
 * - Fully responsive
 */

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { testimonials } from '../../data/testimonials'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

// Generate avatar colors based on name
const getAvatarColor = (name) => {
  const colors = [
    'from-blue-500 to-purple-600',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-violet-500 to-indigo-600',
    'from-cyan-500 to-blue-600',
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

// Star Rating Component
const StarRating = ({ rating = 5 }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
      />
    ))}
  </div>
)

// Single Testimonial Card
const TestimonialCard = ({ testimonial, isActive }) => {
  const avatarColor = getAvatarColor(testimonial.name)

  return (
    <motion.div
      className={`
        relative p-6 md:p-8 lg:p-10 rounded-3xl
        bg-white shadow-xl shadow-black/5
        border border-black/5
        ${isActive ? 'scale-100' : 'scale-95 opacity-50'}
        transition-all duration-500
      `}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: appleEase }}
    >
      {/* Quote Icon */}
      <motion.div
        className="absolute -top-4 left-8 w-10 h-10 bg-nuro-black rounded-full flex items-center justify-center shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
      >
        <Quote size={18} className="text-white fill-white" />
      </motion.div>

      {/* Quote Text */}
      <motion.p 
        className="text-lg md:text-xl lg:text-2xl text-nuro-dark/80 leading-relaxed mt-4 mb-8 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        "{testimonial.quote}"
      </motion.p>

      {/* Author Info */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <motion.div
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-xl font-bold text-white">
              {testimonial.name.charAt(0)}
            </span>
          </motion.div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-nuro-black">
              {testimonial.name}
            </h4>
            <p className="text-sm text-nuro-dark/50">
              {testimonial.role}
              {testimonial.company && (
                <span className="font-medium"> • {testimonial.company}</span>
              )}
            </p>
          </div>
        </div>

        <StarRating rating={testimonial.rating} />
      </div>
    </motion.div>
  )
}

// Counter Animation Component
const AnimatedCounter = ({ value, suffix = '', label }) => {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = numericValue / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [numericValue])

  return (
    <div className="text-center">
      <motion.p
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-nuro-black mb-2"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: appleEase }}
      >
        {count}{suffix}
      </motion.p>
      <p className="text-nuro-dark/50 text-sm md:text-base">{label}</p>
    </div>
  )
}

// Main Testimonials Section
const TestimonialsSection = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className={`py-20 md:py-32 px-4 md:px-12 lg:px-20 bg-gradient-to-b from-[#fafafa] to-white overflow-hidden ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-nuro-dark/50 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Testemunhos
          </motion.p>
          
          <h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-nuro-black mb-4"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            O Que Dizem
          </h2>
          
          <p className="text-lg text-nuro-dark/60 max-w-xl mx-auto">
            Histórias de clientes satisfeitos que confiaram no meu trabalho
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={currentTestimonial.id}
              testimonial={currentTestimonial}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white border border-black/10 flex items-center justify-center text-nuro-dark hover:bg-nuro-black hover:text-white transition-all shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white border border-black/10 flex items-center justify-center text-nuro-dark hover:bg-nuro-black hover:text-white transition-all shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'bg-nuro-black w-8' 
                    : 'bg-nuro-black/20 w-2 hover:bg-nuro-black/40'
                  }
                `}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mt-16 md:mt-24 pt-12 border-t border-black/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedCounter value="500" suffix="+" label="Sessões Realizadas" />
          <AnimatedCounter value="10" suffix="+" label="Anos de Experiência" />
          <AnimatedCounter value="100" suffix="%" label="Satisfação" />
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
