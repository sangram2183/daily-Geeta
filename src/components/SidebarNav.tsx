import { NavLink, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Search, Bookmark, Award, Settings, LogOut, Trophy } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useAppStore } from '../store/useAppStore'

const links = [
  { to: '/', icon: Home, label: 'Today' },
  { to: '/chapters', icon: BookOpen, label: 'Chapters' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/saved', icon: Bookmark, label: 'Saved' },
  { to: '/badges', icon: Award, label: 'Badges' },
  { to: '/quiz', icon: Trophy, label: 'Gita Test' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function SidebarNav() {
  const { user, signOut } = useAuthStore()
  const { streak } = useAppStore()
  const navigate = useNavigate()

  return (
    <aside className="sidebar-nav" style={{
      position: 'fixed', top: 0, left: 0, bottom: 0,
      width: 260, zIndex: 50,
      background: 'linear-gradient(180deg, #1A0A00 0%, #2D1500 100%)',
      borderRight: '0.5px solid rgba(184,134,11,0.15)',
      flexDirection: 'column',
      padding: '32px 0',
    }}>
      {/* Logo */}
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🪔</span>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#DAA520', lineHeight: 1 }}>
              Daily Gita
            </h1>
            <p style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: 11, color: 'rgba(196,149,106,0.7)' }}>
              दैनिक गीता
            </p>
          </div>
        </div>
      </div>

      {/* Streak pill */}
      {streak > 0 && (
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{ background: 'rgba(232,131,26,0.15)', border: '0.5px solid rgba(232,131,26,0.3)', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ fontSize: 13, color: '#F5A623', fontWeight: 500 }}>{streak} day streak</span>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', borderRadius: 12,
              textDecoration: 'none',
              background: isActive ? 'rgba(232,131,26,0.15)' : 'transparent',
              color: isActive ? '#F5A623' : 'rgba(255,255,255,0.5)',
              fontSize: 14, fontWeight: isActive ? 500 : 400,
              transition: 'all 0.15s',
              borderLeft: isActive ? '2px solid #F5A623' : '2px solid transparent',
            })}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: '24px', borderTop: '0.5px solid rgba(184,134,11,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E8831A, #DAA520)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 600, color: '#fff', flexShrink: 0,
          }}>
            {user?.avatar
              ? <img src={user.avatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
              : (user?.name?.[0] || 'S')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: '#FAF6EE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Seeker'}
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
              {user?.provider === 'guest' ? 'Guest' : user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => { signOut(); navigate('/') }}
          style={{
            width: '100%', padding: '8px', borderRadius: 10,
            background: 'rgba(255,255,255,0.05)',
            border: '0.5px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)', fontSize: 13,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  )
}
