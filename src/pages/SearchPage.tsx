import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { searchShlokas, getShlokasByTag, ALL_TAGS, type Shloka } from '../utils/shlokaUtils'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const navigate = useNavigate()

  let results: Shloka[] = []
  if (query.length > 2) results = searchShlokas(query)
  else if (activeTag) results = getShlokasByTag(activeTag)

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Search</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveTag(null) }}
            placeholder="Search by keyword, meaning, or theme..."
            className="w-full pl-9 pr-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-300"
          />
        </div>
      </div>

      {/* Tags */}
      {query.length <= 2 && (
        <div className="px-5 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Browse by theme</p>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  activeTag === tag
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="px-4 space-y-2">
          <p className="text-xs text-gray-400 px-1 mb-2">{results.length} shlokas found</p>
          {results.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(`/shloka/${s.id}`)}
              className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-amber-600 font-medium">{s.id}</span>
                <span className="text-xs text-gray-400">· {s.chapter_name}</span>
              </div>
              <p className="text-sm font-devanagari text-gray-700 leading-relaxed line-clamp-1">
                {s.sanskrit.split('|')[0]}
              </p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.meaning_en}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {s.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {query.length > 2 && results.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">No shlokas found for "{query}"</p>
          <p className="text-xs mt-1">Try searching by theme — like "peace" or "karma"</p>
        </div>
      )}
    </div>
  )
}
