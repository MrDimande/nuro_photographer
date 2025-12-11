/**
 * VideoShowreel - Light Theme Design
 * 
 * Showreel on light background
 * Video container stands out as featured element
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

const VideoShowreel = () => {
  const containerRef = useRef(null)
  const mediaRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  // Toggle animation
  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.src = '/560914308_18404954155184208_4058324071045245347_n.jpg'
      } else {
        mediaRef.current.src = '/AQMkaXuAPmJyMY0h-jTJasHRC_qRgTmXPXPxm0Dfe8xtjR72OBUPCC2FlqTG7F5pifUE5eQa0Pt6QwDfqnGwLdfQcC9YMsmQ1uzY.gif?' + Date.now()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-40 px-4 md:px-12 lg:px-20 bg-gradient-to-b from-white to-[#f5f5f5]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-baseline gap-4 md:gap-6 mb-2">
            <span 
              className="text-6xl md:text-8xl font-bold text-nuro-black/5"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              —
            </span>
            <div>
              <h2 
                className="text-2xl md:text-4xl font-bold text-nuro-black"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                Em Movimento
              </h2>
              <p className="text-nuro-dark/50 text-xs md:text-sm mt-1 italic">
                Onde a fotografia encontra a narrativa cinematográfica
              </p>
            </div>
          </div>
        </motion.div>

        {/* Video Container - Dark container on light page */}
        <motion.div
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group shadow-2xl shadow-black/20 bg-nuro-black"
          style={{ 
            scale,
            aspectRatio: '16/9',
          }}
          onClick={togglePlay}
        >
          {/* GIF/Video Display */}
          <img
            ref={mediaRef}
            src="/AQMkaXuAPmJyMY0h-jTJasHRC_qRgTmXPXPxm0Dfe8xtjR72OBUPCC2FlqTG7F5pifUE5eQa0Pt6QwDfqnGwLdfQcC9YMsmQ1uzY.gif"
            alt="Nuro De Sousa - Showreel 2024"
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Subtle grain overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)'
          }} />

          {/* Top/Bottom gradients */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {/* Play/Pause Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? 0 : 1 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-md bg-black/30"
              whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.8)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause size={28} className="text-white" />
              ) : (
                <Play size={28} className="text-white ml-1" />
              )}
            </motion.div>
          </motion.div>

          {/* Bottom left info */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
            <p className="text-white text-sm md:text-base font-medium">Showreel 2024</p>
            <p className="text-white/50 text-xs">Fotografia • Vídeo • Drone</p>
          </div>

          {/* Bottom right status */}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-white/50'}`} />
              <span className="text-white/70 text-xs font-medium">
                {isPlaying ? 'A reproduzir' : 'Pausado'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p 
          className="text-nuro-dark/40 text-xs md:text-sm text-center mt-6 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Uma compilação dos melhores momentos capturados em 2024
        </motion.p>
      </div>
    </section>
  )
}

export default VideoShowreel
