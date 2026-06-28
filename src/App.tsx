import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { SidebarNav } from './components/SidebarNav'
import { BottomNav } from './components/BottomNav'
import { MilestonePopup } from './components/MilestonePopup'
import { BadgeToast } from './components/BadgeToast'
import { FeedbackButton } from './components/FeedbackButton'
import { AuthPage } from './pages/AuthPage'
import { TodayPage } from './pages/TodayPage'
import { ChaptersPage } from './pages/ChaptersPage'
import { SearchPage } from './pages/SearchPage'
import { SavedPage } from './pages/SavedPage'
import { SettingsPage } from './pages/SettingsPage'
import { ShlokaDetailPage } from './pages/ShlokaDetailPage'
import { QuizPage } from './pages/QuizPage'
import { BadgesPage } from './pages/BadgesPage'

function AppShell() {
  return (
    <div className="app-shell">
      <SidebarNav />
      <main className="main-content" style={{ flex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<TodayPage />} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/shloka/:id" element={<ShlokaDetailPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/badges" element={<BadgesPage />} />
        </Routes>
      </main>
      <BottomNav />
      <MilestonePopup />
      <BadgeToast />
      <FeedbackButton />
      <Toaster position="top-center" toastOptions={{
        style: { background: '#FAF6EE', color: '#1A0A00', border: '0.5px solid rgba(184,134,11,0.2)', borderRadius: 12 }
      }} />
    </div>
  )
}

export default function App() {
  const { user } = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/*" element={user ? <AppShell /> : <Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}
