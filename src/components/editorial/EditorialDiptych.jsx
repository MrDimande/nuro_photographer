/**
 * EditorialDiptych Component
 * 
 * Two images side by side with synchronized parallax.
 * Opposite movement directions for depth illusion.
 */

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Apple-style easing
const easeApple = [0.25, 0.1, 0.25, 1]

const EditorialDiptych = ({ 
  images,
  speed = 0.15,
}) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Opposite parallax for depth illusion
  const leftY = useTransform(smoothProgress, [0, 1], [80, -80])
  const rightY = useTransform(smoothProgress, [0, 1], [-40, 40])
  
  // Subtle rotation for organic feel
  const leftRotate = useTransform(smoothProgress, [0, 1], [-1.5, 1.5])
  const rightRotate = useTransform(smoothProgress, [0, 1], [1.5, -1.5])

  return (
    <div 
      ref={ref}
      className="px-6 md:px-12 lg:px-20 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
        {images.map((image, index) => (
          <motion.figure
            key={index}
            className="relative overflow-hidden rounded-lg aspect-[4/5]"
            style={{ 
              y: index === 0 ? leftY : rightY,
              rotate: index === 0 ? leftRotate : rightRotate,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              ease: easeApple,
            }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
              loading="lazy"
            />
            
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-nuro-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.figure>
        ))}
      </div>
    </div>
  )
}

export default EditorialDiptych
