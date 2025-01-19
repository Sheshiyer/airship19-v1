'use client'

import { useState } from 'react'
import { Database, Post } from '@/lib/database.types'

type PostWithUser = Post & {
  user: {
    email: string
  }
}

export function usePosts() {
  const [loading, setLoading] = useState(false)

  // Mock posts data for development
  const mockPosts: PostWithUser[] = [
    {
      id: '1',
      title: 'Getting Started with Digital Consciousness',
      content: 'Learn about the fundamentals...',
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'dev-user',
      user: { email: 'dev@example.com' }
    },
    {
      id: '2',
      title: 'Advanced Perspective Techniques',
      content: 'Discover advanced methods...',
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'dev-user',
      user: { email: 'dev@example.com' }
    },
    {
      id: '3',
      title: 'Understanding the Witness System',
      content: 'Deep dive into witness tokens...',
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'dev-user',
      user: { email: 'dev@example.com' }
    }
  ]

  const fetchPosts = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading
    setLoading(false)
    return mockPosts
  }

  const fetchUserPosts = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setLoading(false)
    return mockPosts
  }

  const fetchPost = async (id: string) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    const post = mockPosts.find(p => p.id === id)
    setLoading(false)
    if (!post) throw new Error('Post not found')
    return post
  }

  const createPost = async (post: Database['public']['Tables']['posts']['Insert']) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    const newPost = {
      ...post,
      id: Math.random().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'dev-user',
      user: { email: 'dev@example.com' }
    }
    setLoading(false)
    return newPost
  }

  const updatePost = async (id: string, updates: Database['public']['Tables']['posts']['Update']) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    const post = mockPosts.find(p => p.id === id)
    if (!post) throw new Error('Post not found')
    const updatedPost = { ...post, ...updates, updated_at: new Date().toISOString() }
    setLoading(false)
    return updatedPost
  }

  const deletePost = async (_id: string) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setLoading(false)
    return true
  }

  return {
    loading,
    fetchPosts,
    fetchUserPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
  }
}
