import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getCheckInForShloka } from '../data/checkins'
import type { Shloka } from '../utils/shlokaUtils'

interface Props { shloka: Shloka; onComplete: () => void }
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
    if (reflection.trim()) saveReflection(shloka.id, reflection)
    markTodayRead()
    setPhase('done')
    onComplete()
  }

  if (alreadyDone) {
    return (
      <div style={{
        background: 'rgba(34,197,94,0.08)',
        border: '0.5px solid rgba(34,197,94,0.2)',
        borderRadius: 16, padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(34,197,94,0.15)',
          border: '0.5px solid rgba(34,197,94,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
        }}>✅</div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#4ADE80' }}>Today's practice complete</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Come back tomorrow for the next shloka 🙏</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(45,18,0,0.98), rgba(26,8,0,0.99))',
      border: '0.5px solid rgba(212,168,83,0.2)',
      borderRadius: 20,
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(232,131,26,0.15), rgba(200,150,12,0.08))',
        borderBottom: '0.5px solid rgba(212,168,83,0.15)',
        padding: '12px 18px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 16 }}>🪷</span>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#E8B84B', letterSpacing: '.04em' }}>Daily Reflection</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>Required to earn your streak</p>
        </div>
      </div>

      <div style={{ padding: 18 }}>
        <AnimatePresence mode="wait">
          {phase === 'prompt' && (
            <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, color: '#FAF0DC', lineHeight: 1.7, marginBottom: 18, fontWeight: 500 }}>
                {checkin.question}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {checkin.options.map((opt, i) => (
                  <button key={i} onClick={() => handleSelect(i)} style={{
                    textAlign: 'left', padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '0.5px solid rgba(255,255,255,0.08)',
                    borderRadius: 12, fontSize: 13, color: 'rgba(255,255,255,0.65)',
                    cursor: 'pointer', lineHeight: 1.5,
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(232,131,26,0.1)'
                    el.style.borderColor = 'rgba(232,131,26,0.3)'
                    el.style.color = '#FAF0DC'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.03)'
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                    el.style.color = 'rgba(255,255,255,0.65)'
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(200,150,12,0.1)',
                      border: '0.5px solid rgba(200,150,12,0.2)',
                      color: '#C8960C', fontSize: 10, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              <div style={{ background: 'rgba(232,131,26,0.08)', border: '0.5px solid rgba(232,131,26,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 14 }}>
                <p style={{ fontSize: 11, color: '#E8831A', marginBottom: 4, fontWeight: 600, letterSpacing: '.05em' }}>YOU SAID</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{checkin.options[selected!]}</p>
              </div>

              {checkin.followUp && (
                <div style={{ background: 'rgba(200,150,12,0.06)', border: '0.5px solid rgba(200,150,12,0.15)', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
                  <p style={{ fontSize: 11, color: '#C8960C', marginBottom: 6, fontWeight: 600, letterSpacing: '.05em' }}>💡 REFLECTION</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: '#F5E6C0', lineHeight: 1.7 }}>{checkin.followUp}</p>
                </div>
              )}

              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '.07em', marginBottom: 8 }}>GO DEEPER (OPTIONAL)</p>
                <textarea
                  value={reflection}
                  onChange={e => setReflection(e.target.value)}
                  placeholder="Write your personal reflection on this shloka..."
                  rows={3}
                  style={{ width: '100%', padding: '10px 14px', fontSize: 13, lineHeight: 1.6, resize: 'none', fontFamily: 'Cormorant Garamond, serif' }}
                />
              </div>

              <button onClick={handleComplete} style={{
                width: '100%',
                background: 'linear-gradient(135deg, #E8831A, #C46A0A)',
                border: 'none', borderRadius: 14, padding: '14px',
                fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(232,131,26,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                🔥 Mark today complete — earn streak
              </button>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '16px 0' }}>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} style={{ fontSize: 48, marginBottom: 8 }}>
                🔥
              </motion.div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#E8B84B', marginBottom: 4 }}>Streak earned!</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>You reflected — that's what makes it count.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
