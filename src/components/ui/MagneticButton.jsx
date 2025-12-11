/**
 * MagneticButton Component
 * 
 * Button that follows cursor with magnetic attraction effect.
 * Creates premium, interactive feel.
 */

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const MagneticButton = ({ 
  children, 
  href,
  onClick,
  className = '',
  strength = 0.3,
}) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - left - width / 2) * strength
    const y = (clientY - top - height / 2) * strength
    setPosition({ x, y })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  const Component = href ? motion.a : motion.button

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </Component>
  )
}

export default MagneticButton
