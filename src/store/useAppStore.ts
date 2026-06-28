import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getEarnedBadges } from '../data/gamification'

interface AppState {
  // Bookmarks
  bookmarks: string[]
  addBookmark: (id: string) => void
  removeBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean

  // Streak
  lastReadDate: string | null
  streak: number
  totalRead: number
  longestStreak: number
  markTodayRead: () => void

  // Reflections
  reflections: Record<string, string>
  saveReflection: (shlokaId: string, note: string) => void

  // Gamification
  earnedBadgeIds: string[]
  quizCompleted: boolean
  quizScore: number | null
  quizUnlocked: boolean
  setQuizCompleted: (score: number) => void
  newBadgeId: string | null          // transient — for celebration popup
  clearNewBadge: () => void
  milestoneReached: number | null    // transient — for milestone popup
  clearMilestone: () => void

  // Feedback
  feedbackGiven: boolean
  setFeedbackGiven: () => void

  // Preferences
  language: 'en' | 'hi'
  fontSize: 'sm' | 'md' | 'lg'
  setLanguage: (lang: 'en' | 'hi') => void
  setFontSize: (size: 'sm' | 'md' | 'lg') => void
}

const todayStr = () => new Date().toISOString().split('T')[0]
const MILESTONES = [3, 7, 14, 21, 30, 60, 100]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (id) => set((s) => ({ bookmarks: [...s.bookmarks, id] })),
      removeBookmark: (id) => set((s) => ({ bookmarks: s.bookmarks.filter((b) => b !== id) })),
      isBookmarked: (id) => get().bookmarks.includes(id),

      lastReadDate: null,
      streak: 0,
      totalRead: 0,
      longestStreak: 0,
      markTodayRead: () => {
        const state = get()
        const today = todayStr()
        if (state.lastReadDate === today) return

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yStr = yesterday.toISOString().split('T')[0]

        const newStreak = state.lastReadDate === yStr ? state.streak + 1 : 1
        const newTotal = state.totalRead + 1
        const newLongest = Math.max(state.longestStreak, newStreak)

        // Check for new badges
        const prevBadges = state.earnedBadgeIds
        const nowBadges = getEarnedBadges(newStreak, newTotal, Object.keys(state.reflections).length).map(b => b.id)
        const justEarned = nowBadges.find(id => !prevBadges.includes(id))

        // Check for milestone
        const hitMilestone = MILESTONES.includes(newStreak) ? newStreak : null

        set({
          lastReadDate: today,
          streak: newStreak,
          totalRead: newTotal,
          longestStreak: newLongest,
          earnedBadgeIds: nowBadges,
          newBadgeId: justEarned || null,
          milestoneReached: hitMilestone,
          quizUnlocked: newStreak >= 30,
        })
      },

      reflections: {},
      saveReflection: (shlokaId, note) => {
        set((s) => {
          const updated = { ...s.reflections, [shlokaId]: note }
          const nowBadges = getEarnedBadges(s.streak, s.totalRead, Object.keys(updated).length).map(b => b.id)
          return { reflections: updated, earnedBadgeIds: nowBadges }
        })
      },

      earnedBadgeIds: [],
      quizCompleted: false,
      quizScore: null,
      quizUnlocked: false,
      setQuizCompleted: (score) => set({
        quizCompleted: true,
        quizScore: score,
        earnedBadgeIds: [...get().earnedBadgeIds, 'arjuna_30'].filter((v, i, a) => a.indexOf(v) === i),
      }),
      newBadgeId: null,
      clearNewBadge: () => set({ newBadgeId: null }),
      milestoneReached: null,
      clearMilestone: () => set({ milestoneReached: null }),

      feedbackGiven: false,
      setFeedbackGiven: () => set({ feedbackGiven: true }),

      language: 'en',
      fontSize: 'md',
      setLanguage: (language) => set({ language }),
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    { name: 'daily-gita-store-v2' }
  )
)
