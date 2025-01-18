'use client'

import { useAuth } from '@/context/auth-context'
import { useRBAC } from '@/hooks/useRBAC'
import { useState } from 'react'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { QuickActions } from '@/components/dashboard/quick-actions'

export function DashboardContent() {
  const { user } = useAuth()
  const { hasPermission } = useRBAC()
  const [posts] = useState([
    { id: 1, title: 'Getting Started with Web3', status: 'published' },
    { id: 2, title: 'Understanding NFTs', status: 'draft' },
    { id: 3, title: 'The Future of DeFi', status: 'pending' },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          {hasPermission('create:post') && (
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Create New Post
            </button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        <div className="grid gap-6 mb-8">
          {/* Content Management */}
          <div className="bg-black/80 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white mb-4">Content Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-neutral-300">Title</th>
                    <th className="text-left py-3 px-4 text-neutral-300">Status</th>
                    <th className="text-right py-3 px-4 text-neutral-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-white/10">
                      <td className="py-3 px-4 text-white">{post.title}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                          post.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          {hasPermission('edit:post') && (
                            <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors">
                              Edit
                            </button>
                          )}
                          {hasPermission('delete:post') && (
                            <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors">
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
            <div>
              {/* Quick Stats */}
              <div className="bg-black/80 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-white/5">
                    <p className="text-sm text-neutral-300">Total Posts</p>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-white/5">
                    <p className="text-sm text-neutral-300">Published</p>
                    <p className="text-2xl font-bold text-white">8</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-white/5">
                    <p className="text-sm text-neutral-300">Draft</p>
                    <p className="text-2xl font-bold text-white">4</p>
                  </div>
                </div>
              </div>

              {/* Admin Section */}
              {hasPermission('manage:users') && (
                <div className="mt-6 bg-black/80 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white mb-4">User Management</h2>
                  <p className="text-neutral-300">
                    This section is only visible to administrators.
                  </p>
                  <button className="mt-4 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                    Manage Users
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
