/**
 * ScrollReveal Components
 * 
 * Advanced scroll-driven reveal animations
 * with Apple-style microanimations.
 */

import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

/**
 * Stagger Reveal Container
 * Children animate in sequence
 */
export const StaggerReveal = ({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up', // 'up', 'down', 'left', 'right'
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      ...directions[direction],
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: appleEase,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Array.isArray(children) 
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}

/**
 * Text Reveal - Character by character or word by word
 */
export const TextReveal = ({
  children,
  className = '',
  type = 'words', // 'words', 'chars', 'lines'
  delay = 0,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const text = typeof children === 'string' ? children : ''
  const elements = type === 'words' 
    ? text.split(' ') 
    : type === 'chars' 
      ? text.split('') 
      : [text]

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {elements.map((element, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: appleEase,
          }}
        >
          {element}
          {type === 'words' && ' '}
        </motion.span>
      ))}
    </span>
  )
}

/**
 * Scroll Progress Animation
 * Animation tied directly to scroll position
 */
export const ScrollProgress = ({
  children,
  className = '',
  animateFrom = { opacity: 0, y: 100, scale: 0.9 },
  animateTo = { opacity: 1, y: 0, scale: 1 },
  start = 'start end',
  end = 'center center',
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [start, end]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  const opacity = useTransform(smoothProgress, [0, 1], [animateFrom.opacity ?? 1, animateTo.opacity ?? 1])
  const y = useTransform(smoothProgress, [0, 1], [animateFrom.y ?? 0, animateTo.y ?? 0])
  const x = useTransform(smoothProgress, [0, 1], [animateFrom.x ?? 0, animateTo.x ?? 0])
  const scale = useTransform(smoothProgress, [0, 1], [animateFrom.scale ?? 1, animateTo.scale ?? 1])
  const rotate = useTransform(smoothProgress, [0, 1], [animateFrom.rotate ?? 0, animateTo.rotate ?? 0])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y, x, scale, rotate }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Fade Mask Reveal
 * Content reveals with gradient mask
 */
export const MaskReveal = ({
  children,
  className = '',
  direction = 'up', // 'up', 'down', 'left', 'right'
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const maskProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const gradientDirections = {
    up: 'to top',
    down: 'to bottom',
    left: 'to left',
    right: 'to right',
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage: `linear-gradient(${gradientDirections[direction]}, black ${maskProgress}, transparent ${maskProgress})`,
        WebkitMaskImage: `linear-gradient(${gradientDirections[direction]}, black ${maskProgress}, transparent ${maskProgress})`,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Parallax Text
 * Text that moves at different speed than scroll
 */
export const ParallaxText = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const range = direction === 'up' ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
  const y = useTransform(scrollYProgress, [0, 1], range)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Pin Section
 * Section stays pinned while content animates
 */
export const PinSection = ({
  children,
  className = '',
  pinHeight = '200vh',
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  return (
    <section 
      ref={ref}
      className={`relative ${className}`}
      style={{ height: pinHeight }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {typeof children === 'function' 
          ? children(scrollYProgress) 
          : children
        }
      </div>
    </section>
  )
}

export default {
  StaggerReveal,
  TextReveal,
  ScrollProgress,
  MaskReveal,
  ParallaxText,
  PinSection,
}
