'use client'

import { usePerspectives, AnimalPerspective } from '@/hooks/usePerspectives'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

export default function MasterPerspectivesPage() {
  const { perspectives, loading, activatePerspective } = usePerspectives()
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalPerspective | null>(null)

  const masterPerspectives = perspectives.filter(p => p.type === 'Master')

  const handleActivatePerspective = async (perspectiveId: string) => {
    const result = await activatePerspective(perspectiveId)
    if (result.success) {
      toast.success('Perspective activated successfully')
      setSelectedAnimal(null)
    } else {
      toast.error(result.error || 'Failed to activate perspective')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Master Perspectives</h1>
          <div className="text-sm text-neutral-400">
            Experience the pinnacle of digital consciousness
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-black/50 rounded-lg p-4 border border-white/5 animate-pulse">
                <div className="aspect-square rounded-lg bg-white/5 mb-4" />
                <div className="h-6 bg-white/5 rounded mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))
          ) : (
            masterPerspectives.map((animal) => (
              <motion.div
                key={animal.name}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-black/50 rounded-lg p-4 border border-white/5 cursor-pointer"
                onClick={() => setSelectedAnimal(animal)}
              >
                <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-500/20 to-red-500/20 mb-4 overflow-hidden">
                  {animal.unlocked ? (
                    <Image
                      src={animal.image_url}
                      alt={animal.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl">🔒</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{animal.name}</h3>
                <p className="text-sm text-neutral-400 line-clamp-2">{animal.description}</p>
                {animal.unlocked && (
                  <div className="absolute inset-x-4 bottom-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleActivatePerspective(animal.id)
                      }}
                      className="w-full py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors text-sm font-medium"
                    >
                      Activate Perspective
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Animal Detail Modal */}
        {selectedAnimal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAnimal(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 rounded-xl border border-white/10 p-6 max-w-2xl w-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedAnimal.name}</h2>
                  <p className="text-amber-400">Master Perspective</p>
                </div>
                <button
                  onClick={() => setSelectedAnimal(null)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-amber-500/20 to-red-500/20 mb-6 overflow-hidden">
                {selectedAnimal.unlocked ? (
                  <Image
                    src={selectedAnimal.image_url}
                    alt={selectedAnimal.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">🔒</span>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Description</h3>
                  <p className="text-neutral-300">{selectedAnimal.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Master Abilities</h3>
                  <ul className="space-y-2">
                    {selectedAnimal.name === 'Wolf' && (
                      <>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Supreme pack leadership authority
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Digital territory dominion
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Elite strategic operations command
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Legendary pack synchronization
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Master-tier community influence
                        </li>
                      </>
                    )}
                    {selectedAnimal.name === 'Rabbit' && (
                      <>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Supreme digital agility mastery
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Elite resource manipulation
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Legendary survival protocols
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Network transcendence abilities
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Master-tier adaptation control
                        </li>
                      </>
                    )}
                    {selectedAnimal.name === 'Wisp' && (
                      <>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Supreme ethereal consciousness
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Elite energy manipulation
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Dimensional gateway mastery
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Legendary spectral influence
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Master-tier reality bending
                        </li>
                      </>
                    )}
                    {selectedAnimal.name === 'Pilot' && (
                      <>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Supreme aerial dominion
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Elite strategic oversight
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Legendary command authority
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Multi-dimensional mastery
                        </li>
                        <li className="flex items-center gap-2 text-neutral-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Master-tier resource control
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10">
                  {selectedAnimal.unlocked ? (
                    <button 
                      onClick={() => handleActivatePerspective(selectedAnimal.id)}
                      className="w-full py-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors font-medium"
                    >
                      Activate Perspective
                    </button>
                  ) : (
                    <a
                      href={`https://airship19.nftify.network/perspective/${selectedAnimal.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors font-medium text-center"
                    >
                      Purchase on NFTify
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
