/**
 * Contact Form API Endpoint
 * 
 * POST /api/contact
 * Receives contact form submissions and stores them in Supabase
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, service, date, message } = req.body

    // Validation
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      })
    }

    // Insert into database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name,
        email,
        phone: phone || null,
        service: service || null,
        date: date || null,
        message: message || null,
        status: 'new',
        created_at: new Date().toISOString(),
      }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ 
        error: 'Failed to save contact submission' 
      })
    }

    // Success response
    return res.status(201).json({
      success: true,
      message: 'Contact submission received',
      data: data[0],
    })

  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
}
