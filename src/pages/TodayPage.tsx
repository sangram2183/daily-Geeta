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
  const greeting = hour < 12 ? 'शुभ प्रभात' : hour < 17 ? 'शुभ दोपहर' : 'शुभ संध्या'

  return (
    <div className="bg-page om-bg" style={{ position: 'relative' }}>

      {/* Top glow */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 300, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232,131,26,0.15) 0%, transparent 100%)',
      }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, padding: '56px 20px 24px' }}>
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>

          {/* Greeting */}
          <p style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: 13, color: 'rgba(232,131,26,0.7)', marginBottom: 6, letterSpacing: '.05em' }}>
            {greeting}{user?.name ? `, ${user.name}` : ''} 🙏
          </p>

          {/* Title */}
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 36, fontWeight: 700,
            lineHeight: 1.1, marginBottom: 4,
            background: 'linear-gradient(135deg, #E8B84B, #C8960C)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Today's Shloka
          </h1>

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '.04em' }}>
            {formatDate(new Date())}
          </p>
        </motion.div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760, margin: '0 auto', paddingBottom: 40 }}>

        {/* Streak */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <StreakBar />
        </motion.div>

        {/* Info hint */}
        {!doneToday && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            style={{
              background: 'rgba(232,131,26,0.08)',
              border: '0.5px solid rgba(232,131,26,0.2)',
              borderRadius: 12, padding: '10px 14px',
              display: 'flex', gap: 8, alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              Read today's shloka and answer the reflection below to earn your streak. Insight counts — not just opening the app.
            </p>
          </motion.div>
        )}

        {/* Divider */}
        <div className="divider-gold">
          <span style={{ fontFamily: 'Noto Sans Devanagari', fontSize: 18, color: '#C8960C' }}>ॐ</span>
        </div>

        {/* Shloka card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <ShlokaCard shloka={shloka} />
        </motion.div>

        {/* Check-in */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <DailyCheckIn shloka={shloka} onComplete={() => setDone(true)} />
        </motion.div>

        {/* Post-completion quote */}
        {doneToday && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              textAlign: 'center', padding: '20px',
              background: 'rgba(200,150,12,0.06)',
              border: '0.5px solid rgba(200,150,12,0.15)',
              borderRadius: 16,
            }}
          >
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontStyle: 'italic', color: 'rgba(232,184,75,0.8)', lineHeight: 1.7 }}>
              "Change is the law of the universe.<br />You can be a millionaire or a pauper in an instant."
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 10, letterSpacing: '.06em' }}>
              — BHAGAVAD GITA
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
