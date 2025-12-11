/**
 * Google Calendar Sync API Endpoint
 * 
 * POST /api/calendar-sync
 * Creates/updates events in Google Calendar when availability changes
 * 
 * Body:
 * - date: string (YYYY-MM-DD)
 * - status: string ('free', 'partial', 'busy')
 * - note: string (optional)
 */

import { google } from 'googleapis'

// Service account credentials (stored as JSON string in env)
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'nurosousa@gmail.com'
const GOOGLE_SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (!GOOGLE_SERVICE_ACCOUNT) {
    console.warn('Google Calendar not configured - GOOGLE_SERVICE_ACCOUNT_KEY missing')
    return res.status(200).json({ 
      success: true, 
      message: 'Calendar sync skipped - not configured' 
    })
  }

  try {
    const { date, status, note, action } = req.body

    if (!date) {
      return res.status(400).json({ error: 'Date is required' })
    }

    // Parse service account credentials
    const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT)
    
    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Format date for calendar
    const eventDate = new Date(date)
    const startDateTime = new Date(eventDate)
    startDateTime.setHours(9, 0, 0) // Start at 9 AM
    const endDateTime = new Date(eventDate)
    endDateTime.setHours(18, 0, 0) // End at 6 PM

    // Event title based on status
    const titles = {
      busy: '📸 Sessão Agendada',
      partial: '📸 Parcialmente Ocupado',
      free: '📸 Disponível',
    }

    // Check if event already exists for this date
    const existingEvents = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
      q: '📸', // Search for our events
    })

    const existingEvent = existingEvents.data.items?.find(e => 
      e.summary?.startsWith('📸')
    )

    // DELETE action - remove event
    if (action === 'delete' || status === 'free') {
      if (existingEvent) {
        await calendar.events.delete({
          calendarId: GOOGLE_CALENDAR_ID,
          eventId: existingEvent.id,
        })
        return res.status(200).json({ 
          success: true, 
          message: 'Event deleted from calendar' 
        })
      }
      return res.status(200).json({ 
        success: true, 
        message: 'No event to delete' 
      })
    }

    // CREATE or UPDATE event
    const eventData = {
      summary: titles[status] || '📸 Nuro Photographer',
      description: note || `Status: ${status}\nGerenciado via Nuro Photographer Admin`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Africa/Maputo',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Africa/Maputo',
      },
      colorId: status === 'busy' ? '11' : '5', // Red for busy, Yellow for partial
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 60 },
        ],
      },
    }

    if (existingEvent) {
      // Update existing event
      await calendar.events.update({
        calendarId: GOOGLE_CALENDAR_ID,
        eventId: existingEvent.id,
        requestBody: eventData,
      })
      return res.status(200).json({ 
        success: true, 
        message: 'Event updated in calendar' 
      })
    } else {
      // Create new event
      const newEvent = await calendar.events.insert({
        calendarId: GOOGLE_CALENDAR_ID,
        requestBody: eventData,
      })
      return res.status(201).json({ 
        success: true, 
        message: 'Event created in calendar',
        eventId: newEvent.data.id,
      })
    }

  } catch (error) {
    console.error('Calendar sync error:', error)
    return res.status(500).json({ 
      error: 'Failed to sync with calendar',
      details: error.message 
    })
  }
}
