/**
 * PortfolioItem Component
 * 
 * Individual portfolio image card with hover effects.
 */

import { motion } from 'framer-motion'
import { useState } from 'react'

const PortfolioItem = ({ 
  item,
  aspectRatio = '4/5',
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group"
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
        animate={{ 
          scale: isHovered ? 1.05 : 1 
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        loading="lazy"
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg md:text-xl font-medium text-white mb-1">
          {item.title}
        </h3>
        {item.category && (
          <span className="text-sm text-nuro-muted uppercase tracking-widest">
            {item.category}
          </span>
        )}
      </motion.div>

      {/* View Button */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white"
          >
            <path 
              d="M5 12H19M19 12L13 6M19 12L13 18" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PortfolioItem
