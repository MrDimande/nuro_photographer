/**
 * Admin Availability API Endpoint
 * 
 * PUT /api/admin/availability
 * Updates availability for a specific date (requires auth)
 * 
 * Body:
 * - date: string (YYYY-MM-DD)
 * - status: string ('free', 'partial', 'busy')
 * - note: string (optional)
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Verify authentication
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  
  try {
    // Verify the token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // Handle PUT request (upsert availability)
    if (req.method === 'PUT') {
      const { date, status, note } = req.body

      // Validation
      if (!date || !status) {
        return res.status(400).json({ 
          error: 'Date and status are required' 
        })
      }

      const validStatuses = ['free', 'partial', 'busy']
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          error: 'Status must be one of: free, partial, busy' 
        })
      }

      // Date validation
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(date)) {
        return res.status(400).json({ 
          error: 'Date must be in YYYY-MM-DD format' 
        })
      }

      // Upsert availability
      const { data, error } = await supabase
        .from('availability')
        .upsert([{
          date,
          status,
          note: note || null,
          updated_at: new Date().toISOString(),
        }], {
          onConflict: 'date',
        })
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ 
          error: 'Failed to update availability' 
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Availability updated',
        data: data[0],
      })
    }

    // Handle DELETE request
    if (req.method === 'DELETE') {
      const { date } = req.body

      if (!date) {
        return res.status(400).json({ 
          error: 'Date is required' 
        })
      }

      const { error } = await supabase
        .from('availability')
        .delete()
        .eq('date', date)

      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ 
          error: 'Failed to delete availability' 
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Availability deleted',
      })
    }

    return res.status(405).json({ error: 'Method not allowed' })

  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
}
