'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/lib/routes'
import { useWitnessSystem } from '@/hooks/useWitnessSystem'
import { usePerspectives, AnimalPerspective } from '@/hooks/usePerspectives'
import { useRaffle } from '@/hooks/useRaffle'
import { toast } from 'sonner'

export function UserDashboardContent() {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalPerspective | null>(null)
  const [showTokenSend, setShowTokenSend] = useState(false)
  const [sendingTokens, setSendingTokens] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')
  const [message, setMessage] = useState('')
  
  const { tokens, sendTokens } = useWitnessSystem()
  const { perspectives, loading: perspectivesLoading, activatePerspective } = usePerspectives()
  const { currentRaffle, userEntries, calculateOdds, getTimeLeft, enterRaffle } = useRaffle()

  // Update time left every second
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [getTimeLeft])

  const handleSendTokens = async () => {
    if (!recipientEmail || !tokenAmount) {
      toast.error('Please fill in all required fields')
      return
    }

    setSendingTokens(true)
    const result = await sendTokens({
      recipientEmail,
      amount: parseInt(tokenAmount),
      message,
    })
    setSendingTokens(false)

    if (result.success) {
      toast.success('Tokens sent successfully')
      setShowTokenSend(false)
      setRecipientEmail('')
      setTokenAmount('')
      setMessage('')
    } else {
      toast.error(result.error || 'Failed to send tokens')
    }
  }

  const handleEnterRaffle = async (amount: number) => {
    const result = await enterRaffle(amount)
    if (result.success) {
      toast.success('Successfully entered raffle')
    } else {
      toast.error(result.error || 'Failed to enter raffle')
    }
  }

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
        <h1 className="text-2xl font-bold text-white">Welcome to Your Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-lg font-medium text-white mb-2">Witness Tokens</h3>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-blue-400">
                {tokens.loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  tokens.amount
                )}
              </p>
              <button 
                onClick={() => setShowTokenSend(true)}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Send Tokens
              </button>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-lg font-medium text-white mb-2">Raffle Entries</h3>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-blue-400">
                {userEntries?.length || 0}
              </p>
              <span className="text-sm text-neutral-400">
                Next draw: {timeLeft || '00:00:00'}
              </span>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-lg font-medium text-white mb-2">NFTs Owned</h3>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-blue-400">0</p>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View Collection
              </button>
            </div>
          </motion.div>
        </div>

        {/* Profile & Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Section */}
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Profile</h2>
              <Link 
                href={{ pathname: routes.profile }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">John Doe</h3>
                  <p className="text-sm text-neutral-400">john@example.com</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-black/30 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-neutral-300">Member Since</h4>
                  <p className="text-lg text-white">Jan 2024</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-neutral-300">Active Perspective</h4>
                  <p className="text-lg text-white">Wolf</p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Quick Settings</h2>
              <Link 
                href={{ pathname: routes.settings }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                All Settings
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-white">Email Notifications</h3>
                  <p className="text-xs text-neutral-400">Receive updates and alerts</p>
                </div>
                <button className="w-12 h-6 bg-blue-500/20 rounded-full relative">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-blue-500 rounded-full transition-all" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-white">Two-Factor Auth</h3>
                  <p className="text-xs text-neutral-400">Enhanced account security</p>
                </div>
                <button className="w-12 h-6 bg-white/10 rounded-full relative">
                  <span className="absolute left-1 top-1 w-4 h-4 bg-neutral-400 rounded-full transition-all" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-white">Public Profile</h3>
                  <p className="text-xs text-neutral-400">Visible to other users</p>
                </div>
                <button className="w-12 h-6 bg-blue-500/20 rounded-full relative">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-blue-500 rounded-full transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Perspectives */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Featured Perspectives</h2>
            <div className="flex items-center gap-4">
              <Link 
                href={{ pathname: routes.primaryPerspectives }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Primary
              </Link>
              <Link 
                href={{ pathname: routes.advancedPerspectives }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Advanced
              </Link>
              <Link 
                href={{ pathname: routes.masterPerspectives }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Master
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {perspectivesLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-black/50 rounded-lg p-4 border border-white/5 animate-pulse">
                  <div className="aspect-square rounded-lg bg-white/5 mb-4" />
                  <div className="h-6 bg-white/5 rounded mb-2" />
                  <div className="h-4 bg-white/5 rounded w-2/3" />
                </div>
              ))
            ) : (
              perspectives
                .filter(animal => animal.unlocked)
                .slice(0, 3)
                .map((animal) => (
                  <motion.div
                    key={animal.name}
                    whileHover={{ scale: 1.02 }}
                    className="group relative bg-black/50 rounded-lg p-4 border border-white/5 cursor-pointer"
                    onClick={() => setSelectedAnimal(animal)}
                  >
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4 overflow-hidden">
                      <Image
                        src={animal.image_url}
                        alt={animal.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">{animal.name}</h3>
                    <p className="text-sm text-neutral-400 line-clamp-2">{animal.description}</p>
                  </motion.div>
                ))
            )}
          </div>
        </div>

        {/* Community and Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest Videos */}
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Latest Creator Videos</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Understanding Digital Consciousness",
                  thumbnail: "/thumbnails/video1.jpg",
                  duration: "12:34",
                  date: "2 hours ago"
                },
                {
                  title: "Exploring the Metaverse",
                  thumbnail: "/thumbnails/video2.jpg",
                  duration: "8:45",
                  date: "1 day ago"
                }
              ].map((video, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="relative w-32 h-20 rounded-lg bg-black/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <span className="absolute bottom-1 right-1 text-xs text-white bg-black/50 px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Updates */}
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Community Updates</h2>
            <div className="space-y-4">
              {[
                {
                  title: "New Community Challenge",
                  description: "Join the weekly digital art challenge",
                  type: "event",
                  date: "Starts in 2 days"
                },
                {
                  title: "Community Milestone",
                  description: "We've reached 10,000 members!",
                  type: "announcement",
                  date: "Posted yesterday"
                }
              ].map((update, i) => (
                <div key={i} className="bg-black/30 rounded-lg p-4 cursor-pointer hover:bg-black/40 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white">{update.title}</h3>
                      <p className="text-xs text-neutral-400 mt-1">{update.description}</p>
                    </div>
                    <span className="text-xs text-neutral-500">{update.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Raffle */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Current Raffle</h2>
            <div className="text-sm text-neutral-400">
              Time Left: <span className="text-blue-400 font-medium">{timeLeft}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Your Odds</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${calculateOdds()}%` }}
                    />
                  </div>
                  <span className="text-blue-400 font-medium">{calculateOdds().toFixed(1)}%</span>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Prize Pool</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between text-neutral-300">
                    <span>1st Place</span>
                    <span className="text-blue-400">1000 Witness Tokens</span>
                  </li>
                  <li className="flex justify-between text-neutral-300">
                    <span>2nd Place</span>
                    <span className="text-blue-400">500 Witness Tokens</span>
                  </li>
                  <li className="flex justify-between text-neutral-300">
                    <span>3rd Place</span>
                    <span className="text-blue-400">250 Witness Tokens</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <p className="text-neutral-400 mb-4">Use your Witness Tokens to increase your chances!</p>
              <div className="space-y-3 w-full max-w-xs">
                <button 
                  onClick={() => handleEnterRaffle(10)}
                  disabled={tokens.amount < 10}
                  className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Enter with 10 Tokens
                </button>
                <button 
                  onClick={() => handleEnterRaffle(50)}
                  disabled={tokens.amount < 50}
                  className="w-full py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 disabled:bg-blue-500/10 disabled:text-blue-400/50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Enter with 50 Tokens
                </button>
                <button 
                  onClick={() => handleEnterRaffle(100)}
                  disabled={tokens.amount < 100}
                  className="w-full py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 disabled:bg-blue-500/10 disabled:text-blue-400/50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Enter with 100 Tokens
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Animal Detail Modal */}
        <AnimatePresence>
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
                className="bg-black/90 rounded-xl border border-white/10 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedAnimal.name}</h2>
                    <p className="text-blue-400">{selectedAnimal.type} Perspective</p>
                  </div>
                  <button
                    onClick={() => setSelectedAnimal(null)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6 overflow-hidden">
                  {selectedAnimal.unlocked ? (
                    <Image
                      src={selectedAnimal.image_url}
                      alt={selectedAnimal.name}
                      width={600}
                      height={400}
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
                    <h3 className="text-lg font-medium text-white mb-2">Special Abilities</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-neutral-300">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Enhanced perspective in digital spaces
                      </li>
                      <li className="flex items-center gap-2 text-neutral-300">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Unique interaction capabilities
                      </li>
                      <li className="flex items-center gap-2 text-neutral-300">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Special community access
                      </li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    {selectedAnimal.unlocked ? (
                      <button 
                        onClick={() => handleActivatePerspective(selectedAnimal.id)}
                        className="w-full py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
                      >
                        Activate Perspective
                      </button>
                    ) : (
                      <a
                        href={`https://airship19.nftify.network/perspective/${selectedAnimal.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium text-center"
                      >
                        Purchase on NFTify
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Token Send Modal */}
        <AnimatePresence>
          {showTokenSend && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowTokenSend(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-black/90 rounded-xl border border-white/10 p-6 max-w-md w-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Send Witness Tokens</h2>
                  <button
                    onClick={() => setShowTokenSend(false)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={tokens.amount}
                      value={tokenAmount}
                      onChange={(e) => setTokenAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a message"
                      rows={3}
                    />
                  </div>
                  <button 
                    onClick={handleSendTokens}
                    disabled={sendingTokens || !recipientEmail || !tokenAmount || parseInt(tokenAmount) > tokens.amount}
                    className="w-full py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {sendingTokens ? 'Sending...' : 'Send Tokens'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
