/**
 * Lenis Smooth Scroll Hook
 * Apple-like inertia scrolling with natural physics
 * 
 * Integrates with Framer Motion for seamless scroll-driven animations
 */

import Lenis from '@studio-freight/lenis'
import { useEffect, useRef } from 'react'

// Global Lenis instance for external access
let lenisInstance = null

export const getLenis = () => lenisInstance

export const useLenis = (options = {}) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis with Apple-style physics
    const lenis = new Lenis({
      duration: 1.2,                    // Smooth duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      ...options
    })

    lenisRef.current = lenis
    lenisInstance = lenis

    // Animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisRef
}

export default useLenis
