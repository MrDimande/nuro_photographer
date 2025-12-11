/**
 * BlogPreview - "Histórias" Visual Narratives
 * 
 * Real stories told through photography
 * Each story uses related photos to tell a narrative
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const appleEase = [0.25, 0.1, 0.25, 1]

// Stories - Real narratives with photos
const stories = [
  {
    id: 1,
    number: '01',
    title: 'A Formatura do Casal B&B',
    subtitle: 'Uma história de amor que começou na faculdade',
    excerpt: 'Quatro anos de dedicação, um beijo roubado num show do Hot Blaze, e um amor que floresceu nos corredores da universidade. Betinho e Becky formaram-se juntos em 2025.',
    image: '/casal_bb_beijo.jpg',
    category: 'Formaturas',
    link: '/historias/casal-bb',
  },
  {
    id: 2,
    number: '02',
    title: 'Amor ao Entardecer',
    subtitle: 'O casamento da Ana e do Pedro',
    excerpt: 'Escolheram o pôr-do-sol de Maputo como testemunha. Quando a luz dourada tocou o rosto da Ana, o Pedro esqueceu-se de respirar. "É agora", sussurrei antes de clicar.',
    image: '/550942850_18402487996184208_2384939623492755185_n.jpg',
    category: 'Casamentos',
    link: '/historias/2',
  },
  {
    id: 3,
    number: '03',
    title: 'O Poder do Retrato',
    subtitle: 'Quando a vulnerabilidade se torna arte',
    excerpt: 'Ela disse que não gostava de fotos. Duas horas depois, chorava de emoção ao ver-se através da minha lente. Um retrato não captura um rosto — captura uma alma.',
    image: '/561181985_18404954164184208_5407017860984878282_n.jpg',
    category: 'Retratos',
    link: '/historias/3',
  },
]

// Story Card Component
const StoryCard = ({ story, index }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <motion.article
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: appleEase }}
    >
      {/* Image with parallax */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 cursor-pointer">
        <motion.img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
          style={{ y }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Number watermark */}
        <span 
          className="absolute top-6 left-6 text-white/10 text-7xl font-bold"
          style={{ fontFamily: "'Permanent Marker', cursive" }}
        >
          {story.number}
        </span>

        {/* Category badge */}
        <div className="absolute top-6 right-6">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-nuro-black">
            {story.category}
          </span>
        </div>

        {/* Read indicator */}
        <motion.div
          className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUpRight size={20} className="text-white" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-1">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-nuro-black mb-1 group-hover:text-nuro-dark/70 transition-colors">
          {story.title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-nuro-dark/50 text-sm italic mb-4">
          {story.subtitle}
        </p>

        {/* Excerpt */}
        <p className="text-nuro-dark/60 leading-relaxed text-sm md:text-base">
          {story.excerpt}
        </p>

        {/* Read more */}
        <motion.span 
          className="inline-flex items-center gap-2 text-nuro-black font-medium mt-4 text-sm group-hover:gap-3 transition-all cursor-pointer"
          whileHover={{ x: 5 }}
        >
          Ler história completa
          <ArrowUpRight size={14} />
        </motion.span>
      </div>
    </motion.article>
  )
}

const BlogPreview = () => {
  return (
    <section className="py-24 md:py-40 px-4 md:px-12 lg:px-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex items-baseline gap-6">
              <span 
                className="text-8xl md:text-9xl font-bold text-nuro-black/5"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                ✦
              </span>
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-bold text-nuro-black"
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                  Histórias
                </h2>
                <p className="text-nuro-dark/50 text-sm italic mt-1">
                  Por trás de cada foto, existe uma vida inteira
                </p>
              </div>
            </div>

            <Link to="/historias">
              <motion.span
                className="text-nuro-dark/50 hover:text-nuro-black transition-colors text-sm uppercase tracking-widest flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                Ver todas
                <ArrowUpRight size={14} />
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stories.map((story, index) => (
            <Link to={story.link} key={story.id}>
              <StoryCard story={story} index={index} />
            </Link>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="text-center mt-20 md:mt-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-nuro-dark/30 text-sm italic max-w-md mx-auto">
            "Não capturo fotos. Capturo fragmentos de vidas que merecem ser lembradas."
          </p>
          <p className="text-nuro-dark/20 text-xs mt-2">— Nuro De Sousa</p>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogPreview
