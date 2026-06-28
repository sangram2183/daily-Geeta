import { Flame, Trophy, Target } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getNextMilestone, getStreakMessage } from '../data/gamification'

const MILESTONE_DAYS = [3, 7, 14, 21, 30, 60, 100]

export function StreakBar() {
  const { streak, totalRead, longestStreak, lastReadDate } = useAppStore()
  const todayStr = new Date().toISOString().split('T')[0]
  const readToday = lastReadDate === todayStr
  const today = new Date()

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return {
      label: ['S','M','T','W','T','F','S'][d.getDay()],
      isToday: i === 6,
      daysAgo: 6 - i,
    }
  })

  const nextMilestone = getNextMilestone(streak)
  const prevMilestone = MILESTONE_DAYS.filter(m => m <= streak).pop() || 0
  const pct = nextMilestone
    ? Math.min(100, ((streak - prevMilestone) / (nextMilestone.days - prevMilestone)) * 100)
    : 100
  const r = 26, circ = 2 * Math.PI * r
  const dashOffset = circ - (circ * pct) / 100
  const circleColor = streak >= 30 ? '#9333EA' : streak >= 14 ? '#E8831A' : '#22C55E'

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(45,18,0,0.95), rgba(26,8,0,0.98))',
      border: '0.5px solid rgba(212,168,83,0.2)',
      borderRadius: 20,
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      padding: 18,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Circle progress */}
        <div style={{ position: 'relative', width: 68, height: 68, flexShrink: 0 }}>
          <svg width="68" height="68" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5"/>
            <circle cx="34" cy="34" r={r} fill="none" stroke={circleColor} strokeWidth="5"
              strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 6px ${circleColor})` }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#FAF0DC', lineHeight: 1 }}>{streak}</span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>days</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Flame size={14} color="#E8831A" style={{ filter: 'drop-shadow(0 0 4px #E8831A)' }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#FAF0DC' }}>
              {streak > 0 ? `${streak} day streak` : 'Start today!'}
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginBottom: 6 }}>
            {getStreakMessage(streak)}
          </p>
          {nextMilestone && (
            <div style={{
              background: 'rgba(232,131,26,0.1)',
              border: '0.5px solid rgba(232,131,26,0.2)',
              borderRadius: 8, padding: '4px 10px',
              fontSize: 11, color: '#E8831A',
            }}>
              {nextMilestone.days - streak} days to {nextMilestone.emoji} {nextMilestone.days}-day reward
            </div>
          )}
        </div>

        {/* Best streak */}
        <div style={{
          background: 'rgba(200,150,12,0.1)',
          border: '0.5px solid rgba(200,150,12,0.2)',
          borderRadius: 12, padding: '8px 12px',
          textAlign: 'center', flexShrink: 0,
        }}>
          <Trophy size={12} color="#C8960C" style={{ margin: '0 auto 2px' }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: '#E8B84B' }}>{longestStreak}</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>best</div>
        </div>
      </div>

      {/* Weekly dots */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
        {days.map((day, i) => {
          const isRead = day.isToday ? readToday : day.daysAgo < streak
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600,
                background: day.isToday && readToday
                  ? 'linear-gradient(135deg, #E8831A, #C8960C)'
                  : isRead ? 'rgba(232,131,26,0.2)' : 'rgba(255,255,255,0.04)',
                border: day.isToday && !readToday
                  ? '1.5px solid #E8831A'
                  : isRead ? '0.5px solid rgba(232,131,26,0.4)' : '0.5px solid rgba(255,255,255,0.08)',
                color: day.isToday && readToday ? '#fff'
                  : isRead ? '#E8831A' : 'rgba(255,255,255,0.2)',
                boxShadow: day.isToday && readToday ? '0 0 12px rgba(232,131,26,0.5)' : 'none',
                transition: 'all 0.3s',
              }}>
                {isRead ? '✓' : day.label}
              </div>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{day.label}</span>
            </div>
          )
        })}
      </div>

      {/* Milestone track */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '.08em' }}>MILESTONE PATH</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{totalRead} read total</span>
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {MILESTONE_DAYS.map((m) => (
            <div key={m} style={{ flex: 1 }}>
              <div style={{
                height: 4, borderRadius: 2,
                background: streak >= m
                  ? 'linear-gradient(90deg, #E8831A, #C8960C)'
                  : 'rgba(255,255,255,0.06)',
                boxShadow: streak >= m ? '0 0 6px rgba(232,131,26,0.4)' : 'none',
                transition: 'all 0.4s',
              }} />
              <div style={{ textAlign: 'center', fontSize: 8, color: streak >= m ? '#C8960C' : 'rgba(255,255,255,0.15)', marginTop: 3 }}>
                {m}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
