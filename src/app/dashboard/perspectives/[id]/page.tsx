'use client'

import { usePerspectives, AnimalPerspective } from '@/hooks/usePerspectives'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface TierAbilities {
  [key: string]: {
    title: string,
    color: string,
    abilities: string[]
  }
}

const animalAbilities: { [key: string]: TierAbilities } = {
  // Primary Tier Animals
  'Rabbit': {
    Primary: {
      title: 'Primary Abilities',
      color: 'bg-blue-500',
      abilities: [
        'Swift digital navigation',
        'Intuitive resource gathering',
        'Agile adaptation protocols'
      ]
    }
  },
  'Wolf': {
    Primary: {
      title: 'Primary Abilities',
      color: 'bg-blue-500',
      abilities: [
        'Pack coordination',
        'Territorial awareness',
        'Strategic hunting patterns'
      ]
    }
  },
  'Stag': {
    Primary: {
      title: 'Primary Abilities',
      color: 'bg-blue-500',
      abilities: [
        'Noble leadership',
        'Digital landscape guidance',
        'Wisdom channeling'
      ]
    }
  },
  'Doe': {
    Primary: {
      title: 'Primary Abilities',
      color: 'bg-blue-500',
      abilities: [
        'Gentle awareness',
        'Nurturing connections',
        'Ecosystem harmony'
      ]
    }
  },

  // Advanced Tier Animals
  'Fox': {
    Advanced: {
      title: 'Advanced Abilities',
      color: 'bg-purple-500',
      abilities: [
        'Cunning strategy deployment',
        'Adaptive mastery',
        'Complex environment navigation',
        'Tactical insight generation'
      ]
    }
  },
  'Bear': {
    Advanced: {
      title: 'Advanced Abilities',
      color: 'bg-purple-500',
      abilities: [
        'Powerful presence projection',
        'Digital realm protection',
        'Balance maintenance',
        'Resource guardianship'
      ]
    }
  },
  'Boar': {
    Advanced: {
      title: 'Advanced Abilities',
      color: 'bg-purple-500',
      abilities: [
        'Breakthrough power',
        'Obstacle elimination',
        'Path forging',
        'Determined progression'
      ]
    }
  },
  'Sheep': {
    Advanced: {
      title: 'Advanced Abilities',
      color: 'bg-purple-500',
      abilities: [
        'Community harmonization',
        'Collective wisdom gathering',
        'Social fabric weaving',
        'Group consciousness enhancement'
      ]
    }
  },

  // Master Tier Animals
  'Goat': {
    Master: {
      title: 'Master Abilities',
      color: 'bg-amber-500',
      abilities: [
        'Supreme adaptability',
        'Technical terrain mastery',
        'Digital elevation control',
        'Unstoppable progression',
        'Peak achievement protocols'
      ]
    }
  },
  'Lion': {
    Master: {
      title: 'Master Abilities',
      color: 'bg-amber-500',
      abilities: [
        'Sovereign authority',
        'Noble leadership',
        'Digital kingdom command',
        'Strategic dominion',
        'Royal presence projection'
      ]
    }
  },
  'Elephant': {
    Master: {
      title: 'Master Abilities',
      color: 'bg-amber-500',
      abilities: [
        'Ancient wisdom embodiment',
        'Unshakeable memory systems',
        'Digital consciousness expansion',
        'Eternal knowledge preservation',
        'Wisdom transmission protocols'
      ]
    }
  },
  'Cow': {
    Master: {
      title: 'Master Abilities',
      color: 'bg-amber-500',
      abilities: [
        'Abundance manifestation',
        'Nurturing sustenance',
        'Ecosystem enrichment',
        'Resource multiplication',
        'Digital fertility protocols'
      ]
    }
  }
}

export default function PerspectivePage() {
  const params = useParams()
  const { perspectives, loading, activatePerspective } = usePerspectives()
  const [perspective, setPerspective] = useState<AnimalPerspective | null>(null)

  useEffect(() => {
    if (!loading && perspectives.length > 0) {
      const found = perspectives.find(p => p.id === params.id)
      if (found) setPerspective(found)
    }
  }, [loading, perspectives, params.id])

  const handleActivatePerspective = async () => {
    if (!perspective) return
    const result = await activatePerspective(perspective.id)
    if (result.success) {
      toast.success('Perspective activated successfully')
    } else {
      toast.error(result.error || 'Failed to activate perspective')
    }
  }

  if (loading || !perspective) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-white/5 rounded w-64" />
            <div className="aspect-video bg-white/5 rounded-lg" />
            <div className="space-y-4">
              <div className="h-6 bg-white/5 rounded w-48" />
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const abilities = animalAbilities[perspective.name]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{perspective.name}</h1>
            <p className="text-lg text-neutral-400">{perspective.description}</p>
          </div>
          {perspective.unlocked ? (
            <button
              onClick={handleActivatePerspective}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
            >
              Activate Perspective
            </button>
          ) : (
            <a
              href={`https://airship19.nftify.network/perspective/${perspective.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
            >
              Purchase on NFTify
            </a>
          )}
        </div>

        <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
          {perspective.unlocked ? (
            <Image
              src={perspective.image_url}
              alt={perspective.name}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl">🔒</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(abilities).map(([tier, { title, color, abilities }]) => (
            <div key={tier} className="bg-black/50 rounded-lg p-6 border border-white/5">
              <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
              <ul className="space-y-3">
                {abilities.map((ability, index) => (
                  <li key={index} className="flex items-center gap-2 text-neutral-300">
                    <span className={`w-2 h-2 rounded-full ${color}`} />
                    {ability}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {perspective.unlocked && (
          <div className="bg-black/50 rounded-lg p-6 border border-white/5">
            <h3 className="text-lg font-medium text-white mb-4">Unlocked Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Community Access</h4>
                <p className="text-sm text-neutral-400">
                  Participate in exclusive perspective-specific community events and discussions
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Digital Assets</h4>
                <p className="text-sm text-neutral-400">
                  Access to unique digital assets and customization options
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Special Events</h4>
                <p className="text-sm text-neutral-400">
                  Priority access to special events and perspective-specific activities
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
