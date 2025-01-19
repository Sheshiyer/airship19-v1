'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type ActivityLog = Database['public']['Tables']['activity_logs']['Row']

export interface Activity {
  id: string
  type: string
  user: {
    name: string
    avatar: string
  }
  target?: string
  timestamp: string
  details?: any
}

export function useActivity() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock activities for development
  const activities: Activity[] = [
    {
      id: '1',
      type: 'post_create',
      user: {
        name: 'Dev User',
        avatar: 'D'
      },
      target: 'Getting Started with Digital Consciousness',
      timestamp: new Date().toLocaleString()
    },
    {
      id: '2',
      type: 'perspective_unlock',
      user: {
        name: 'Dev User',
        avatar: 'D'
      },
      target: 'Wolf Perspective',
      timestamp: new Date(Date.now() - 3600000).toLocaleString()
    },
    {
      id: '3',
      type: 'token_send',
      user: {
        name: 'Dev User',
        avatar: 'D'
      },
      target: 'another user',
      timestamp: new Date(Date.now() - 7200000).toLocaleString()
    },
    {
      id: '4',
      type: 'raffle_enter',
      user: {
        name: 'Dev User',
        avatar: 'D'
      },
      target: 'Genesis Raffle',
      timestamp: new Date(Date.now() - 14400000).toLocaleString()
    }
  ]

  return { activities, loading, error }
}
