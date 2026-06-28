import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  provider: 'google' | 'guest'
}

interface AuthState {
  user: User | null
  isLoading: boolean
  signInAsGuest: (name?: string) => void
  signInWithGoogle: (googleUser: { name: string; email: string; avatar: string; id: string }) => void
  signOut: () => void
  updateName: (name: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      signInAsGuest: (name = 'Seeker') => {
        set({
          user: {
            id: `guest_${Date.now()}`,
            name,
            email: '',
            provider: 'guest',
          }
        })
      },

      signInWithGoogle: (googleUser) => {
        set({
          user: {
            id: googleUser.id,
            name: googleUser.name,
            email: googleUser.email,
            avatar: googleUser.avatar,
            provider: 'google',
          }
        })
      },

      signOut: () => set({ user: null }),
      updateName: (name) => set(s => s.user ? { user: { ...s.user, name } } : {}),
    }),
    { name: 'daily-gita-auth' }
  )
)
