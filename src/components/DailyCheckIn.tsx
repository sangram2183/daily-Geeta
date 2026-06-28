import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getCheckInForShloka } from '../data/checkins'
import type { Shloka } from '../utils/shlokaUtils'

interface Props {
  shloka: Shloka
  onComplete: () => void  // called when streak is earned
}

type Phase = 'prompt' | 'answered' | 'done'

export function DailyCheckIn({ shloka, onComplete }: Props) {
  const checkin = getCheckInForShloka(shloka.id)
  const [phase, setPhase] = useState<Phase>('prompt')
  const [selected, setSelected] = useState<number | null>(null)
  const [reflection, setReflection] = useState('')
  const { saveReflection, markTodayRead, lastReadDate } = useAppStore()

  const todayStr = new Date().toISOString().split('T')[0]
  const alreadyDone = lastReadDate === todayStr

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setPhase('answered')
  }

  const handleComplete = () => {
    if (reflection.trim().length > 0) {
      saveReflection(shloka.id, reflection)
    }
    markTodayRead()
    setPhase('done')
    onComplete()
  }

  // Already done today
  if (alreadyDone) {
    return (
      <div style={{
        background: '#EAF3DE', border: '0.5px solid #C0DD97',
        borderRadius: 16, padding: 16, textAlign: 'center',
      }}>
        <div style={{ fontSize: 24, marginBottom: 6 }}>✅</div>
        <p style={{ fontSize: 13, color: '#27500A', fontWeight: 600 }}>Today's practice complete</p>
        <p style={{ fontSize: 11, color: '#3B6D11', marginTop: 3 }}>Come back tomorrow for the next shloka</p>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff', border: '0.5px solid #f0e8d8', borderRadius: 18, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: '#fdf8f0', borderBottom: '0.5px solid #f0e8d8', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>🪷</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#c07800' }}>Today's reflection — required to earn your streak</span>
      </div>

      <div style={{ padding: 16 }}>
        <AnimatePresence mode="wait">
          {phase === 'prompt' && (
            <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ fontSize: 14, color: '#1a1208', fontWeight: 500, lineHeight: 1.7, marginBottom: 16 }}>
                {checkin.question}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {checkin.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    style={{
                      textAlign: 'left', padding: '12px 14px',
                      background: '#faf8f4', border: '0.5px solid #f0e8d8',
                      borderRadius: 12, fontSize: 13, color: '#3d3020',
                      cursor: 'pointer', lineHeight: 1.5,
                      transition: 'all 0.15s',
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff3e0'; (e.currentTarget as HTMLElement).style.borderColor = '#f5d080' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#faf8f4'; (e.currentTarget as HTMLElement).style.borderColor = '#f0e8d8' }}
                  >
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: '#f5f0e8', color: '#a08050', fontSize: 11,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600,
                    }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'answered' && (
            <motion.div key="answered" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {/* Show selected answer */}
              <div style={{ background: '#fff3e0', border: '0.5px solid #f5d080', borderRadius: 12, padding: '10px 14px', marginBottom: 14, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>🙏</span>
                <p style={{ fontSize: 12, color: '#c07800', lineHeight: 1.6 }}>
                  <strong>You said:</strong> {checkin.options[selected!]}
                </p>
              </div>

              {/* Follow-up insight */}
              {checkin.followUp && (
                <div style={{ background: '#fdf8f0', border: '0.5px solid #f5e8cc', borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
                  <p style={{ fontSize: 12, color: '#8b6020', lineHeight: 1.7 }}>{checkin.followUp}</p>
                </div>
              )}

              {/* Optional deeper reflection */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 11, color: '#a08050', marginBottom: 6, letterSpacing: '.05em' }}>
                  WANT TO GO DEEPER? (optional)
                </p>
                <textarea
                  value={reflection}
                  onChange={e => setReflection(e.target.value)}
                  placeholder="Write a personal note about this shloka..."
                  rows={3}
                  style={{
                    width: '100%', border: '0.5px solid #f0e8d8', borderRadius: 12,
                    padding: '10px 12px', fontSize: 13, color: '#3d3020',
                    background: '#faf8f4', resize: 'none', fontFamily: 'inherit', outline: 'none',
                  }}
                />
              </div>

              <button
                onClick={handleComplete}
                style={{
                  width: '100%', background: '#f5a020', color: '#fff',
                  border: 'none', borderRadius: 14, padding: '14px',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                ✓ Mark today complete — earn streak
              </button>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '10px 0' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ type: 'spring', damping: 12 }}
                style={{ fontSize: 44, marginBottom: 8 }}
              >
                🔥
              </motion.div>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#1a1208', marginBottom: 4 }}>Streak earned!</p>
              <p style={{ fontSize: 12, color: '#a08050' }}>You reflected — that's what makes it count.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
