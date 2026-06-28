import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { BADGES } from '../data/gamification'
import { useEffect } from 'react'

export function BadgeToast() {
  const { newBadgeId, clearNewBadge } = useAppStore()
  const badge = newBadgeId ? BADGES.find(b => b.id === newBadgeId) : null

  useEffect(() => {
    if (badge) {
      const t = setTimeout(clearNewBadge, 4000)
      return () => clearTimeout(t)
    }
  }, [badge, clearNewBadge])

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          style={{
            position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
            zIndex: 200, background: '#fff',
            border: '0.5px solid #f0e8d8',
            borderRadius: 16, padding: '12px 20px',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            minWidth: 260,
          }}
        >
          <span style={{ fontSize: 32 }}>{badge.emoji}</span>
          <div>
            <p style={{ fontSize: 11, color: '#a08050', marginBottom: 2, fontWeight: 500 }}>
              NEW BADGE EARNED
            </p>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#1a1208' }}>{badge.name}</p>
            <p style={{ fontSize: 12, color: '#888' }}>{badge.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
