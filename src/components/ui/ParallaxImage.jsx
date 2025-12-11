/**
 * ParallaxImage Component
 * 
 * Image with smooth parallax scrolling effect.
 * Uses Framer Motion for performance.
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ParallaxImage = ({ 
  src, 
  alt, 
  speed = 0.3,
  aspectRatio = '4/5',
  className = '',
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Parallax Y translation
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -100}px`, `${speed * 100}px`]
  )

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[120%] object-cover"
        loading="lazy"
      />
    </div>
  )
}

export default ParallaxImage
