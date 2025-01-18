'use client'

import { useAuth } from '@/context/auth-context'
import { useWallet } from '@/context/wallet-context'
import { useRBAC } from '@/hooks/useRBAC'

export function ProfileContent() {
  const { user } = useAuth()
  const { isConnected, address, balance } = useWallet()
  const { role } = useRBAC()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-black/80 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
        
        <div className="space-y-6">
          <ProfileSection title="Personal Information">
            <ProfileField label="Email" value={user?.email || 'Not set'} />
            <ProfileField label="Role" value={role.charAt(0).toUpperCase() + role.slice(1)} />
          </ProfileSection>

          <ProfileSection title="Wallet">
            <ProfileField 
              label="Connected" 
              value={isConnected ? 'Yes' : 'No'} 
            />
            {address && (
              <>
                <ProfileField 
                  label="Address" 
                  value={address.slice(0, 6) + '...' + address.slice(-4)} 
                />
                {balance && (
                  <ProfileField 
                    label="Balance" 
                    value={balance} 
                  />
                )}
              </>
            )}
          </ProfileSection>

          <ProfileSection title="Preferences">
            <div className="flex items-center justify-between">
              <span className="text-neutral-300">Email Notifications</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Manage
              </button>
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  )
}

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/10 pb-6">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-neutral-300">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}
