/**
 * SectionWrapper Component
 * 
 * Reusable section wrapper with consistent padding and animations.
 * Provides entrance animations when scrolling into view.
 */

import { motion } from 'framer-motion'

const SectionWrapper = ({ 
  children, 
  id, 
  className = '', 
  fullWidth = false,
  noPadding = false,
}) => {
  const paddingClasses = noPadding 
    ? '' 
    : 'py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20'
  
  const containerClasses = fullWidth 
    ? '' 
    : 'max-w-7xl mx-auto'

  return (
    <section 
      id={id}
      className={`relative ${paddingClasses} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className={containerClasses}
      >
        {children}
      </motion.div>
    </section>
  )
}

export default SectionWrapper
