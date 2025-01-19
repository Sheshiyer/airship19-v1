import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { createClient } from '@/lib/supabase'

export interface AnimalPerspective {
  id: string
  name: string
  type: 'Primary' | 'Advanced' | 'Master'
  description: string
  image_url: string
  unlocked: boolean
  unlocked_at?: string
}

interface PerspectivesState {
  perspectives: AnimalPerspective[]
  loading: boolean
  error: Error | null
}

export function usePerspectives() {
  const [state, setState] = useState<PerspectivesState>({
    perspectives: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    fetchPerspectives()
  }, [])

  const fetchPerspectives = async () => {
    try {
      const { data: allPerspectives, error: perspectivesError } = await createClient()
        .from('animal_perspectives')
        .select('*')

      if (perspectivesError) throw perspectivesError

      // Mark original 4 as unlocked
      const perspectives = allPerspectives.map(perspective => ({
        ...perspective,
        unlocked: ['Wolf', 'Rabbit', 'Wisp', 'Pilot'].includes(perspective.name),
        unlocked_at: ['Wolf', 'Rabbit', 'Wisp', 'Pilot'].includes(perspective.name) 
          ? new Date().toISOString() 
          : undefined
      }))

      setState({
        perspectives,
        loading: false,
        error: null,
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as Error,
      }))
    }
  }

  // For development, activation always succeeds
  const activatePerspective = async (perspectiveId: string) => {
    return { 
      success: true,
      error: null
    }
  }

  return {
    ...state,
    activatePerspective,
    refreshPerspectives: fetchPerspectives,
  }
}
