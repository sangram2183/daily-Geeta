import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock } from 'lucide-react'
import { BADGES } from '../data/gamification'
import { useAppStore } from '../store/useAppStore'

export function BadgesPage() {
  const navigate = useNavigate()
  const { earnedBadgeIds, streak, quizCompleted, quizScore } = useAppStore()

  return (
    <div style={{ minHeight:'100vh', background:'#faf8f4', paddingBottom:100 }}>
      <div style={{ padding:'60px 16px 12px', display:'flex', alignItems:'center', gap:12, borderBottom:'0.5px solid #f0e8d8', background:'#fff' }}>
        <button onClick={() => navigate(-1)} style={{ width:36, height:36, borderRadius:'50%', background:'#f5f2ec', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <ArrowLeft size={16} color="#666" />
        </button>
        <div>
          <h1 style={{ fontSize:17, fontWeight:600, color:'#1a1208' }}>Your badges</h1>
          <p style={{ fontSize:11, color:'#a08050' }}>{earnedBadgeIds.length} of {BADGES.length} earned</p>
        </div>
      </div>

      {/* Progress summary */}
      <div style={{ padding:'14px 16px' }}>
        <div style={{ background:'#fff', borderRadius:14, border:'0.5px solid #f0e8d8', padding:14, display:'flex', gap:12 }}>
          <div style={{ flex:1, textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:700, color:'#f5a020' }}>{earnedBadgeIds.length}</div>
            <div style={{ fontSize:11, color:'#a08050' }}>badges earned</div>
          </div>
          <div style={{ width:'0.5px', background:'#f0e8d8' }}/>
          <div style={{ flex:1, textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:700, color:'#7f77dd' }}>{streak}</div>
            <div style={{ fontSize:11, color:'#a08050' }}>day streak</div>
          </div>
          <div style={{ width:'0.5px', background:'#f0e8d8' }}/>
          <div style={{ flex:1, textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:700, color:'#1d9e75' }}>
              {quizCompleted ? `${quizScore}/10` : '—'}
            </div>
            <div style={{ fontSize:11, color:'#a08050' }}>quiz score</div>
          </div>
        </div>
      </div>

      {/* Quiz banner */}
      {streak >= 30 && !quizCompleted && (
        <div style={{ padding:'0 16px 14px' }}>
          <button
            onClick={() => navigate('/quiz')}
            style={{
              width:'100%', background:'#EEEDFE', border:'0.5px solid #AFA9EC',
              borderRadius:14, padding:16, cursor:'pointer', textAlign:'left',
              display:'flex', alignItems:'center', gap:12,
            }}
          >
            <span style={{ fontSize:32 }}>🏹</span>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'#3C3489' }}>30-day test unlocked!</div>
              <div style={{ fontSize:11, color:'#534AB7' }}>Take it now to earn your Arjuna badge and certificate</div>
            </div>
            <div style={{ marginLeft:'auto', fontSize:18, color:'#7f77dd' }}>→</div>
          </button>
        </div>
      )}

      {/* Badges grid */}
      <div style={{ padding:'0 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {BADGES.map((badge, i) => {
          const earned = earnedBadgeIds.includes(badge.id)
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity:0, y:10 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                background: earned ? '#fff' : '#f5f2ec',
                border: earned
                  ? badge.special ? '1.5px solid #AFA9EC' : '0.5px solid #f0e8d8'
                  : '0.5px solid #eee',
                borderRadius:14,
                padding:16,
                opacity: earned ? 1 : 0.6,
                position:'relative',
                overflow:'hidden',
              }}
            >
              {badge.special && earned && (
                <div style={{
                  position:'absolute', top:0, right:0,
                  background:'#EEEDFE', fontSize:8, color:'#3C3489',
                  padding:'3px 8px', borderBottomLeftRadius:8, fontWeight:600,
                }}>
                  SPECIAL
                </div>
              )}
              <div style={{ fontSize:36, marginBottom:8 }}>
                {earned ? badge.emoji : <Lock size={28} color="#ccc" />}
              </div>
              <div style={{ fontSize:13, fontWeight:600, color: earned ? '#1a1208' : '#aaa', marginBottom:2 }}>
                {badge.name}
              </div>
              <div style={{ fontSize:11, color: earned ? '#a08050' : '#ccc', lineHeight:1.5, marginBottom:6 }}>
                {badge.description}
              </div>
              <div style={{
                fontSize:10,
                color: earned ? '#1d9e75' : '#bbb',
                fontWeight:500,
                display:'flex', alignItems:'center', gap:4,
              }}>
                {earned ? '✓ Earned' : badge.condition}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
