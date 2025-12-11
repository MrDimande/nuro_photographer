/**
 * CategoryFilter Component
 * 
 * Filter buttons for portfolio categories.
 */

import { motion } from 'framer-motion'

const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-12">
      <FilterButton
        label="All"
        isActive={activeCategory === 'all'}
        onClick={() => onCategoryChange('all')}
      />
      {categories.map((category) => (
        <FilterButton
          key={category.id}
          label={category.label}
          isActive={activeCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </div>
  )
}

const FilterButton = ({ label, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`
      relative px-6 py-3 text-sm uppercase tracking-widest
      transition-colors duration-300
      ${isActive ? 'text-white' : 'text-nuro-muted hover:text-nuro-light'}
    `}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {label}
    {isActive && (
      <motion.div
        layoutId="activeFilter"
        className="absolute inset-0 border border-nuro-light rounded-full"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    )}
  </motion.button>
)

export default CategoryFilter
