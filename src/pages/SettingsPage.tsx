import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { Type, Bell, Award, Trophy, ChevronRight } from 'lucide-react'
import { BADGES } from '../data/gamification'

export function SettingsPage() {
  const { language, fontSize, setLanguage, setFontSize, streak, totalRead, longestStreak, earnedBadgeIds, quizCompleted, quizScore } = useAppStore()
  const navigate = useNavigate()

  return (
    <div style={{ minHeight:'100vh', background:'#fff', paddingBottom:100 }}>
      <div style={{ padding:'56px 20px 14px', borderBottom:'0.5px solid #f5f0e8' }}>
        <h1 style={{ fontSize:20, fontWeight:600, color:'#1a1208' }}>Settings</h1>
      </div>

      <div style={{ padding:'20px 20px 0', display:'flex', flexDirection:'column', gap:24 }}>

        {/* Stats */}
        <div>
          <p style={{ fontSize:11, color:'#bbb', letterSpacing:'.07em', marginBottom:12 }}>YOUR JOURNEY</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
            {[
              { val: streak, label: 'Day streak', color: '#f5a020' },
              { val: totalRead, label: 'Shlokas read', color: '#7f77dd' },
              { val: longestStreak, label: 'Best streak', color: '#1d9e75' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fdf8f0', borderRadius:14, padding:'12px 8px', border:'0.5px solid #f5e8cc', textAlign:'center' }}>
                <div style={{ fontSize:22, fontWeight:700, color:s.color }}>{s.val}</div>
                <div style={{ fontSize:10, color:'#a08050', lineHeight:1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges link */}
        <div>
          <p style={{ fontSize:11, color:'#bbb', letterSpacing:'.07em', marginBottom:12 }}>ACHIEVEMENTS</p>
          <button
            onClick={() => navigate('/badges')}
            style={{ width:'100%', background:'#fdf8f0', border:'0.5px solid #f5e8cc', borderRadius:14, padding:'14px 16px', display:'flex', alignItems:'center', gap:12, cursor:'pointer', textAlign:'left' }}
          >
            <Award size={20} color="#c07800" />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:500, color:'#1a1208' }}>Badges & achievements</div>
              <div style={{ fontSize:12, color:'#a08050' }}>
                {earnedBadgeIds.length} of {BADGES.length} badges earned
              </div>
            </div>
            <div style={{ display:'flex', gap:2 }}>
              {earnedBadgeIds.slice(0,4).map(id => {
                const b = BADGES.find(x => x.id === id)
                return b ? <span key={id} style={{ fontSize:16 }}>{b.emoji}</span> : null
              })}
            </div>
            <ChevronRight size={16} color="#ccc" />
          </button>

          {/* Quiz link */}
          <button
            onClick={() => navigate('/quiz')}
            style={{ width:'100%', marginTop:10, background: streak >= 30 ? '#EEEDFE' : '#f5f2ec', border:`0.5px solid ${streak >= 30 ? '#AFA9EC' : '#eee'}`, borderRadius:14, padding:'14px 16px', display:'flex', alignItems:'center', gap:12, cursor: streak >= 30 ? 'pointer' : 'default', textAlign:'left' }}
          >
            <Trophy size={20} color={streak >= 30 ? '#7f77dd' : '#ccc'} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:500, color: streak >= 30 ? '#3C3489' : '#bbb' }}>Gita knowledge test</div>
              <div style={{ fontSize:12, color: streak >= 30 ? '#534AB7' : '#ccc' }}>
                {quizCompleted ? `Completed · ${quizScore}/10 score` : streak >= 30 ? 'Unlocked! Take the test' : `Unlock at 30-day streak (${30 - streak} days left)`}
              </div>
            </div>
            <span style={{ fontSize:10, padding:'3px 8px', borderRadius:10, fontWeight:600, background: streak >= 30 ? '#CECBF6' : '#eee', color: streak >= 30 ? '#3C3489' : '#bbb' }}>
              {streak >= 30 ? '🏹' : '🔒'}
            </span>
          </button>
        </div>

        {/* Language */}
        <div>
          <p style={{ fontSize:11, color:'#bbb', letterSpacing:'.07em', marginBottom:12 }}>LANGUAGE</p>
          <div style={{ display:'flex', gap:10 }}>
            {(['en', 'hi'] as const).map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)} style={{
                flex:1, padding:'11px', borderRadius:12, fontSize:14, fontWeight:500,
                border:`0.5px solid ${language === lang ? '#f5a020' : '#eee'}`,
                background: language === lang ? '#fff3e0' : '#fafafa',
                color: language === lang ? '#c07800' : '#888',
                cursor:'pointer',
              }}>
                {lang === 'en' ? 'English' : 'हिंदी'}
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
            <Type size={14} color="#bbb" />
            <p style={{ fontSize:11, color:'#bbb', letterSpacing:'.07em' }}>TEXT SIZE</p>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            {(['sm','md','lg'] as const).map((size, i) => (
              <button key={size} onClick={() => setFontSize(size)} style={{
                flex:1, padding:'11px', borderRadius:12,
                fontSize: [13,15,17][i],
                border:`0.5px solid ${fontSize === size ? '#f5a020' : '#eee'}`,
                background: fontSize === size ? '#fff3e0' : '#fafafa',
                color: fontSize === size ? '#c07800' : '#888',
                cursor:'pointer', fontWeight:500,
              }}>
                A
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
            <Bell size={14} color="#bbb" />
            <p style={{ fontSize:11, color:'#bbb', letterSpacing:'.07em' }}>DAILY REMINDER</p>
          </div>
          <div style={{ background:'#f5f2ec', borderRadius:14, padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <p style={{ fontSize:14, color:'#3d3020', fontWeight:500 }}>Morning reminder</p>
              <p style={{ fontSize:12, color:'#a08050', marginTop:2 }}>6:00 AM daily</p>
            </div>
            <span style={{ fontSize:11, background:'#fff3e0', color:'#c07800', padding:'4px 10px', borderRadius:20, fontWeight:500 }}>
              Coming soon
            </span>
          </div>
        </div>

        <div style={{ textAlign:'center', paddingTop:8, paddingBottom:20, fontSize:12, color:'#ccc', lineHeight:2 }}>
          <p>Daily Gita · v1.0.0</p>
          <p>700 shlokas · 18 chapters · Made with 🙏</p>
        </div>
      </div>
    </div>
  )
}
