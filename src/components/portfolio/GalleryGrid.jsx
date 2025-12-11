/**
 * GalleryGrid Component
 * 
 * Masonry-style grid layout for portfolio images.
 * Supports filtering by category.
 */

import { AnimatePresence, motion } from 'framer-motion'
import PortfolioItem from './PortfolioItem'

const GalleryGrid = ({ 
  items,
  category = 'all',
  columns = 3,
}) => {
  // Filter items by category
  const filteredItems = category === 'all' 
    ? items 
    : items.filter(item => item.category === category)

  return (
    <div 
      className="grid gap-4 md:gap-6 lg:gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`
      }}
    >
      <AnimatePresence mode="popLayout">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className={item.featured ? 'md:col-span-2 md:row-span-2' : ''}
          >
            <PortfolioItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default GalleryGrid
