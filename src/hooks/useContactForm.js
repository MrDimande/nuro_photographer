/**
 * Custom hook for submitting contact form to Supabase + Email notification
 */

import { useState } from 'react'
import { contactSubmissions } from '../lib/supabase'

export const useContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const submitContact = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      // 1. Save to Supabase
      const { data, error: submitError } = await contactSubmissions.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service || null,
        date: formData.date || null,
        message: formData.message || null,
        status: 'new',
      })

      if (submitError) {
        throw submitError
      }

      // 2. Send email notification (don't block on failure)
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        console.log('Email notification sent')
      } catch (emailError) {
        console.warn('Email notification failed (non-blocking):', emailError)
      }

      setSuccess(true)
      return { success: true, data }
    } catch (err) {
      console.error('Error submitting contact:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setSuccess(false)
    setError(null)
  }

  return {
    submitContact,
    loading,
    success,
    error,
    reset,
  }
}

export default useContactForm

