import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getJustReachedMilestone } from '../data/gamification'
import { useNavigate } from 'react-router-dom'

export function MilestonePopup() {
  const { milestoneReached, clearMilestone, streak } = useAppStore()
  const navigate = useNavigate()

  const milestone = milestoneReached ? getJustReachedMilestone(milestoneReached) : null
  const show = !!milestone

  const handleCTA = () => {
    clearMilestone()
    if (milestone?.rewardType === 'quiz') {
      navigate('/quiz')
    }
  }

  return (
    <AnimatePresence>
      {show && milestone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 18 }}
            style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '32px 24px',
              maxWidth: '340px',
              width: '100%',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <button
              onClick={() => clearMilestone()}
              style={{
                position: 'absolute', top: 14, right: 14,
                background: '#f5f0e8', border: 'none', borderRadius: '50%',
                width: 30, height: 30, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <X size={14} color="#888" />
            </button>

            {/* Big emoji with pulse */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              style={{ fontSize: 64, marginBottom: 12 }}
            >
              {milestone.emoji}
            </motion.div>

            {/* Confetti dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
              {['#f5a020', '#7f77dd', '#1d9e75', '#d85a30', '#378add'].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0 }}
                  animate={{ y: [-8, 0, -5, 0] }}
                  transition={{ delay: i * 0.1, duration: 0.6, repeat: 3 }}
                  style={{ width: 8, height: 8, borderRadius: '50%', background: c }}
                />
              ))}
            </div>

            <div style={{
              background: milestone.color,
              borderRadius: 12, padding: '6px 14px',
              display: 'inline-block', marginBottom: 12,
              fontSize: 12, color: '#555', fontWeight: 500,
            }}>
              {streak} day streak
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1208', marginBottom: 8 }}>
              {milestone.title}
            </h2>

            <p style={{ fontSize: 14, color: '#a08050', lineHeight: 1.6, marginBottom: 20 }}>
              {milestone.reward}
            </p>

            {milestone.rewardType === 'quiz' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={handleCTA}
                  style={{
                    background: '#7f77dd', color: '#fff', border: 'none',
                    borderRadius: 12, padding: '13px 24px', fontSize: 15,
                    fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Take the Gita test 🏹
                </button>
                <button
                  onClick={() => clearMilestone()}
                  style={{
                    background: 'transparent', color: '#a08050', border: 'none',
                    fontSize: 13, cursor: 'pointer',
                  }}
                >
                  Take it later
                </button>
              </div>
            ) : (
              <button
                onClick={() => clearMilestone()}
                style={{
                  background: '#f5a020', color: '#fff', border: 'none',
                  borderRadius: 12, padding: '13px 24px', fontSize: 15,
                  fontWeight: 600, cursor: 'pointer', width: '100%',
                }}
              >
                Claim reward ✨
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
