/**
 * História: A Formatura do Casal B&B
 * 
 * Uma história de amor que começou nos corredores da faculdade
 */

import { motion } from 'framer-motion'
import { ArrowLeft, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const appleEase = [0.25, 0.1, 0.25, 1]

const HistoriaBB = () => {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <motion.img
          src="/casal_bb_beijo.jpg"
          alt="Casal B&B - O Beijo da Formatura"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: appleEase }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Back button */}
        <Link to="/" className="absolute top-8 left-8 z-20">
          <motion.div 
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Voltar</span>
          </motion.div>
        </Link>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-white/60 text-sm uppercase tracking-widest">História 01</span>
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mt-4"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              A Formatura do<br />Casal B&B
            </h1>
            <p className="text-white/70 text-lg md:text-xl mt-4 max-w-xl italic">
              Betinho & Becky — Uma história que começou com uma pergunta e terminou com um beijo roubado
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-24">
        
        {/* Opening */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl text-nuro-black leading-relaxed font-light">
            Algumas histórias de amor começam com um olhar. Outras com um sorriso. 
            A deles começou com uma pergunta simples:
          </p>
          <p className="text-3xl md:text-4xl text-nuro-black mt-8 font-medium italic">
            "Isto aqui é a sala de Planeamento e Ordenamento Territorial?"
          </p>
        </motion.div>

        {/* Chapter 1 */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-widest text-nuro-dark/40 mb-6">
            Março de 2019 — O Primeiro Dia
          </h2>
          
          <div className="space-y-6 text-lg text-nuro-dark/80" style={{ textAlign: 'justify', lineHeight: '1.5' }}>
            <p>
              Era o primeiro dia de faculdade. Alberto ou <strong>Betinho</strong>, como toda a gente o conhece 
              entrou naquele corredor enorme com o coração a bater forte. Não sabia onde ficava a sala, 
              não conhecia ninguém, e o único pensamento na sua cabeça era: "Não te percas logo no primeiro dia."
            </p>
            
            <p>
              Foi aí que a viu. Uma rapariga com um sorriso confiante e um ar de quem já sabia exactamente 
              onde tudo ficava. <strong>Rabeca</strong> ou <strong>Becky</strong>, para os amigos.
            </p>
            
            <p>
              Ele aproximou-se, sem grandes expectativas. "Com licença... isto aqui é a sala do curso de 
              Planeamento e Ordenamento Territorial?"
            </p>
            
            <p>
              Ela olhou-o de cima a baixo. "Sim."
            </p>
            
            <p>
              E então, algo inesperado. "Já tens o horário?"
            </p>
            
            <p>
              "Não", respondeu ele.
            </p>
          </div>
        </motion.section>

        {/* The Bluetooth Moment */}
        <motion.div
          className="my-16 p-8 md:p-12 bg-[#f8f8f8] rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl text-nuro-black leading-relaxed italic">
            "Posso enviar-te o horário pelo WhatsApp..."
          </p>
          <p className="text-lg text-nuro-dark/60 mt-4">
            Ela hesitou. Olhou para o telemóvel. Olhou para ele. E mudou de ideias.
          </p>
          <p className="text-xl md:text-2xl text-nuro-black leading-relaxed italic mt-4">
            "Na verdade, activa o teu Bluetooth. Não te vou dar o meu número assim."
          </p>
          <p className="text-nuro-dark/50 text-sm mt-6">
            Naquele momento, Betinho não fazia ideia de que aquela recusa de partilhar um simples número 
            seria o início de tudo.
          </p>
        </motion.div>

        {/* Chapter 2 */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-widest text-nuro-dark/40 mb-6">
            O Segundo Dia — A Estratégia
          </h2>
          
          <div className="space-y-6 text-lg text-nuro-dark/80" style={{ textAlign: 'justify', lineHeight: '1.5' }}>
            <p>
              No dia seguinte, foi ela quem o abordou. Desta vez com uma pergunta diferente:
            </p>
            
            <p className="text-xl font-medium text-nuro-black">
              "Já tens grupo de estudo?"
            </p>
            
            <p>
              "Não..."
            </p>
            
            <p>
              Ela não esperou pela resposta completa.
            </p>
            
            <p className="text-xl font-medium text-nuro-black italic">
              "Óptimo. A partir de hoje, eu faço parte do teu grupo."
            </p>
            
            <p>
              E assim, sem pedir permissão, Becky entrou na vida dele. Com aquela prepotência suave 
              que só ela tinha. Com aquele sorriso que dizia "Eu sei o que quero."
            </p>
          </div>
        </motion.section>

        {/* Image Break */}
        <motion.div
          className="my-16 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <img 
            src="/casal_bb_formatura.jpg" 
            alt="Becky e Betinho - Dia da Formatura" 
            className="w-full aspect-[4/3] object-cover object-center"
          />
          <p className="text-center text-nuro-dark/40 text-sm mt-4 italic">
            Becky e Betinho Anos depois, no dia da formatura
          </p>
        </motion.div>

        {/* Chapter 3 */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-widest text-nuro-dark/40 mb-6">
            Os Meses Seguintes — O Jogo do Gato e do Rato
          </h2>
          
          <div className="space-y-6 text-lg text-nuro-dark/80" style={{ textAlign: 'justify', lineHeight: '1.5' }}>
            <p>
              Os dias passavam, e Becky não escondia as suas intenções. Sempre com jeito de brincadeira, 
              sempre com aquele riso que fazia toda a gente olhar. Mas para Betinho, tudo aquilo era... 
              impossível de levar a sério.
            </p>
            
            <p>
              Cada vez que ela dizia "Eu quero-te", ele respondia sempre da mesma forma:
            </p>
          </div>
        </motion.section>

        {/* Quote Block */}
        <motion.div
          className="my-16 border-l-4 border-nuro-black pl-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl text-nuro-black font-medium">
            "Eu não como carne de cão."
          </p>
          <p className="text-nuro-dark/50 text-sm mt-4">
            Uma referência estranha aos chineses, que ele usava para fugir da conversa. 
            Era a sua forma de dizer "não vai acontecer" sem saber que estava completamente errado.
          </p>
        </motion.div>

        {/* Chapter 4 */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-widest text-nuro-dark/40 mb-6">
            O Show do Hot Blaze — A Noite Que Mudou Tudo
          </h2>
          
          <div className="space-y-6 text-lg text-nuro-dark/80" style={{ textAlign: 'justify', lineHeight: '1.5' }}>
            <p>
              Num dia qualquer, Betinho comentou que queria ir ao show do cantor Hot Blaze. 
              Becky, como sempre, respondeu naturalmente:
            </p>
            
            <p className="text-xl font-medium text-nuro-black italic">
              "Também estava a pensar em ir."
            </p>
            
            <p>
              E foram. Juntos. Como "amigos" — entre aspas enormes.
            </p>
            
            <p>
              A música tocava, as pessoas dançavam, e Betinho — talvez pela primeira vez — 
              deixou escapar algo que não costumava dizer:
            </p>
          </div>
        </motion.section>

        {/* The Kiss Moment */}
        <motion.div
          className="my-16 p-8 md:p-12 bg-nuro-black text-white rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl leading-relaxed">
            "Hoje dá vontade de beijar alguém neste show."
          </p>
          
          <p className="text-white/60 mt-6">
            Becky olhou para ele. Directa, como sempre foi.
          </p>
          
          <p className="text-2xl md:text-3xl font-medium mt-4">
            "Só não beijas porque não queres."
          </p>
          
          <p className="text-white/50 mt-8 leading-relaxed">
            E sem esperar resposta, ela colocou-se à frente dele. 
            As luzes do palco iluminavam o seu rosto. A música enchia o ar.
          </p>
          
          <p className="text-2xl md:text-3xl font-medium mt-6 flex items-center gap-3">
            E roubou-lhe um beijo. <Heart size={24} className="text-red-400" />
          </p>
        </motion.div>

        {/* Continuation */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6 text-lg text-nuro-dark/80" style={{ textAlign: 'justify', lineHeight: '1.5' }}>
            <p>
              Naquele segundo, tudo mudou. A rapariga que ele achava impossível de levar a sério 
              tornou-se a única pessoa que ele conseguia ver. O "não como carne de cão" transformou-se 
              em "não consigo imaginar a vida sem ti."
            </p>
            
            <p>
              E assim começou. No meio de uma multidão, debaixo de luzes coloridas, 
              ao som da música que nenhum dos dois lembra qual era.
            </p>
          </div>
        </motion.section>

        {/* Final Image */}
        <motion.div
          className="my-16 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <img 
            src="/casal_bb_beijo.jpg" 
            alt="O beijo da formatura" 
            className="w-full aspect-[16/9] object-cover object-center"
          />
        </motion.div>

        {/* Epilogue */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-widest text-nuro-dark/40 mb-6">
            2025 — A Formatura
          </h2>
          
          <div className="space-y-6 text-lg text-nuro-dark/80" style={{ textAlign: 'justify', lineHeight: '1.5' }}>
            <p>
              Seis anos depois daquele primeiro dia, eles estavam de volta ao mesmo lugar. 
              Mas desta vez, não como caloiros nervosos à procura de uma sala.
            </p>
            
            <p>
              Desta vez, vestiam togas. Desta vez, seguravam diplomas. 
              Desta vez, olhavam um para o outro sabendo exactamente o que tinham construído juntos.
            </p>
            
            <p className="text-xl font-medium text-nuro-black">
              Noites sem dormir a estudar. Trabalhos entregues à última hora. 
              Discussões sobre quem ia fazer café. Reconciliações com beijos no intervalo das aulas.
            </p>
            
            <p>
              E naquele dia de formatura, quando os chapéus voaram para o ar, 
              Becky virou-se para Betinho e disse:
            </p>
          </div>
        </motion.section>

        {/* Final Quote */}
        <motion.div
          className="my-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span 
            className="text-[80px] md:text-[120px] text-nuro-black/5 block leading-none"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            "
          </span>
          <p 
            className="text-2xl md:text-4xl text-nuro-black -mt-8 md:-mt-12"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            Vês? Eu sabia desde o primeiro dia.
          </p>
          <p className="text-nuro-dark/50 mt-6 italic">
            E ele, pela primeira vez, não teve resposta. Apenas sorriu.
          </p>
        </motion.div>

        {/* Closing */}
        <motion.div
          className="border-t border-nuro-black/10 pt-12 mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-nuro-dark/40 text-sm">
            Fotografado por Nuro De Sousa — Maputo, 2025
          </p>
          <p className="text-nuro-dark/30 text-xs mt-2 italic">
            "Algumas histórias não precisam de palavras. Mas esta merecia ser contada."
          </p>
          
          <Link to="/">
            <motion.button
              className="mt-8 px-8 py-3 border border-nuro-black/20 rounded-full text-nuro-black hover:bg-nuro-black hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voltar ao Início
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </article>
  )
}

export default HistoriaBB
