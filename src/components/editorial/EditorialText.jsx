/**
 * EditorialText Component
 * 
 * Text with "breathing" animation - fade + slide imperceptible.
 * Light sweep effect for premium feel.
 * 
 * ✅ Editorial feel
 * ✅ Light sweep optional
 * ✅ Fade + slide impercetível
 */

import { motion } from 'framer-motion'

// Apple-style easing
const easeApple = [0.25, 0.1, 0.25, 1]

const EditorialText = ({ 
  text, 
  align = 'center',
  lightSweep = false,
}) => {
  const alignClasses = {
    left: 'text-left mr-auto',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <div className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
      <motion.div
        className={`max-w-3xl ${alignClasses[align]} ${lightSweep ? 'light-sweep' : ''}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: easeApple,
        }}
        viewport={{ once: true, margin: '-120px' }}
      >
        <p className="text-2xl md:text-3xl lg:text-4xl font-light text-nuro-light leading-relaxed tracking-tight">
          {text}
        </p>
      </motion.div>
    </div>
  )
}

export default EditorialText
