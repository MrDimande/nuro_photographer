/**
 * EditorialImage Component
 * 
 * Core parallax image component with real depth effect.
 * Different sizes float at different velocities.
 * 
 * ✅ Layers float at different speeds
 * ✅ Real depth perception
 * ✅ Invisible, premium movement
 */

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Apple-style easing
const easeApple = [0.25, 0.1, 0.25, 1]

const EditorialImage = ({ 
  src, 
  alt = '',
  size = 'large', 
  speed = 0.12,
  position = 'center',
  caption,
}) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Smooth spring for premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Parallax Y movement - different speed = different depth
  const y = useTransform(
    smoothProgress,
    [0, 1],
    [-speed * 150, speed * 150]
  )

  // Subtle scale based on size
  const scaleRange = {
    hero: [1.08, 1],
    fullscreen: [1.1, 1.02],
    large: [1.05, 1],
    medium: [1.03, 1],
    small: [1.02, 1],
  }

  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [scaleRange[size][0], 1, scaleRange[size][1]]
  )

  // Opacity fade for fullscreen
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    size === 'fullscreen' ? [0.4, 1, 1, 0.4] : [1, 1, 1, 1]
  )

  // Size configurations
  const sizeClasses = {
    hero: 'w-full md:w-[85vw] mx-auto aspect-[16/10]',
    fullscreen: 'w-full min-h-screen',
    large: 'w-full md:w-[70vw] aspect-[4/5]',
    medium: 'w-full md:w-[55vw] aspect-[4/5]',
    small: 'w-full md:w-[40vw] aspect-[3/4]',
  }

  // Position configurations
  const positionClasses = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  }

  // Spacing configurations - "respiro" between elements
  const spacingClasses = {
    hero: 'py-8 md:py-16',
    fullscreen: 'py-0',
    large: 'py-16 md:py-24',
    medium: 'py-12 md:py-20',
    small: 'py-8 md:py-16',
  }

  // Fullscreen layout
  if (size === 'fullscreen') {
    return (
      <section 
        ref={ref}
        className="relative h-[140vh] overflow-hidden"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ scale, opacity }}
          >
            <motion.img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              style={{ y }}
            />
          </motion.div>
          
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-nuro-black/50 via-transparent to-nuro-black/80 pointer-events-none" />
          
          {/* Caption */}
          {caption && (
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center px-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeApple }}
              viewport={{ once: true }}
            >
              <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/60">
                {caption}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    )
  }

  // Standard image layout
  return (
    <div className={`px-6 md:px-12 lg:px-20 ${spacingClasses[size]}`}>
      <motion.figure
        ref={ref}
        className={`relative overflow-hidden rounded-lg ${sizeClasses[size]} ${positionClasses[position]}`}
        style={{ y, scale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: easeApple }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-nuro-black/30 via-transparent to-transparent pointer-events-none" />
      </motion.figure>
    </div>
  )
}

export default EditorialImage
