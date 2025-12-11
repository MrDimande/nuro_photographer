/**
 * FAQSection - Light Theme Editorial Design
 * 
 * Clean, sophisticated Q&A on white background
 * Magazine-inspired layout
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const appleEase = [0.25, 0.1, 0.25, 1]

// FAQ Data - Personal, conversational tone
const faqs = [
  {
    id: 1,
    question: 'Como funciona o processo?',
    answer: 'Tudo começa com uma conversa. Quero entender a tua visão, o que te inspira, o que queres transmitir. Depois, criamos juntos – seja um retrato íntimo ou uma produção completa. O meu papel é traduzir a tua essência em imagens.'
  },
  {
    id: 2,
    question: 'Quanto tempo até receber as fotos?',
    answer: 'Cada projecto é tratado com dedicação. Sessões de retrato: 1-2 semanas. Eventos: 3-4 semanas. Mas sempre envio uma prévia nas primeiras 48 horas – porque sei que a ansiedade de ver o resultado é parte da experiência.'
  },
  {
    id: 3,
    question: 'Trabalhas fora de Maputo?',
    answer: 'A arte não conhece fronteiras. Trabalho em todo o Moçambique e além. Já capturei histórias em Inhambane, Pemba, Lisboa, Dubai. Onde houver uma história para contar, eu vou.'
  },
  {
    id: 4,
    question: 'Vídeo e drone também?',
    answer: 'Sim. A fotografia congela momentos; o vídeo dá-lhes vida. O drone revela perspectivas impossíveis. Quando combinados, criam experiências visuais completas. É assim que gosto de trabalhar.'
  },
  {
    id: 5,
    question: 'Qual o investimento?',
    answer: 'Cada projecto é único, cada orçamento é personalizado. Retratos a partir de 5.000 MT, eventos desde 15.000 MT. Projectos comerciais e editoriais são orçados individualmente. Falemos – o valor depende da visão.'
  },
]

// FAQ Item
const FAQItem = ({ faq, isOpen, onClick, index }) => {
  return (
    <motion.div
      className="border-b border-nuro-black/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ease: appleEase }}
    >
      <button
        onClick={onClick}
        className="w-full py-8 flex items-start justify-between text-left group"
      >
        {/* Number */}
        <span className="text-nuro-dark/20 text-sm font-mono mr-8 mt-1">
          0{faq.id}
        </span>

        {/* Question */}
        <span className="flex-1 text-xl md:text-2xl text-nuro-black group-hover:text-nuro-dark/70 transition-colors pr-8">
          {faq.question}
        </span>

        {/* Indicator */}
        <motion.span
          className="text-2xl text-nuro-dark/40"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: appleEase }}
            className="overflow-hidden"
          >
            <p className="pb-8 pl-12 md:pl-16 pr-12 text-nuro-dark/60 leading-relaxed max-w-2xl text-lg italic">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQSection = () => {
  const [openId, setOpenId] = useState(1)

  return (
    <section className="py-24 md:py-40 px-4 md:px-12 lg:px-20 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-baseline gap-6">
            <span 
              className="text-8xl md:text-9xl font-bold text-nuro-black/5"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              ?
            </span>
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold text-nuro-black mb-2"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                Perguntas
              </h2>
              <p className="text-nuro-dark/50 text-sm italic">
                As dúvidas mais comuns, respondidas com honestidade
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="border-t border-nuro-black/10">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={index}
              isOpen={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
