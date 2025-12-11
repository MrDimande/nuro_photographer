/**
 * FinalCTA - Light Theme Artistic Call-to-Action
 * 
 * Personal invitation on white background
 * Matches light theme aesthetic
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const FinalCTA = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden bg-gradient-to-b from-[#f5f5f5] to-white"
    >
      {/* Background image with parallax - subtle */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <img 
          src="/561181985_18404954164184208_5407017860984878282_n.jpg" 
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Decorative line */}
        <motion.div 
          className="w-px h-16 bg-gradient-to-b from-transparent via-nuro-black/20 to-transparent mx-auto mb-12"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Quote mark */}
        <span 
          className="text-[100px] md:text-[150px] leading-none text-nuro-black/5 block"
          style={{ fontFamily: "'Permanent Marker', cursive" }}
        >
          "
        </span>

        {/* Main text */}
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl text-nuro-black leading-tight -mt-12 md:-mt-20"
          style={{ fontFamily: "'Permanent Marker', cursive" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Cada história merece
          <br />
          <span className="text-nuro-dark/40">ser contada</span>
        </motion.h2>

        <motion.p
          className="text-nuro-dark/50 text-lg md:text-xl mt-8 mb-12 max-w-xl mx-auto italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Vamos descobrir a tua juntos.
        </motion.p>

        {/* CTA Button - Minimal, elegant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/contact">
            <motion.button
              className="group relative px-12 py-5 text-nuro-black font-medium overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Border */}
              <span className="absolute inset-0 border-2 border-nuro-black/30 group-hover:border-nuro-black transition-colors" />
              
              {/* Fill on hover */}
              <motion.span 
                className="absolute inset-0 bg-nuro-black"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              
              {/* Text */}
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Iniciar Conversa
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Signature */}
        <motion.p
          className="text-nuro-dark/30 text-sm mt-16 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          — Nuro De Sousa
        </motion.p>
      </div>
    </section>
  )
}

export default FinalCTA
