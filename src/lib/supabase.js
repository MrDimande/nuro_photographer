/**
 * Supabase Client Configuration
 * 
 * This file exports the Supabase client for use throughout the application.
 * The client uses the public anon key for frontend operations.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

// Auth helpers
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helpers
export const contactSubmissions = {
  create: async (data) => {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([data])
      .select()
    return { data: result, error }
  },
  
  getAll: async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },
  
  updateStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
    return { data, error }
  },
}

export const availability = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
    return { data, error }
  },
  
  getByMonth: async (year, month) => {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    const endDate = `${year}-${String(month + 1).padStart(2, '0')}-01`
    
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .gte('date', startDate)
      .lt('date', endDate)
    return { data, error }
  },
  
  upsert: async (date, status, note = '') => {
    const { data, error } = await supabase
      .from('availability')
      .upsert([{ date, status, note, updated_at: new Date().toISOString() }], {
        onConflict: 'date',
      })
      .select()
    return { data, error }
  },
  
  delete: async (date) => {
    const { error } = await supabase
      .from('availability')
      .delete()
      .eq('date', date)
    return { error }
  },
}

export default supabase
