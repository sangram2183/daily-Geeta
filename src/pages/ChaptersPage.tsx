import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { getChapters, getShlokasByChapter } from '../utils/shlokaUtils'

export function ChaptersPage() {
  const chapters = getChapters()
  const [selected, setSelected] = useState<number | null>(null)
  const navigate = useNavigate()

  const shlokas = selected !== null ? getShlokasByChapter(selected) : []

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-5 pt-14 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800">All 18 Chapters</h1>
        <p className="text-sm text-gray-400 mt-0.5">Explore the Bhagavad Gita</p>
      </div>

      {selected === null ? (
        <div className="divide-y divide-gray-50">
          {chapters.map((ch, i) => (
            <motion.button
              key={ch.chapter}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(ch.chapter)}
              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-amber-50/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-sm font-semibold text-amber-700 flex-shrink-0">
                {ch.chapter}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{ch.name}</p>
                <p className="text-xs text-gray-400">{ch.name_hi}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-xs">{ch.count} verses</span>
                <ChevronRight size={14} />
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="pb-4">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 px-5 py-3 text-sm text-amber-600 font-medium"
          >
            ← Back to chapters
          </button>
          <div className="px-4 mb-3">
            <h2 className="text-base font-semibold text-gray-800">
              Chapter {selected}: {chapters.find(c => c.chapter === selected)?.name}
            </h2>
          </div>
          <div className="px-4 space-y-2">
            {shlokas.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/shloka/${s.id}`)}
                className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors border border-gray-100"
              >
                <p className="text-xs text-amber-600 font-medium mb-1">Verse {s.verse}</p>
                <p className="text-sm font-devanagari text-gray-700 leading-relaxed line-clamp-2">
                  {s.sanskrit.split('|')[0]}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{s.meaning_en}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
