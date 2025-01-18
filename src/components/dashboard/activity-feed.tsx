'use client'

import { motion } from 'framer-motion'

interface Activity {
  id: string
  type: 'post' | 'comment' | 'like' | 'follow'
  user: {
    name: string
    avatar: string
  }
  target?: string
  timestamp: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'post',
    user: {
      name: 'John Doe',
      avatar: 'JD'
    },
    target: 'Getting Started with Web3',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Alice Smith',
      avatar: 'AS'
    },
    target: 'Understanding NFTs',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    type: 'like',
    user: {
      name: 'Bob Johnson',
      avatar: 'BJ'
    },
    target: 'The Future of DeFi',
    timestamp: '5 hours ago'
  }
]

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'post':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    case 'comment':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    case 'like':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    case 'follow':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
  }
}

const getActivityMessage = (activity: Activity) => {
  switch (activity.type) {
    case 'post':
      return `created a new post "${activity.target}"`
    case 'comment':
      return `commented on "${activity.target}"`
    case 'like':
      return `liked "${activity.target}"`
    case 'follow':
      return `started following you`
  }
}

export function ActivityFeed() {
  return (
    <div className="bg-black/80 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                {activity.user.avatar}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">
                  {activity.user.name}
                </p>
                <div className="text-blue-400">
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              <p className="text-sm text-neutral-300">
                {getActivityMessage(activity)}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {activity.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
