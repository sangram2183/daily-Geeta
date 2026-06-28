import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Bookmark, Search, Settings } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Today' },
  { to: '/chapters', icon: BookOpen, label: 'Chapters' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/saved', icon: Bookmark, label: 'Saved' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-safe">
      <div className="max-w-md mx-auto flex">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2.5 gap-1 transition-colors ${
                isActive ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
