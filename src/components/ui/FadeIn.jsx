/**
 * FadeIn Component
 * 
 * Wrapper for fade-in entrance animations on scroll.
 * Supports various animation directions.
 */

import { motion } from 'framer-motion'

const variants = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
}

const FadeIn = ({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true,
  threshold = 0.1,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants[direction]}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
