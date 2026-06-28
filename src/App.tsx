import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { BottomNav } from './components/BottomNav'
import { MilestonePopup } from './components/MilestonePopup'
import { BadgeToast } from './components/BadgeToast'
import { FeedbackButton } from './components/FeedbackButton'
import { TodayPage } from './pages/TodayPage'
import { ChaptersPage } from './pages/ChaptersPage'
import { SearchPage } from './pages/SearchPage'
import { SavedPage } from './pages/SavedPage'
import { SettingsPage } from './pages/SettingsPage'
import { ShlokaDetailPage } from './pages/ShlokaDetailPage'
import { QuizPage } from './pages/QuizPage'
import { BadgesPage } from './pages/BadgesPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto relative min-h-screen">
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
        <BottomNav />
        <MilestonePopup />
        <BadgeToast />
        <FeedbackButton />
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  )
}
