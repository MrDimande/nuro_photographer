/**
 * Admin Dashboard Page
 * 
 * Protected page for managing contacts and availability
 */

import { AnimatePresence, motion } from 'framer-motion'
import {
    ArrowLeft,
    Calendar,
    Check,
    ChevronLeft,
    ChevronRight,
    Inbox,
    LogOut,
    Mail,
    Phone,
    RefreshCw,
    X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { availability, contactSubmissions, getCurrentUser, signIn, signOut, supabase } from '../lib/supabase'

const appleEase = [0.25, 0.1, 0.25, 1]

// Login Component
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await signIn(email, password)
    
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    onLogin(data.user)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-nuro-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
          <p className="text-white/50">Nuro Photographer</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                placeholder="admin@nuro.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-white text-nuro-black font-semibold disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'A entrar...' : 'Entrar'}
          </motion.button>
        </form>

        <Link to="/" className="block text-center mt-6 text-white/40 hover:text-white/60 text-sm">
          ← Voltar ao site
        </Link>
      </motion.div>
    </div>
  )
}

// Contacts Table Component
const ContactsTable = ({ contacts, onRefresh, loading }) => {
  const [selectedContact, setSelectedContact] = useState(null)

  const statusColors = {
    new: 'bg-green-500',
    read: 'bg-blue-500',
    replied: 'bg-gray-400',
    archived: 'bg-gray-600',
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Inbox size={20} className="text-nuro-black" />
          <h2 className="text-lg font-bold text-nuro-black">Mensagens</h2>
          <span className="bg-nuro-black text-white text-xs px-2 py-1 rounded-full">
            {contacts.filter(c => c.status === 'new').length} novos
          </span>
        </div>
        <motion.button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 rounded-lg hover:bg-gray-100"
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </motion.button>
      </div>

      <div className="divide-y divide-gray-100">
        {contacts.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            Nenhuma mensagem ainda
          </div>
        ) : (
          contacts.map((contact) => (
            <motion.div
              key={contact.id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${statusColors[contact.status]}`} />
                  <div>
                    <p className="font-medium text-nuro-black">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {new Date(contact.created_at).toLocaleDateString('pt-PT')}
                  </p>
                  {contact.service && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {contact.service}
                    </span>
                  )}
                </div>
              </div>
              {contact.message && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {contact.message}
                </p>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Contact Detail Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{selectedContact.name}</h3>
                <button onClick={() => setSelectedContact(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} />
                  <a href={`mailto:${selectedContact.email}`} className="hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                {selectedContact.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} />
                    <a href={`tel:${selectedContact.phone}`} className="hover:underline">
                      {selectedContact.phone}
                    </a>
                  </div>
                )}
                {selectedContact.service && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={18} />
                    <span>{selectedContact.service}</span>
                  </div>
                )}
                {selectedContact.message && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                <a
                  href={`https://wa.me/${selectedContact.phone?.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-4 bg-green-500 text-white rounded-xl text-center font-medium"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="flex-1 py-2 px-4 bg-nuro-black text-white rounded-xl text-center font-medium"
                >
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Availability Manager Component
const AvailabilityManager = ({ availabilityData, onUpdate, loading }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState('busy')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const handleDateClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDate(dateStr)
    // Get current status if exists
    if (availabilityData[dateStr]) {
      setSelectedStatus(availabilityData[dateStr])
    } else {
      setSelectedStatus('busy')
    }
  }

  const handleUpdateAvailability = async () => {
    if (!selectedDate) return
    await onUpdate(selectedDate, selectedStatus)
    setSelectedDate(null)
  }

  const getDateStatus = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return availabilityData[dateStr] || null
  }

  const statusStyles = {
    free: 'bg-white border-gray-200 text-nuro-black',
    partial: 'bg-gray-200 border-gray-300 text-nuro-black',
    busy: 'bg-nuro-black border-nuro-black text-white',
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar size={20} className="text-nuro-black" />
          <h2 className="text-lg font-bold text-nuro-black">Disponibilidade</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={18} />
          </button>
          <span className="font-medium">{monthNames[month]} {year}</span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const status = getDateStatus(day)
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const isSelected = selectedDate === dateStr

            return (
              <motion.button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`
                  h-10 rounded-lg border text-sm font-medium transition-all
                  ${status ? statusStyles[status] : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}
                  ${isSelected ? 'ring-2 ring-blue-500' : ''}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {day}
              </motion.button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-white border border-gray-200" />
            <span className="text-gray-500">Livre</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gray-200" />
            <span className="text-gray-500">Parcial</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-nuro-black" />
            <span className="text-gray-500">Ocupado</span>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">
                {selectedDate.split('-').reverse().join('/')}
              </h3>

              <div className="space-y-2">
                {['free', 'partial', 'busy'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`
                      w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between
                      ${selectedStatus === status ? 'border-nuro-black bg-gray-50' : 'border-gray-200'}
                    `}
                  >
                    <span className="capitalize">{status === 'free' ? 'Livre' : status === 'partial' ? 'Parcial' : 'Ocupado'}</span>
                    {selectedStatus === status && <Check size={18} />}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setSelectedDate(null)}
                  className="flex-1 py-2 px-4 border border-gray-200 rounded-xl font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateAvailability}
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-nuro-black text-white rounded-xl font-medium disabled:opacity-50"
                >
                  {loading ? 'A guardar...' : 'Guardar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main Admin Page
const Admin = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState([])
  const [availabilityData, setAvailabilityData] = useState({})
  const [refreshing, setRefreshing] = useState(false)
  const navigate = useNavigate()

  // Check auth on mount
  useEffect(() => {
    checkAuth()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Load data when authenticated
  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }

  const loadData = async () => {
    setRefreshing(true)
    
    // Load contacts
    const { data: contactsData } = await contactSubmissions.getAll()
    if (contactsData) setContacts(contactsData)
    
    // Load availability
    const { data: availData } = await availability.getAll()
    if (availData) {
      const map = {}
      availData.forEach(item => {
        map[item.date] = item.status
      })
      setAvailabilityData(map)
    }
    
    setRefreshing(false)
  }

  const handleUpdateAvailability = async (date, status) => {
    setRefreshing(true)
    
    // 1. Update in Supabase
    await availability.upsert(date, status)
    
    // 2. Sync with Google Calendar (non-blocking)
    try {
      await fetch('/api/calendar-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, status }),
      })
      console.log('Google Calendar synced')
    } catch (err) {
      console.warn('Calendar sync failed (non-blocking):', err)
    }
    
    await loadData()
  }

  const handleLogout = async () => {
    await signOut()
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-nuro-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <AdminLogin onLogin={setUser} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-400 hover:text-nuro-black">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-nuro-black">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContactsTable 
            contacts={contacts} 
            onRefresh={loadData} 
            loading={refreshing} 
          />
          <AvailabilityManager
            availabilityData={availabilityData}
            onUpdate={handleUpdateAvailability}
            loading={refreshing}
          />
        </div>
      </main>
    </div>
  )
}

export default Admin
