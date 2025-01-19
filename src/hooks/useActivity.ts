'use client'

import { useState } from 'react'

interface ActivityDetails {
  amount?: number
  message?: string
  status?: string
  [key: string]: unknown
}

export interface Activity {
  id: string
  type: string
  user: {
    name: string
    avatar: string
  }
  target?: string
  timestamp: string
  details?: ActivityDetails
}

export function useActivity() {
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

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
