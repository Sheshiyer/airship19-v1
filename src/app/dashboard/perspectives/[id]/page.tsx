'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { usePerspectives, AnimalPerspective } from '@/hooks/usePerspectives'

export default function PerspectivePage() {
  const params = useParams()
  const { perspectives, loading } = usePerspectives()
  const [perspective, setPerspective] = useState<AnimalPerspective | null>(null)

  useEffect(() => {
    if (params.id && perspectives.length > 0) {
      const found = perspectives.find(p => p.id === params.id)
      if (found) {
        setPerspective(found)
      }
    }
  }, [params.id, perspectives])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!perspective) {
    return <div>Perspective not found</div>
  }

  return (
    <div>
      <h1>{perspective.name}</h1>
      <p>{perspective.description}</p>
      <p>Type: {perspective.type}</p>
      <p>Status: {perspective.unlocked ? 'Unlocked' : 'Locked'}</p>
      {perspective.unlocked_at && (
        <p>Unlocked at: {new Date(perspective.unlocked_at).toLocaleDateString()}</p>
      )}
    </div>
  )
}
