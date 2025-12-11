/**
 * Portfolio Page - Full Gallery View
 * 
 * Complete portfolio with all photos, filtering, and lightbox.
 */

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, X, ZoomIn } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioCategories, portfolioItems } from '../data/portfolioGrid'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

// Category Filter Tabs
const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-16">
      {portfolioCategories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            relative px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium
            transition-all duration-300
            ${activeCategory === category.id
              ? 'text-white'
              : 'text-nuro-dark/60 hover:text-nuro-dark bg-white/50 hover:bg-white/80'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeCategory === category.id && (
            <motion.div
              className="absolute inset-0 bg-nuro-black rounded-full"
              layoutId="activePortfolioCategory"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {category.label}
            <span className={`
              text-xs px-2 py-0.5 rounded-full
              ${activeCategory === category.id 
                ? 'bg-white/20 text-white' 
                : 'bg-nuro-black/10 text-nuro-dark/60'
              }
            `}>
              {category.count}
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  )
}

// Portfolio Item
const PortfolioItem = ({ item, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-1 row-span-1 md:row-span-2',
    large: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: appleEase }}
      className={`${sizeClasses[item.size] || 'col-span-1'} relative group cursor-pointer`}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full min-h-[250px] md:min-h-[300px] overflow-hidden rounded-2xl">
        <motion.img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: appleEase }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
            {item.title}
          </h3>
          <p className="text-white/70 text-sm capitalize">
            {item.category}
          </p>
        </motion.div>

        <motion.div
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ZoomIn size={18} className="text-nuro-black" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Lightbox Modal
const Lightbox = ({ item, onClose }) => {
  if (!item) return null

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.button
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
      >
        <X size={24} />
      </motion.button>

      <motion.div
        className="relative max-w-6xl max-h-[85vh] overflow-hidden rounded-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: appleEase }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-contain"
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white text-xl md:text-2xl font-semibold">
            {item.title}
          </h3>
          <p className="text-white/60 text-sm capitalize mt-1">
            {item.category} • Nuro De Sousa
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Main Portfolio Page
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white pt-24 pb-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/">
          <motion.div 
            className="inline-flex items-center gap-2 text-nuro-dark/60 hover:text-nuro-black transition-colors mb-8"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Voltar ao Início</span>
          </motion.div>
        </Link>

        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-nuro-black mb-4"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            Portfólio
          </h1>
          <p className="text-lg md:text-xl text-nuro-dark/60 max-w-2xl mx-auto">
            Uma colecção completa dos meus trabalhos, desde retratos a projectos artísticos.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[200px]"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <PortfolioItem
                key={item.id}
                item={item}
                index={index}
                onClick={setSelectedItem}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-nuro-dark/50 text-lg">
              Nenhuma foto nesta categoria ainda.
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio
