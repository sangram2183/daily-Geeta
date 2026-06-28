import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, BookmarkCheck, Share2, Volume2, ChevronDown, ChevronUp } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { Shloka } from '../utils/shlokaUtils'

interface Props { shloka: Shloka }

export function ShlokaCard({ shloka }: Props) {
  const { language, fontSize, isBookmarked, addBookmark, removeBookmark } = useAppStore()
  const [expanded, setExpanded] = useState(false)
  const bookmarked = isBookmarked(shloka.id)

  const fsMap = { sm: { s: 14, m: 13, t: 11 }, md: { s: 17, m: 15, t: 12 }, lg: { s: 20, m: 17, t: 14 } }
  const fs = fsMap[fontSize]

  const handleShare = async () => {
    const text = `🪔 Bhagavad Gita ${shloka.id}\n\n${shloka.sanskrit}\n\n${language === 'hi' ? shloka.meaning_hi : shloka.meaning_en}\n\n— Daily Gita`
    if (navigator.share) await navigator.share({ title: 'Daily Gita', text })
    else await navigator.clipboard.writeText(text)
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.9)',
      border: '0.5px solid rgba(184,134,11,0.2)',
      borderRadius: 20,
      boxShadow: '0 4px 24px rgba(184,134,11,0.08), 0 1px 4px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
      {/* Chapter badge */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF8E1, #FFF3E0)',
        borderBottom: '0.5px solid rgba(184,134,11,0.15)',
        padding: '10px 18px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: '#B8860B', fontWeight: 600, letterSpacing: '.06em' }}>
          CHAPTER {shloka.chapter} · VERSE {shloka.verse}
        </span>
        <span style={{ fontSize: 11, color: '#C4956A' }}>{shloka.chapter_name}</span>
      </div>

      <div style={{ padding: 20 }}>
        {/* Sanskrit */}
        <p style={{
          fontFamily: 'Noto Sans Devanagari, sans-serif',
          fontSize: fs.s, color: '#1A0A00', lineHeight: 1.9,
          marginBottom: 12,
        }}>
          {shloka.sanskrit}
        </p>

        {/* Transliteration */}
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: fs.t + 1, color: '#C4956A', fontStyle: 'italic',
          lineHeight: 1.7, marginBottom: 16,
        }}>
          {shloka.transliteration}
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.3), transparent)' }} />
          <span style={{ fontSize: 14, color: '#DAA520' }}>ॐ</span>
          <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.3), transparent)' }} />
        </div>

        {/* Meaning */}
        <p style={{ fontSize: 10, color: '#C4956A', letterSpacing: '.08em', marginBottom: 8 }}>
          {language === 'hi' ? 'अर्थ' : 'MEANING'}
        </p>
        <p style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, sans-serif' : 'Cormorant Garamond, serif',
          fontSize: fs.m + 1, color: '#2D1500', lineHeight: 1.75,
        }}>
          {language === 'hi' ? shloka.meaning_hi : shloka.meaning_en}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 14 }}>
          {shloka.tags?.map((tag: string) => (
            <span key={tag} style={{
              fontSize: 10, padding: '3px 10px',
              borderRadius: 20,
              background: 'rgba(184,134,11,0.08)',
              color: '#8B6040',
              border: '0.5px solid rgba(184,134,11,0.15)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button
            onClick={() => bookmarked ? removeBookmark(shloka.id) : addBookmark(shloka.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 500,
              border: `0.5px solid ${bookmarked ? '#DAA520' : 'rgba(184,134,11,0.2)'}`,
              background: bookmarked ? '#FFF8E1' : 'transparent',
              color: bookmarked ? '#B8860B' : '#8B6040',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            {bookmarked ? 'Saved' : 'Save'}
          </button>

          <button
            onClick={handleShare}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 500,
              border: '0.5px solid rgba(184,134,11,0.2)',
              background: 'transparent', color: '#8B6040',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <Share2 size={14} /> Share
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', color: '#C4956A',
              fontSize: 11, cursor: 'pointer',
            }}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Less' : 'More'}
          </button>
        </div>

        {/* Expandable commentary */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: 16, borderTop: '0.5px solid rgba(184,134,11,0.1)', marginTop: 14 }}>
                <p style={{ fontSize: 11, color: '#C4956A', letterSpacing: '.07em', marginBottom: 8 }}>CHAPTER NAME</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: '#2D1500', marginBottom: 4 }}>{shloka.chapter_name}</p>
                <p style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: 13, color: '#8B6040' }}>{shloka.chapter_name_hi}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
