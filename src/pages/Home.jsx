/**
 * Home Page
 * 
 * Complete visual portfolio experience with:
 * - Creative Hero Section
 * - Services Section
 * - Portfolio Preview
 * - Video Showreel
 * - Testimonials
 * - FAQ
 * - Blog Preview
 * - About Preview
 * - Final CTA
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HeroSection } from '../components/hero'
import { PortfolioGrid } from '../components/portfolio'
import { BlogPreview, FAQSection, FinalCTA, VideoShowreel } from '../components/sections'
import { ServicesSection } from '../components/services'
import {
    FadeIn,
    FloatingElement,
    LightSweep,
    StaggerReveal,
    TestimonialsSection,
} from '../components/ui'

/**
 * About Preview with Parallax Columns
 */
const AboutPreview = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const leftY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rightY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Text */}
          <motion.div style={{ y: leftY }}>
            <FloatingElement intensity={0.3}>
              <LightSweep trigger="scroll">
                <h2 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-nuro-black"
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                  Sobre
                </h2>
              </LightSweep>
              
              <div className="space-y-6 text-lg md:text-xl text-nuro-dark/70 leading-relaxed">
                <FadeIn delay={0.1}>
                  <p>
                    Nuro De Sousa é um contador de histórias visuais baseado em Maputo, Moçambique.
                    Fotógrafo, videógrafo e operador de drone com mais de uma década de experiência.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>
                    O seu trabalho explora a intersecção entre luz, emoção e narrativa,
                    capturando momentos que transcendem o ordinário.
                  </p>
                </FadeIn>
              </div>

              {/* CTA */}
              <motion.a
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-nuro-black font-medium hover:gap-4 transition-all"
                whileHover={{ x: 5 }}
              >
                Conhecer mais
                <span>→</span>
              </motion.a>
            </FloatingElement>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div 
            className="space-y-8"
            style={{ y: rightY }}
          >
            <StaggerReveal staggerDelay={0.1}>
              <div className="border-l-2 border-nuro-black/20 pl-6">
                <h3 className="text-sm uppercase tracking-widest text-nuro-dark/50 mb-2">
                  Especialidades
                </h3>
                <p className="text-lg text-nuro-dark">
                  Fotografia, Videografia, Drone, Eventos
                </p>
              </div>
              <div className="border-l-2 border-nuro-black/20 pl-6">
                <h3 className="text-sm uppercase tracking-widest text-nuro-dark/50 mb-2">
                  Clientes
                </h3>
                <p className="text-lg text-nuro-dark">
                  Empresas, Casamentos, Marcas, Artistas
                </p>
              </div>
              <div className="border-l-2 border-nuro-black/20 pl-6">
                <h3 className="text-sm uppercase tracking-widest text-nuro-dark/50 mb-2">
                  Baseado em
                </h3>
                <p className="text-lg text-nuro-dark">
                  Maputo, Moçambique
                </p>
              </div>
            </StaggerReveal>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Main Home Page
 */
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Services */}
      <ServicesSection />

      {/* Portfolio Grid */}
      <section id="work">
        <PortfolioGrid />
      </section>

      {/* Video Showreel */}
      <VideoShowreel />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Blog Preview */}
      <BlogPreview />

      {/* About Preview */}
      <AboutPreview />

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}

export default Home
