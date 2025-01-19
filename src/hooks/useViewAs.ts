'use client'

import { create } from 'zustand'
import { type StateCreator } from 'zustand'

interface ViewAsStore {
  viewAsUser: boolean
  setViewAsUser: (value: boolean) => void
}

type ViewAsStoreCreator = StateCreator<ViewAsStore>

const createViewAsStore: ViewAsStoreCreator = (set) => ({
  viewAsUser: false,
  setViewAsUser: (value: boolean) => set({ viewAsUser: value }),
})

export const useViewAs = create<ViewAsStore>(createViewAsStore)
