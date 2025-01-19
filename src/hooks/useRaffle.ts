import { useState } from 'react'

interface RaffleEntry {
  id: string
  tokens_used: number
  created_at: string
}

interface Raffle {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  status: 'active' | 'completed' | 'cancelled'
  prize_description: string
  total_entries?: number
  user_entries?: RaffleEntry[]
}

interface RaffleState {
  currentRaffle: Raffle | null
  userEntries: RaffleEntry[]
  totalEntries: number
  loading: boolean
  error: Error | null
}

export function useRaffle() {
  // For development, provide mock raffle data
  const [state] = useState<RaffleState>({
    currentRaffle: {
      id: 'mock-raffle',
      title: 'Genesis Raffle',
      description: 'Win exclusive NFTs and Witness Tokens',
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      status: 'active' as const,
      prize_description: '1000 Witness Tokens + Exclusive NFT'
    },
    userEntries: [
      {
        id: 'mock-entry-1',
        tokens_used: 50,
        created_at: new Date().toISOString()
      }
    ],
    totalEntries: 100,
    loading: false,
    error: null
  })

  const fetchCurrentRaffle = async () => {
    // No-op for development
  }

  // Simplified calculations for development
  const calculateOdds = () => 50 // 50% chance

  const getTimeLeft = () => "23:59:59" // Always show time remaining

  const enterRaffle = async (_tokensToUse: number) => {
    return { success: true, error: null }
  }

  return {
    ...state,
    calculateOdds,
    getTimeLeft,
    enterRaffle,
    refreshRaffle: fetchCurrentRaffle,
  }
}
