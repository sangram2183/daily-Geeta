import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShlokaCard } from '../components/ShlokaCard'
import { StreakBar } from '../components/StreakBar'
import { DailyCheckIn } from '../components/DailyCheckIn'
import { getDailyShloka, formatDate } from '../utils/shlokaUtils'
import { useAppStore } from '../store/useAppStore'
import { useAuthStore } from '../store/useAuthStore'

export function TodayPage() {
  const shloka = getDailyShloka()
  const { lastReadDate } = useAppStore()
  const { user } = useAuthStore()
  const [, setDone] = useState(false)
  const todayStr = new Date().toISOString().split('T')[0]
  const doneToday = lastReadDate === todayStr

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fdf6ec 0%, #faf8f4 60%)', paddingBottom: 100 }}>

      {/* Hero header */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '56px 20px 28px' }}>
        {/* Decorative glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 300, height: 200,
          background: 'radial-gradient(ellipse, rgba(232,131,26,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: 13, color: '#C4956A', marginBottom: 2 }}>
            {greeting}{user?.name ? `, ${user.name}` : ''} 🙏
          </p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 30, fontWeight: 600,
            color: '#1A0A00', lineHeight: 1.2, marginBottom: 4,
          }}>
            Today's Shloka
          </h1>
          <p style={{ fontSize: 12, color: '#C4956A' }}>{formatDate(new Date())}</p>
        </motion.div>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720, margin: '0 auto' }}>

        {/* Streak */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <StreakBar />
        </motion.div>

        {/* Engagement hint */}
        {!doneToday && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            style={{
              background: 'rgba(184,134,11,0.08)',
              border: '0.5px solid rgba(184,134,11,0.2)',
              borderRadius: 12, padding: '10px 14px',
              display: 'flex', gap: 8, alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: '#8B6040', lineHeight: 1.6 }}>
              Read the shloka below and answer the reflection to earn your streak. Insight counts — not just opening the app.
            </p>
          </motion.div>
        )}

        {/* Shloka label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.3))' }} />
          <span style={{ fontSize: 10, color: '#C4956A', letterSpacing: '.1em' }}>SHLOKA OF THE DAY</span>
          <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg, rgba(184,134,11,0.3), transparent)' }} />
        </div>

        {/* Main card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <ShlokaCard shloka={shloka} />
        </motion.div>

        {/* Check-in */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <DailyCheckIn shloka={shloka} onComplete={() => setDone(true)} />
        </motion.div>

        {doneToday && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '12px 0' }}
          >
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: '#8B6040', fontStyle: 'italic' }}>
              "You are what you believe in.<br />You become that which you believe you can become."
            </p>
            <p style={{ fontSize: 11, color: '#C4956A', marginTop: 6 }}>— Bhagavad Gita</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
