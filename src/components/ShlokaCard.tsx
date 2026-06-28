import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, BookmarkCheck, Share2, Volume2, ChevronDown, ChevronUp } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { Shloka } from '../utils/shlokaUtils'

interface Props {
  shloka: Shloka
  showReflection?: boolean
}

export function ShlokaCard({ shloka, showReflection = false }: Props) {
  const { language, fontSize, isBookmarked, addBookmark, removeBookmark, reflections, saveReflection } = useAppStore()
  const [expanded, setExpanded] = useState(false)
  const [reflection, setReflection] = useState(reflections[shloka.id] || '')
  const [saved, setSaved] = useState(false)

  const bookmarked = isBookmarked(shloka.id)

  const fontSizeMap = {
    sm: { sanskrit: 'text-base', meaning: 'text-sm', trans: 'text-xs' },
    md: { sanskrit: 'text-lg', meaning: 'text-base', trans: 'text-sm' },
    lg: { sanskrit: 'text-xl', meaning: 'text-lg', trans: 'text-base' },
  }
  const fs = fontSizeMap[fontSize]

  const handleShare = async () => {
    const text = `🪔 Bhagavad Gita ${shloka.id}\n\n${shloka.sanskrit}\n\n${language === 'hi' ? shloka.meaning_hi : shloka.meaning_en}\n\n— Daily Gita App`
    if (navigator.share) {
      await navigator.share({ title: 'Daily Gita', text })
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  const handleSaveReflection = () => {
    saveReflection(shloka.id, reflection)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden"
    >
      {/* Chapter badge */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-3 border-b border-amber-100 flex items-center justify-between">
        <span className="text-xs font-medium text-amber-700 tracking-wide">
          Chapter {shloka.chapter} · Verse {shloka.verse}
        </span>
        <span className="text-xs text-amber-600">{shloka.chapter_name}</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Sanskrit */}
        <div>
          <p className={`font-devanagari ${fs.sanskrit} text-gray-800 leading-relaxed`}>
            {shloka.sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <div>
          <p className={`${fs.trans} text-gray-500 italic leading-relaxed`}>
            {shloka.transliteration}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Meaning */}
        <div>
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
            {language === 'hi' ? 'अर्थ' : 'Meaning'}
          </p>
          <p className={`${fs.meaning} text-gray-700 leading-relaxed`}>
            {language === 'hi' ? shloka.meaning_hi : shloka.meaning_en}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {shloka.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => bookmarked ? removeBookmark(shloka.id) : addBookmark(shloka.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              bookmarked
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {bookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
            {bookmarked ? 'Saved' : 'Save'}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all"
          >
            <Share2 size={15} />
            Share
          </button>

          {shloka.audio_url && (
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all">
              <Volume2 size={15} />
              Listen
            </button>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Less' : 'More'}
          </button>
        </div>

        {/* Expandable: reflection */}
        <AnimatePresence>
          {(expanded || showReflection) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Your reflection</p>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="How does this shloka speak to you today?"
                  rows={3}
                  className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-100 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-200 bg-amber-50/30"
                />
                <button
                  onClick={handleSaveReflection}
                  className="text-xs px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors font-medium"
                >
                  {saved ? '✓ Saved!' : 'Save reflection'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
