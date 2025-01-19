'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [publicProfile, setPublicProfile] = useState(true)
  const [saving, setSaving] = useState(false)

  const handleSaveSettings = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    toast.success('Settings saved successfully')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-white">Email Notifications</h3>
                <p className="text-xs text-neutral-400">Receive updates and alerts via email</p>
              </div>
              <button 
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  emailNotifications ? 'bg-blue-500/20' : 'bg-white/10'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                  emailNotifications 
                    ? 'right-1 bg-blue-500' 
                    : 'left-1 bg-neutral-400'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-white">Push Notifications</h3>
                <p className="text-xs text-neutral-400">Get instant updates in your browser</p>
              </div>
              <button className="w-12 h-6 bg-white/10 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-neutral-400 rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-white">Two-Factor Authentication</h3>
                <p className="text-xs text-neutral-400">Add an extra layer of security</p>
              </div>
              <button 
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  twoFactorAuth ? 'bg-blue-500/20' : 'bg-white/10'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                  twoFactorAuth 
                    ? 'right-1 bg-blue-500' 
                    : 'left-1 bg-neutral-400'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-white">Session Management</h3>
                <p className="text-xs text-neutral-400">View and manage active sessions</p>
              </div>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View Sessions
              </button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Privacy</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-white">Public Profile</h3>
                <p className="text-xs text-neutral-400">Make your profile visible to others</p>
              </div>
              <button 
                onClick={() => setPublicProfile(!publicProfile)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  publicProfile ? 'bg-blue-500/20' : 'bg-white/10'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                  publicProfile 
                    ? 'right-1 bg-blue-500' 
                    : 'left-1 bg-neutral-400'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-white">Activity Status</h3>
                <p className="text-xs text-neutral-400">Show when you're active</p>
              </div>
              <button className="w-12 h-6 bg-white/10 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-neutral-400 rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Storage */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Data & Storage</h2>
          <div className="space-y-4">
            <div className="p-3 bg-black/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-white">Storage Usage</h3>
                <span className="text-xs text-neutral-400">2.1 GB of 5 GB used</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-blue-500 rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-white">Download Data</h3>
                <p className="text-xs text-neutral-400">Get a copy of your data</p>
              </div>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Request Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
