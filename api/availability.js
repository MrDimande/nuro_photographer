/**
 * Availability API Endpoint
 * 
 * GET /api/availability
 * Returns availability data for the calendar
 * 
 * Query params:
 * - year: number (optional, defaults to current year)
 * - month: number (optional, 1-12)
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { year, month } = req.query
    
    let query = supabase
      .from('availability')
      .select('date, status, note')

    // Filter by year/month if provided
    if (year && month) {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`
      const nextMonth = parseInt(month) === 12 ? 1 : parseInt(month) + 1
      const nextYear = parseInt(month) === 12 ? parseInt(year) + 1 : parseInt(year)
      const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`
      
      query = query.gte('date', startDate).lt('date', endDate)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ 
        error: 'Failed to fetch availability' 
      })
    }

    // Transform to object format for easy lookup
    const availabilityMap = {}
    data.forEach(item => {
      availabilityMap[item.date] = item.status
    })

    return res.status(200).json({
      success: true,
      data: availabilityMap,
      raw: data,
    })

  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
}
