/**
 * Scroll Animation Utilities
 * Framer Motion hooks for parallax and scroll-driven effects
 * 
 * Apple-style easing: cubic-bezier(0.25, 0.1, 0.25, 1)
 */

import { useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Apple-style spring config for smooth, natural motion
export const appleSpring = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
}

/**
 * Parallax effect with depth layers
 * @param {number} speed - Parallax speed multiplier (0.1 = slow, 1 = normal)
 * @param {string} direction - 'up' or 'down'
 */
export const useParallax = (speed = 0.5, direction = 'up') => {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const multiplier = direction === 'up' ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier])
  const smoothY = useSpring(y, appleSpring)

  return { ref, y: smoothY, progress: scrollYProgress }
}

/**
 * Fade and slide reveal on scroll
 * Subtle, almost imperceptible entrance
 */
export const useFadeReveal = () => {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.4']
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])
  
  const smoothOpacity = useSpring(opacity, appleSpring)
  const smoothY = useSpring(y, appleSpring)

  return { ref, opacity: smoothOpacity, y: smoothY, progress: scrollYProgress }
}

/**
 * Scale reveal for images
 * Minimal scale change, elegant entrance
 */
export const useScaleReveal = (initialScale = 0.95) => {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [initialScale, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  
  const smoothScale = useSpring(scale, appleSpring)
  const smoothOpacity = useSpring(opacity, appleSpring)

  return { ref, scale: smoothScale, opacity: smoothOpacity, progress: scrollYProgress }
}

/**
 * Text reveal with stagger effect
 * For headlines and editorial text
 */
export const useTextReveal = () => {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.5']
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [30, 0])
  const blur = useTransform(scrollYProgress, [0, 1], [8, 0])
  
  const smoothOpacity = useSpring(opacity, appleSpring)
  const smoothY = useSpring(y, appleSpring)

  return { 
    ref, 
    opacity: smoothOpacity, 
    y: smoothY, 
    blur,
    progress: scrollYProgress 
  }
}

export default {
  useParallax,
  useFadeReveal,
  useScaleReveal,
  useTextReveal,
  appleSpring
}
