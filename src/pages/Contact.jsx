/**
 * Contact Page - Modern Light Theme
 * 
 * Features:
 * - Modern contact form (submits to Supabase)
 * - Google Maps embed
 * - Business hours
 * - Availability Calendar (synced with Supabase)
 * - Service packages
 * - Admin integration
 */

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Calendar, Check, ChevronLeft, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone, Send, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAvailability from '../hooks/useAvailability'
import useContactForm from '../hooks/useContactForm'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

// Service packages
const services = [
  { id: 'portrait', name: 'Sessão Retrato', price: 'Desde 5.000 MT', duration: '2-3h' },
  { id: 'event', name: 'Cobertura de Evento', price: 'Desde 15.000 MT', duration: 'Dia completo', popular: true },
  { id: 'commercial', name: 'Fotografia Comercial', price: 'Sob consulta', duration: 'Customizado' },
  { id: 'editorial', name: 'Projecto Editorial', price: 'Sob consulta', duration: 'Multi-dia' },
]

// Business hours
const businessHours = [
  { day: 'Segunda - Sexta', hours: '08:00 - 18:00', available: true },
  { day: 'Sábado', hours: '09:00 - 14:00', available: true },
  { day: 'Domingo', hours: 'Fechado', available: false },
]

// Availability data (example - in production this would come from a backend)
const availabilityData = {
  // Format: 'YYYY-MM-DD': 'status' (free, busy, partial)
  '2024-12-14': 'busy',
  '2024-12-15': 'busy',
  '2024-12-20': 'partial',
  '2024-12-21': 'busy',
  '2024-12-24': 'busy',
  '2024-12-25': 'busy',
  '2024-12-26': 'busy',
  '2024-12-31': 'partial',
  '2025-01-01': 'busy',
}

// Portuguese month names
const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

// Availability Calendar Component
const AvailabilityCalendar = ({ onDateSelect, availabilityData = {} }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  // Get status for a specific date
  const getDateStatus = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const date = new Date(year, month, day)
    const dayOfWeek = date.getDay()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Past dates
    if (date < today) return 'past'
    
    // Sundays
    if (dayOfWeek === 0) return 'unavailable'
    
    // Check availability data from Supabase
    if (availabilityData[dateStr]) return availabilityData[dateStr]
    
    return 'free'
  }

  // Handle date click
  const handleDateClick = (day) => {
    const status = getDateStatus(day)
    if (status === 'past' || status === 'unavailable' || status === 'busy') return
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDate(dateStr)
    if (onDateSelect) {
      onDateSelect(dateStr, day, monthNames[month], year)
    }
  }

  // Generate calendar days
  const calendarDays = []
  
  // Empty cells before first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-11" />)
  }

  // Check if date is today
  const checkIsToday = (day) => {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const status = getDateStatus(day)
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const isSelected = selectedDate === dateStr
    const todayFlag = checkIsToday(day)
    
    const statusStyles = {
      free: 'bg-green-50 text-green-700 hover:bg-green-100 hover:shadow-md cursor-pointer border-green-200',
      partial: 'bg-amber-50 text-amber-700 hover:bg-amber-100 hover:shadow-md cursor-pointer border-amber-200',
      busy: 'bg-red-50 text-red-300 cursor-not-allowed border-red-100',
      unavailable: 'bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100',
      past: 'bg-white text-gray-200 cursor-not-allowed border-gray-50',
    }

    calendarDays.push(
      <motion.button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={status === 'past' || status === 'unavailable' || status === 'busy'}
        className={`
          relative h-11 w-full rounded-xl flex items-center justify-center text-sm font-semibold
          transition-all duration-200 border
          ${statusStyles[status]}
          ${isSelected ? 'ring-2 ring-nuro-black ring-offset-2 shadow-lg' : ''}
          ${todayFlag && !isSelected ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
        `}
        whileHover={status === 'free' || status === 'partial' ? { scale: 1.05, y: -2 } : {}}
        whileTap={status === 'free' || status === 'partial' ? { scale: 0.95 } : {}}
      >
        {day}
        {todayFlag && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500" />
        )}
        {status === 'free' && !isSelected && (
          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-green-500" />
        )}
      </motion.button>
    )
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-black/5 card-editorial"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: appleEase }}
    >
      {/* Premium Header */}
      <div className="bg-nuro-black px-6 py-5 md:px-8 md:py-6 light-sweep-dark calendar-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Calendar size={22} className="text-white" />
            </div>
            <div>
              <h3 
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                Disponibilidade
              </h3>
              <p className="text-xs text-white/60">Seleccione uma data</p>
            </div>
          </div>
          
          {/* Month Navigation */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={prevMonth}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={18} className="text-white" />
            </motion.button>
            <motion.button
              onClick={nextMonth}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={18} className="text-white" />
            </motion.button>
          </div>
        </div>
        
        {/* Current Month Display */}
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-white">
            {monthNames[month]}
          </p>
          <p className="text-sm text-white/50">{year}</p>
        </div>
      </div>

      {/* Calendar Body */}
      <div className="p-4 md:p-6">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {weekDays.map((day, i) => (
            <div 
              key={day} 
              className={`
                h-10 flex items-center justify-center text-xs font-bold uppercase tracking-wider
                ${i === 0 ? 'text-red-400' : 'text-nuro-dark/40'}
              `}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-green-700">Livre</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-50">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs font-medium text-yellow-700">Parcial</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="text-xs font-medium text-red-600">Ocupado</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100">
              <span className="w-3 h-3 rounded-full bg-gray-400" />
              <span className="text-xs font-medium text-gray-600">Fechado</span>
            </div>
          </div>
        </div>

        {/* Selected Date */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-nuro-black to-gray-800 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Data Seleccionada</p>
                  <p className="text-xl font-bold mt-1">{selectedDate.split('-').reverse().join(' / ')}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Check size={24} className="text-white" />
                </div>
              </div>
              <div 
                className="mt-3 pt-3 border-t border-white/10"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                }}
              >
                <p className="text-xs text-white/60 tracking-wide">
                  Preencha o formulário ao lado para solicitar esta data
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Contact Form Component - Now submits to Supabase
const ContactForm = ({ selectedService, setSelectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  })
  const { submitContact, loading: isSubmitting, success: isSubmitted, reset } = useContactForm()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted, preparing to send...')

    // Get service name
    const serviceName = services.find(s => s.id === selectedService)?.name || 'Não especificado'

    const payload = {
      name: formData.name,
      email: formData.email || 'não informado',
      phone: formData.phone,
      service: serviceName,
      date: formData.date,
      message: formData.message,
    }
    console.log('Payload:', payload)

    // Submit to Supabase
    const result = await submitContact(payload)
    console.log('Submit result:', result)

    if (result.success) {
      console.log('Success! Resetting form in 3 seconds...')
      // Reset form after 3 seconds
      setTimeout(() => {
        reset()
        setFormData({ name: '', email: '', phone: '', date: '', message: '' })
        setSelectedService(null)
      }, 3000)
    } else {
      console.error('Form submission failed:', result.error)
      // Alert user on error
      alert('Erro ao enviar mensagem: ' + (result.error || 'Tente novamente'))
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-black/5 border border-black/5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: appleEase }}
    >
      <h2 
        className="text-2xl md:text-3xl font-bold text-nuro-black mb-2"
        style={{ fontFamily: "'Permanent Marker', cursive" }}
      >
        Agendar Sessão
      </h2>
      <p className="text-nuro-dark/60 mb-8">
        Preencha o formulário e entrarei em contacto brevemente.
      </p>

      {/* Service Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-nuro-dark/60 mb-3">
          Seleccione o Serviço
        </label>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service.id)}
              className={`
                relative p-4 rounded-xl border-2 text-left transition-all
                ${selectedService === service.id
                  ? 'border-nuro-black bg-nuro-black/5'
                  : 'border-black/10 hover:border-black/20'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {service.popular && (
                <span className="absolute -top-2 right-2 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                  POPULAR
                </span>
              )}
              <p className="font-medium text-nuro-black text-sm">{service.name}</p>
              <p className="text-xs text-nuro-dark/50 mt-1">{service.price}</p>
              {selectedService === service.id && (
                <motion.div
                  className="absolute top-2 right-2 w-5 h-5 bg-nuro-black rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check size={12} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-nuro-dark/60 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-nuro-black focus:outline-none transition-all"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nuro-dark/60 mb-2">
              Telefone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-nuro-black focus:outline-none transition-all"
              placeholder="+258 84 XXX XXXX"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-nuro-dark/60 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-nuro-black focus:outline-none transition-all"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-nuro-dark/60 mb-2">
            Data Preferida
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-nuro-black focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-nuro-dark/60 mb-2">
            Mensagem
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-nuro-black focus:outline-none transition-all resize-none"
            placeholder="Descreva o seu projecto ou tire dúvidas..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`
          w-full mt-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all
          ${isSubmitted 
            ? 'bg-green-500 text-white' 
            : 'bg-nuro-black text-white hover:shadow-lg hover:shadow-black/20'
          }
        `}
        whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? (
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : isSubmitted ? (
          <>
            <Check size={20} />
            Enviado com Sucesso!
          </>
        ) : (
          <>
            Enviar Mensagem
            <Send size={18} />
          </>
        )}
      </motion.button>
    </motion.form>
  )
}

// Contact Info Card
const ContactInfoCard = () => (
  <motion.div
    className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5 border border-black/5"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1, ease: appleEase }}
  >
    <h3 
      className="text-xl font-bold text-nuro-black mb-6"
      style={{ fontFamily: "'Permanent Marker', cursive" }}
    >
      Contactos Directos
    </h3>

    <div className="space-y-4">
      {/* Phone */}
      <a
        href="tel:+258845146813"
        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
      >
        <div className="w-12 h-12 rounded-full bg-nuro-black flex items-center justify-center group-hover:scale-110 transition-transform">
          <Phone size={20} className="text-white" />
        </div>
        <div>
          <p className="font-medium text-nuro-black">+258 84 514 6813</p>
          <p className="text-sm text-nuro-dark/50">Telefone Principal</p>
        </div>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/258845146813"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
      >
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
          <MessageCircle size={20} className="text-white" />
        </div>
        <div>
          <p className="font-medium text-nuro-black">WhatsApp</p>
          <p className="text-sm text-green-600">Resposta rápida!</p>
        </div>
      </a>

      {/* Email */}
      <a
        href="mailto:nurosousa@gmail.com"
        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
      >
        <div className="w-12 h-12 rounded-full bg-nuro-black flex items-center justify-center group-hover:scale-110 transition-transform">
          <Mail size={20} className="text-white" />
        </div>
        <div>
          <p className="font-medium text-nuro-black">nurosousa@gmail.com</p>
          <p className="text-sm text-nuro-dark/50">Email</p>
        </div>
      </a>

      {/* Location */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
        <div className="w-12 h-12 rounded-full bg-nuro-black/10 flex items-center justify-center">
          <MapPin size={20} className="text-nuro-dark" />
        </div>
        <div>
          <p className="font-medium text-nuro-black">Maputo, Moçambique</p>
          <p className="text-sm text-nuro-dark/50">Disponível mundialmente</p>
        </div>
      </div>
    </div>
  </motion.div>
)

// Business Hours Card - Monochromatic
const BusinessHoursCard = () => (
  <motion.div
    className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5 border border-black/5 card-editorial"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2, ease: appleEase }}
  >
    <div className="flex items-center gap-3 mb-5">
      <Clock size={20} className="text-nuro-black" />
      <h3 className="text-sm font-bold text-nuro-black uppercase tracking-wider">
        Horário de Atendimento
      </h3>
    </div>

    <div className="space-y-2">
      {businessHours.map((item, index) => (
        <div 
          key={index}
          className={`
            flex items-center justify-between p-3 rounded-xl transition-colors
            ${item.available ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-50'}
          `}
        >
          <span className="font-medium text-nuro-black text-sm">{item.day}</span>
          <span className={`text-sm font-medium ${item.available ? 'text-nuro-dark/70' : 'text-nuro-dark/30'}`}>
            {item.hours}
          </span>
        </div>
      ))}
    </div>

    {/* Availability Status */}
    <div className="mt-4 p-3 rounded-xl bg-nuro-black flex items-center gap-3">
      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      <span className="text-xs font-medium text-white">
        Disponível para novos projectos
      </span>
    </div>
  </motion.div>
)

// Map Card with Coverage Areas - Monochromatic
const MapCard = () => (
  <motion.div
    className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-black/5 card-editorial"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3, ease: appleEase }}
  >
    <div className="relative h-48 md:h-56 grayscale hover:grayscale-0 transition-all duration-700">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57451.88821731!2d32.5!3d-25.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69723eb2a2dcf%3A0x4a4d9f2d76d0f4b2!2sMaputo%2C%20Mozambique!5e0!3m2!1sen!2s!4v1702300000000!5m2!1sen!2s"
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização - Maputo"
      />
    </div>
    
    {/* Coverage Areas */}
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={16} className="text-nuro-black" />
        <span className="text-xs font-bold text-nuro-black uppercase tracking-wider">Áreas de Cobertura</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {['Maputo Centro', 'Matola', 'Marracuene', 'Boane'].map((area) => (
          <span 
            key={area}
            className="text-xs px-3 py-1.5 rounded-full font-medium bg-nuro-black text-white"
          >
            {area}
          </span>
        ))}
        {['Nacional', 'Internacional'].map((area) => (
          <span 
            key={area}
            className="text-xs px-3 py-1.5 rounded-full font-medium bg-gray-100 text-nuro-dark/70"
          >
            {area}
          </span>
        ))}
      </div>
      <p className="text-xs text-nuro-dark/40 mt-3">
        Deslocações incluídas até 30km • Sob consulta para distâncias maiores
      </p>
    </div>
  </motion.div>
)

// Response Time Indicator - Monochromatic
const ResponseTimeCard = () => (
  <motion.div
    className="bg-white rounded-2xl p-5 border border-black/5 shadow-lg shadow-black/5 card-editorial"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.25, ease: appleEase }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-nuro-black flex items-center justify-center">
          <Clock size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-nuro-black">Tempo de Resposta</p>
          <p className="text-xs text-nuro-dark/50">Normalmente respondo em</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-3xl font-black text-nuro-black">2h</p>
        <p className="text-xs text-nuro-dark/40 uppercase tracking-wider">média</p>
      </div>
    </div>
    <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-nuro-black rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '95%' }}
        transition={{ duration: 1.5, delay: 0.5, ease: appleEase }}
      />
    </div>
    <p className="text-xs text-nuro-dark/50 mt-2">
      95% das mensagens respondidas em menos de 2 horas
    </p>
  </motion.div>
)

// Alternative Messaging Apps - Monochromatic
const AlternativeMessagingCard = () => (
  <motion.div
    className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5 border border-black/5 card-editorial"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.35, ease: appleEase }}
  >
    <h4 className="text-sm font-bold text-nuro-black mb-4 flex items-center gap-2">
      <MessageCircle size={16} />
      Outras Formas de Contacto
    </h4>
    
    <div className="grid grid-cols-2 gap-3">
      {/* Instagram */}
      <a
        href="https://instagram.com/nurophoto"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-nuro-black transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-nuro-black group-hover:bg-white flex items-center justify-center transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" className="fill-white group-hover:fill-nuro-black transition-colors">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-nuro-black group-hover:text-white transition-colors">Instagram</p>
          <p className="text-xs text-nuro-dark/50 group-hover:text-white/70 transition-colors">@nurophoto</p>
        </div>
      </a>

      {/* Telegram */}
      <a
        href="https://t.me/nurosousa"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-nuro-black transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-nuro-black group-hover:bg-white flex items-center justify-center transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" className="fill-white group-hover:fill-nuro-black transition-colors">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-nuro-black group-hover:text-white transition-colors">Telegram</p>
          <p className="text-xs text-nuro-dark/50 group-hover:text-white/70 transition-colors">@nurosousa</p>
        </div>
      </a>
    </div>
  </motion.div>
)

// Next Available Dates - Monochromatic
const NextAvailableDatesCard = ({ availabilityData = {} }) => {
  // Calculate next 3 available dates (excluding Sundays and busy dates)
  const getNextAvailableDates = () => {
    const dates = []
    const today = new Date()
    let checkDate = new Date(today)
    checkDate.setDate(checkDate.getDate() + 1) // Start from tomorrow

    while (dates.length < 3) {
      const dayOfWeek = checkDate.getDay()
      const dateStr = checkDate.toISOString().split('T')[0]
      
      // Skip Sundays and busy dates
      if (dayOfWeek !== 0 && !availabilityData[dateStr]) {
        dates.push({
          date: new Date(checkDate),
          dateStr,
          status: availabilityData[dateStr] || 'free'
        })
      }
      checkDate.setDate(checkDate.getDate() + 1)
    }
    return dates
  }

  const nextDates = getNextAvailableDates()
  const weekDayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <motion.div
      className="bg-white rounded-2xl p-5 border border-black/5 shadow-lg shadow-black/5 card-editorial"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: appleEase }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} className="text-nuro-black" />
        <h4 className="text-sm font-bold text-nuro-black">Próximas Datas Livres</h4>
      </div>

      <div className="space-y-2">
        {nextDates.map((item, i) => (
          <motion.div
            key={item.dateStr}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1, ease: appleEase }}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-nuro-black transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-nuro-black group-hover:bg-white text-white group-hover:text-nuro-black flex flex-col items-center justify-center transition-colors">
                <span className="text-[10px] font-medium uppercase">{weekDayNames[item.date.getDay()]}</span>
                <span className="text-sm font-bold leading-none">{item.date.getDate()}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-nuro-black group-hover:text-white transition-colors">
                  {item.date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' })}
                </p>
                <p className="text-xs text-nuro-dark/50 group-hover:text-white/60 transition-colors">Disponível</p>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs bg-white text-nuro-black px-3 py-1 rounded-full font-medium">
                Reservar
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-nuro-dark/40 mt-3 text-center">
        Clique numa data ou use o calendário acima
      </p>
    </motion.div>
  )
}

// Floating WhatsApp Button
const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 shadow-lg shadow-green-500/30 flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/10"
          >
            <div className="bg-green-500 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <div>
                <p className="text-white font-medium">Nuro De Sousa</p>
                <p className="text-white/70 text-sm">Responde em minutos</p>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 mb-4">
                <p className="text-nuro-dark text-sm">
                  Olá! 👋 Como posso ajudar com o seu projecto de fotografia?
                </p>
              </div>

              <a
                href="https://wa.me/258845146813?text=Olá! Gostaria de saber mais sobre os serviços de fotografia."
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-green-500 text-white text-center rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                Iniciar Conversa
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Main Contact Page
const Contact = () => {
  const [selectedService, setSelectedService] = useState(null)
  const { availabilityData, loading: loadingAvailability } = useAvailability()

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
            Contacto
          </h1>
          <p className="text-lg md:text-xl text-nuro-dark/60 max-w-2xl mx-auto">
            Vamos criar algo extraordinário juntos. Entre em contacto e agende a sua sessão.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Form */}
          <ContactForm selectedService={selectedService} setSelectedService={setSelectedService} />

          {/* Right - Info Cards */}
          <div className="space-y-6">
            <AvailabilityCalendar availabilityData={availabilityData} />
            <NextAvailableDatesCard availabilityData={availabilityData} />
            <ResponseTimeCard />
            <ContactInfoCard />
            <AlternativeMessagingCard />
            <BusinessHoursCard />
            <MapCard />
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}

export default Contact
