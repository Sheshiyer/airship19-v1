'use client'

import { useAuth } from '@/context/auth-context'
import { useRBAC } from '@/hooks/useRBAC'
import { useEffect, useState } from 'react'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { routes } from '@/lib/routes'
import { usePosts } from '@/hooks/usePosts'
import { Post } from '@/lib/database.types'
import { toast } from 'sonner'

export function DashboardContent() {
  const { } = useAuth()
  const { hasPermission } = useRBAC()
  const { fetchPosts, deletePost, loading } = usePosts()
  const [posts, setPosts] = useState<Array<Post & { user: { email: string } }>>([])
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  })

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts()
        setPosts(data)
        
        // Calculate stats
        setStats({
          total: data.length,
          published: data.filter(post => post.status === 'published').length,
          draft: data.filter(post => post.status === 'draft').length
        })
      } catch (error) {
        console.error('Error fetching posts:', error)
        toast.error('Failed to load posts')
      }
    }

    loadPosts()
  }, [fetchPosts])

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId)
      setPosts(posts.filter(post => post.id !== postId))
      toast.success('Post deleted successfully')
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          {hasPermission('create:post') && (
            <button 
              onClick={() => window.location.href = routes.createPost}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
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
          <div className="bg-black/80 border border-white/10 rounded-xl p-6 backdrop-blur-xl overflow-hidden">
            <h2 className="text-lg font-semibold text-white mb-4">Content Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-neutral-300">Title</th>
                    <th className="text-left py-3 px-4 text-neutral-300">Author</th>
                    <th className="text-left py-3 px-4 text-neutral-300">Status</th>
                    <th className="text-right py-3 px-4 text-neutral-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Loading skeleton
                    Array.from({ length: 3 }).map((_, index) => (
                      <tr key={`skeleton-${index}`} className="border-b border-white/10">
                        <td className="py-3 px-4">
                          <div className="h-4 bg-white/5 rounded w-48 animate-pulse" />
                        </td>
                        <td className="py-3 px-4">
                          <div className="h-4 bg-white/5 rounded w-32 animate-pulse" />
                        </td>
                        <td className="py-3 px-4">
                          <div className="h-6 bg-white/5 rounded w-20 animate-pulse" />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <div className="h-8 bg-white/5 rounded w-16 animate-pulse" />
                            <div className="h-8 bg-white/5 rounded w-16 animate-pulse" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : posts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-neutral-400">
                        No posts found
                      </td>
                    </tr>
                  ) : posts.map((post) => (
                    <tr key={post.id} className="border-b border-white/10">
                      <td className="py-3 px-4 text-white">{post.title}</td>
                      <td className="py-3 px-4 text-neutral-300">{post.user.email}</td>
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
                            <button 
                              onClick={() => window.location.href = routes.editPost(post.id)}
                              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                            >
                              Edit
                            </button>
                          )}
                          {hasPermission('delete:post') && (
                            <button 
                              onClick={() => handleDelete(post.id)}
                              className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                            >
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
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-white/5">
                    <p className="text-sm text-neutral-300">Published</p>
                    <p className="text-2xl font-bold text-white">{stats.published}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-white/5">
                    <p className="text-sm text-neutral-300">Draft</p>
                    <p className="text-2xl font-bold text-white">{stats.draft}</p>
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
                  <button 
                    onClick={() => window.location.href = routes.manageUsers}
                    className="mt-4 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                  >
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
