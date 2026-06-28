import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShlokaCard } from '../components/ShlokaCard'
import { StreakBar } from '../components/StreakBar'
import { DailyCheckIn } from '../components/DailyCheckIn'
import { getDailyShloka, formatDate } from '../utils/shlokaUtils'
import { useAppStore } from '../store/useAppStore'

export function TodayPage() {
  const shloka = getDailyShloka()
  const { lastReadDate } = useAppStore()
  const [streakJustEarned, setStreakJustEarned] = useState(false)

  const todayStr = new Date().toISOString().split('T')[0]
  const doneToday = lastReadDate === todayStr

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#fdf6ec 0%,#faf8f4 40%)', paddingBottom: 100 }}>

      {/* Header */}
      <div style={{ padding: '56px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 22 }}>🪔</span>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1a1208' }}>Daily Gita</h1>
          </div>
          <p style={{ fontSize: 12, color: '#a08050' }}>{formatDate(new Date())}</p>
        </motion.div>

        {doneToday && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: 20, padding: '5px 12px', fontSize: 12, color: '#27500A', fontWeight: 600 }}
          >
            ✓ Done today
          </motion.div>
        )}
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Streak */}
        <StreakBar />

        {/* How streak works — shown until first completion */}
        {!doneToday && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: '#fdf8f0', border: '0.5px solid #f5e8cc', borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'flex-start' }}
          >
            <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: '#8b6020', lineHeight: 1.6 }}>
              Read today's shloka, then answer the reflection question below to earn your streak. Just opening the app doesn't count — your insight does.
            </p>
          </motion.div>
        )}

        {/* The shloka */}
        <div style={{ marginBottom: 2 }}>
          <p style={{ fontSize: 10, color: '#bbb', letterSpacing: '.07em', marginBottom: 8 }}>TODAY'S SHLOKA</p>
          <ShlokaCard shloka={shloka} />
        </div>

        {/* Check-in gate */}
        <DailyCheckIn
          shloka={shloka}
          onComplete={() => setStreakJustEarned(true)}
        />

        {/* After completion — what's next */}
        {doneToday && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '8px 0 4px' }}
          >
            <p style={{ fontSize: 12, color: '#a08050' }}>
              Tomorrow brings a new shloka ✨
            </p>
            <p style={{ fontSize: 11, color: '#ccc', marginTop: 3 }}>
              Come back then to keep your streak alive
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
