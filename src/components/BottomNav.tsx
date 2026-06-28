import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Search, Bookmark, Settings } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Today' },
  { to: '/chapters', icon: BookOpen, label: 'Chapters' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/saved', icon: Bookmark, label: 'Saved' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(250,246,238,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: '0.5px solid rgba(184,134,11,0.15)',
      zIndex: 50,
      alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={({ isActive }) => ({
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3,
            padding: '10px 0 8px',
            textDecoration: 'none',
            color: isActive ? '#E8831A' : 'rgba(139,96,64,0.5)',
            fontSize: 10, fontWeight: isActive ? 500 : 400,
            transition: 'color 0.15s',
          })}
        >
          {({ isActive }) => (
            <>
              <div style={{
                width: 36, height: 28, borderRadius: 10,
                background: isActive ? 'rgba(232,131,26,0.12)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}>
                <Icon size={20} />
              </div>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
