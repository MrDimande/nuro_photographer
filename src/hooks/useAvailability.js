/**
 * Custom hook for fetching availability data from Supabase
 */

import { useCallback, useEffect, useState } from 'react'
import { availability as availabilityService } from '../lib/supabase'

export const useAvailability = () => {
  const [availabilityData, setAvailabilityData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAvailability = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error: fetchError } = await availabilityService.getAll()
      
      if (fetchError) {
        throw fetchError
      }

      // Transform to object for easy lookup { 'YYYY-MM-DD': 'status' }
      const map = {}
      if (data) {
        data.forEach(item => {
          map[item.date] = item.status
        })
      }
      
      setAvailabilityData(map)
    } catch (err) {
      console.error('Error fetching availability:', err)
      setError(err.message)
      // Use fallback static data
      setAvailabilityData({})
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  return {
    availabilityData,
    loading,
    error,
    refetch: fetchAvailability,
  }
}

export default useAvailability
