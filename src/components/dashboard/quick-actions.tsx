'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useWitnessSystem } from '@/hooks/useWitnessSystem'
import { routes } from '@/lib/routes'
import Link from 'next/link'

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
  color: string
}

export function QuickActions() {
  const router = useRouter()
  const { sendTokens } = useWitnessSystem()

  const quickActions: QuickAction[] = [
  {
    id: 'new-post',
    label: 'Create Post',
    color: 'from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    onClick: () => {
      window.location.href = routes.createPost
    }
  },
  {
    id: 'upload',
    label: 'Upload File',
    color: 'from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    onClick: () => {
      // Open file input dialog
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*,video/*'
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          toast.promise(
            // Replace with your file upload logic
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
              loading: 'Uploading file...',
              success: 'File uploaded successfully!',
              error: 'Failed to upload file'
            }
          )
        }
      }
      input.click()
    }
  },
  {
    id: 'invite',
    label: 'Invite User',
    color: 'from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    onClick: async () => {
      const email = prompt('Enter email address to invite:')
      if (email) {
        try {
          // Send invitation tokens
          await sendTokens({
            recipientEmail: email,
            amount: 10,
            message: 'Welcome to Airship! Here are some tokens to get you started.'
          })
          toast.success('Invitation sent successfully!')
        } catch (error) {
          toast.error('Failed to send invitation')
        }
      }
    }
  },
  {
    id: 'settings',
    label: 'Settings',
    color: 'from-indigo-500/20 to-blue-500/20 hover:from-indigo-500/30 hover:to-blue-500/30',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    onClick: () => {
      window.location.href = routes.settings
    }
  }
]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions.map((action, index) => (
        <motion.button
          key={action.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={action.onClick}
          className={`p-4 rounded-xl bg-gradient-to-br ${action.color} border border-white/10 backdrop-blur-xl
            flex items-center gap-3 text-white transition-all duration-300 hover:scale-[1.02]`}
        >
          <div className="p-2 rounded-lg bg-white/10">
            {action.icon}
          </div>
          <span className="text-sm font-medium">{action.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
