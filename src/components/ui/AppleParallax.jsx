/**
 * AppleParallax Component
 * 
 * Premium Apple-style parallax with multi-layer depth,
 * scroll-driven animations, and smooth easing.
 * 
 * Features:
 * - Multiple depth layers with different scroll speeds
 * - Smooth 60fps performance
 * - Apple-style cubic easing
 * - Light sweep effects
 */

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

/**
 * Multi-layer Parallax Container
 * Creates depth illusion with multiple speed layers
 */
export const ParallaxDepth = ({ 
  children, 
  className = '',
  speed = 0.5,
  direction = 'up', // 'up', 'down', 'left', 'right'
  scale = false,
  opacity = false,
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Smooth spring for premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Direction-based transforms
  const yRange = direction === 'up' ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
  const xRange = direction === 'left' ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]

  const y = useTransform(smoothProgress, [0, 1], direction === 'up' || direction === 'down' ? yRange : [0, 0])
  const x = useTransform(smoothProgress, [0, 1], direction === 'left' || direction === 'right' ? xRange : [0, 0])
  const scaleValue = useTransform(smoothProgress, [0, 0.5, 1], scale ? [0.95, 1, 0.95] : [1, 1, 1])
  const opacityValue = useTransform(smoothProgress, [0, 0.2, 0.8, 1], opacity ? [0, 1, 1, 0] : [1, 1, 1, 1])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, x, scale: scaleValue, opacity: opacityValue }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Full-Screen Parallax Section
 * Apple-style product reveal section
 */
export const FullScreenParallax = ({
  image,
  alt,
  children,
  overlay = true,
  className = '',
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  })

  // Image parallax - moves slower than scroll
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '30%'])
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.1])
  
  // Content reveal
  const contentOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const contentY = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60])

  return (
    <section 
      ref={ref}
      className={`relative h-[150vh] overflow-hidden ${className}`}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Image Layer */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient Overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-nuro-black/40 via-transparent to-nuro-black" />
        )}

        {/* Content Layer */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Floating Element
 * Subtle floating animation for 3D depth
 */
export const FloatingElement = ({
  children,
  className = '',
  intensity = 1,
  delay = 0,
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20
  })

  const y = useTransform(smoothProgress, [0, 0.5, 1], [30 * intensity, 0, -30 * intensity])
  const rotate = useTransform(smoothProgress, [0, 1], [-2 * intensity, 2 * intensity])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, rotate }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: appleEase }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Scale Reveal
 * Element scales up as it enters viewport
 */
export const ScaleReveal = ({
  children,
  className = '',
  delay = 0,
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Light Sweep Effect
 * Animated light beam passing over elements
 */
export const LightSweep = ({
  children,
  className = '',
  trigger = 'hover', // 'hover', 'scroll', 'auto'
  duration = 1.5,
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const sweepX = useTransform(scrollYProgress, [0, 1], ['-100%', '200%'])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      
      {/* Light beam overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: trigger === 'scroll' 
            ? undefined 
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          x: trigger === 'scroll' ? sweepX : undefined,
        }}
        initial={trigger === 'auto' ? { x: '-100%' } : undefined}
        animate={trigger === 'auto' ? { x: '200%' } : undefined}
        whileHover={trigger === 'hover' ? { x: ['−100%', '200%'] } : undefined}
        transition={{
          duration,
          ease: 'easeInOut',
          repeat: trigger === 'auto' ? Infinity : 0,
          repeatDelay: 3,
        }}
      >
        <div 
          className="w-1/3 h-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          }}
        />
      </motion.div>
    </div>
  )
}

/**
 * Glass Reflection Effect
 */
export const GlassReflection = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Glass reflection overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
        }}
      />
      
      {/* Top highlight */}
      <div 
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        }}
      />
    </div>
  )
}

export default {
  ParallaxDepth,
  FullScreenParallax,
  FloatingElement,
  ScaleReveal,
  LightSweep,
  GlassReflection,
}
