import { Flame, Trophy } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getNextMilestone, getStreakMessage } from '../data/gamification'

const MILESTONE_DAYS = [3, 7, 14, 21, 30, 60, 100]

export function StreakBar() {
  const { streak, totalRead, longestStreak, lastReadDate } = useAppStore()

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const readToday = lastReadDate === todayStr

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
  const progress = nextMilestone
    ? ((streak - prevMilestone) / (nextMilestone.days - prevMilestone)) * 100
    : 100
  const pct = Math.min(100, Math.max(0, progress))
  const r = 26
  const circ = 2 * Math.PI * r
  const dashOffset = circ - (circ * pct) / 100

  const circleColor = streak >= 30 ? '#7f77dd' : streak >= 14 ? '#f5a020' : '#5dcaa5'

  return (
    <div style={{ background:'#fff', border:'0.5px solid #f0e8d8', borderRadius:18, padding:16, display:'flex', flexDirection:'column', gap:14 }}>
      {/* Top row */}
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        {/* Circle */}
        <div style={{ position:'relative', width:64, height:64, flexShrink:0 }}>
          <svg width="64" height="64" style={{ transform:'rotate(-90deg)' }}>
            <circle cx="32" cy="32" r={r} fill="none" stroke="#f5f0e8" strokeWidth="4"/>
            <circle cx="32" cy="32" r={r} fill="none" stroke={circleColor} strokeWidth="4"
              strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dashOffset}
              style={{ transition:'stroke-dashoffset 0.6s ease' }}/>
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:18, fontWeight:700, color:'#1a1208', lineHeight:1 }}>{streak}</span>
            <span style={{ fontSize:9, color:'#a08050' }}>days</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
            <Flame size={14} color="#f5a020"/>
            <span style={{ fontSize:13, fontWeight:600, color:'#1a1208' }}>
              {streak > 0 ? `${streak} day streak` : 'Start today!'}
            </span>
          </div>
          <p style={{ fontSize:11, color:'#a08050', lineHeight:1.5, marginBottom:4 }}>
            {getStreakMessage(streak)}
          </p>
          {nextMilestone && (
            <div style={{ background:'#fdf8f0', border:'0.5px solid #f5e8cc', borderRadius:8, padding:'4px 8px', fontSize:11, color:'#c07800' }}>
              {nextMilestone.days - streak} days to {nextMilestone.emoji} {nextMilestone.days}-day milestone
            </div>
          )}
        </div>

        {/* Best */}
        <div style={{ textAlign:'center', flexShrink:0 }}>
          <div style={{ background:'#f5f2ec', borderRadius:10, padding:'6px 10px', display:'flex', flexDirection:'column', alignItems:'center' }}>
            <Trophy size={12} color="#c07800"/>
            <span style={{ fontSize:14, fontWeight:700, color:'#c07800' }}>{longestStreak}</span>
            <span style={{ fontSize:9, color:'#a08050' }}>best</span>
          </div>
        </div>
      </div>

      {/* Weekly dots */}
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        {days.map((day, i) => {
          const isRead = day.isToday ? readToday : day.daysAgo < streak
          return (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
              <div style={{
                width:30, height:30, borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:500,
                background: day.isToday && readToday ? '#f5a020' : isRead ? '#fff3e0' : '#f5f2ec',
                border: day.isToday && !readToday ? '2px solid #f5a020' : 'none',
                color: day.isToday && readToday ? '#fff' : isRead ? '#c07800' : '#ccc',
                transition:'all 0.3s',
              }}>
                {isRead ? '✓' : day.label}
              </div>
              <span style={{ fontSize:9, color:'#ccc' }}>{day.label}</span>
            </div>
          )
        })}
      </div>

      {/* Milestone track */}
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:10, color:'#bbb', letterSpacing:'.06em' }}>MILESTONE TRACK</span>
          <span style={{ fontSize:10, color:'#bbb' }}>{totalRead} read total</span>
        </div>
        <div style={{ display:'flex', gap:3, alignItems:'center' }}>
          {MILESTONE_DAYS.map((m) => (
            <div key={m} style={{ flex:1, position:'relative' }}>
              <div style={{
                height:5, borderRadius:3,
                background: streak >= m ? '#f5a020' : '#f5f0e8',
                transition:'background 0.4s',
              }}/>
              <div style={{ textAlign:'center', fontSize:8, color: streak >= m ? '#c07800' : '#ddd', marginTop:2 }}>
                {m}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
