import { useNavigate } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getShlokaById } from '../utils/shlokaUtils'

export function SavedPage() {
  const { bookmarks } = useAppStore()
  const navigate = useNavigate()

  const saved = bookmarks.map(getShlokaById).filter(Boolean)

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-5 pt-14 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800">Saved Shlokas</h1>
        <p className="text-sm text-gray-400 mt-0.5">{saved.length} bookmarked</p>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-8">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
            <Bookmark size={22} className="text-amber-400" />
          </div>
          <p className="text-sm font-medium text-gray-600">No saved shlokas yet</p>
          <p className="text-xs text-gray-400">
            Tap the Save button on any shloka to collect your favourites here
          </p>
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-2">
          {saved.map((s) => s && (
            <button
              key={s.id}
              onClick={() => navigate(`/shloka/${s.id}`)}
              className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-amber-600 font-medium">Ch. {s.chapter} · {s.id}</span>
                <span className="text-xs text-gray-400 truncate">{s.chapter_name}</span>
              </div>
              <p className="text-sm font-devanagari text-gray-700 leading-relaxed line-clamp-2">
                {s.sanskrit.split('|')[0]}
              </p>
              <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{s.meaning_en}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
