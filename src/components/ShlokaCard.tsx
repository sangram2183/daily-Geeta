import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, BookmarkCheck, Share2, ChevronDown, ChevronUp } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { Shloka } from '../utils/shlokaUtils'

interface Props { shloka: Shloka }

export function ShlokaCard({ shloka }: Props) {
  const { language, fontSize, isBookmarked, addBookmark, removeBookmark } = useAppStore()
  const [expanded, setExpanded] = useState(false)
  const bookmarked = isBookmarked(shloka.id)

  const fsMap = {
    sm: { s: 15, m: 13, t: 11 },
    md: { s: 18, m: 15, t: 12 },
    lg: { s: 21, m: 17, t: 14 },
  }
  const fs = fsMap[fontSize]

  const handleShare = async () => {
    const text = `🪔 Bhagavad Gita ${shloka.id}\n\n${shloka.sanskrit}\n\n${language === 'hi' ? shloka.meaning_hi : shloka.meaning_en}\n\n— Daily Gita`
    if (navigator.share) await navigator.share({ title: 'Daily Gita', text })
    else await navigator.clipboard.writeText(text)
  }

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(45,18,0,0.98), rgba(26,8,0,0.99))',
      border: '0.5px solid rgba(212,168,83,0.3)',
      borderRadius: 22,
      boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,168,83,0.12)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Corner decoration */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120,
        background: 'radial-gradient(circle at top right, rgba(232,131,26,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Chapter badge */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(200,150,12,0.15), rgba(200,150,12,0.05))',
        borderBottom: '0.5px solid rgba(212,168,83,0.2)',
        padding: '12px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E8831A, #C8960C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#fff',
            boxShadow: '0 2px 8px rgba(232,131,26,0.4)',
          }}>
            {shloka.chapter}
          </div>
          <div>
            <p style={{ fontSize: 11, color: '#C8960C', fontWeight: 600, letterSpacing: '.07em' }}>
              CHAPTER {shloka.chapter} · VERSE {shloka.verse}
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>
              {shloka.chapter_name}
            </p>
          </div>
        </div>
        <div style={{
          background: 'rgba(200,150,12,0.1)',
          border: '0.5px solid rgba(200,150,12,0.2)',
          borderRadius: 8, padding: '3px 10px',
          fontSize: 11, color: '#E8B84B',
        }}>
          {shloka.id}
        </div>
      </div>

      <div style={{ padding: '20px 20px 8px' }}>

        {/* Sanskrit — hero text */}
        <div style={{
          background: 'rgba(200,150,12,0.05)',
          border: '0.5px solid rgba(200,150,12,0.1)',
          borderRadius: 14, padding: '16px',
          marginBottom: 14,
        }}>
          <p style={{ fontSize: 9, color: '#C8960C', letterSpacing: '.1em', marginBottom: 10, fontWeight: 600 }}>
            संस्कृत — SANSKRIT
          </p>
          <p style={{
            fontFamily: 'Noto Sans Devanagari, sans-serif',
            fontSize: fs.s, color: '#F5E6C0',
            lineHeight: 2, fontWeight: 500,
          }}>
            {shloka.sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: fs.t + 2, color: 'rgba(200,150,12,0.6)',
          fontStyle: 'italic', lineHeight: 1.7,
          marginBottom: 16, paddingLeft: 4,
        }}>
          {shloka.transliteration}
        </p>

        {/* Om divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(200,150,12,0.4))' }} />
          <span style={{ fontFamily: 'Noto Sans Devanagari', fontSize: 16, color: '#C8960C' }}>ॐ</span>
          <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg, rgba(200,150,12,0.4), transparent)' }} />
        </div>

        {/* Meaning */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 9, color: '#C8960C', letterSpacing: '.1em', marginBottom: 10, fontWeight: 600 }}>
            {language === 'hi' ? 'अर्थ — MEANING' : 'MEANING — अर्थ'}
          </p>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, sans-serif' : 'Cormorant Garamond, serif',
            fontSize: fs.m + 2,
            color: '#FAF0DC',
            lineHeight: 1.85, fontWeight: 400,
          }}>
            {language === 'hi' ? (shloka.meaning_hi || shloka.meaning_en) : shloka.meaning_en}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {shloka.tags?.slice(0, 5).map((tag: string) => (
            <span key={tag} style={{
              fontSize: 10, padding: '3px 10px', borderRadius: 20,
              background: 'rgba(200,150,12,0.1)',
              color: '#C8960C',
              border: '0.5px solid rgba(200,150,12,0.2)',
              letterSpacing: '.04em',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex', gap: 8, paddingTop: 12,
          borderTop: '0.5px solid rgba(212,168,83,0.1)',
          paddingBottom: 12,
        }}>
          <button
            onClick={() => bookmarked ? removeBookmark(shloka.id) : addBookmark(shloka.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 500,
              border: `0.5px solid ${bookmarked ? 'rgba(200,150,12,0.5)' : 'rgba(255,255,255,0.1)'}`,
              background: bookmarked ? 'rgba(200,150,12,0.15)' : 'rgba(255,255,255,0.05)',
              color: bookmarked ? '#E8B84B' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            {bookmarked ? 'Saved' : 'Save'}
          </button>

          <button
            onClick={handleShare}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 10, fontSize: 12,
              border: '0.5px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <Share2 size={14} /> Share
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: 'none',
              color: 'rgba(200,150,12,0.5)', fontSize: 11, cursor: 'pointer',
            }}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Less' : 'Context'}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: '14px', marginBottom: 12,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{ fontSize: 10, color: '#C8960C', letterSpacing: '.08em', marginBottom: 8 }}>
                  CHAPTER NAME
                </p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: '#FAF0DC', marginBottom: 4 }}>
                  {shloka.chapter_name}
                </p>
                <p style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  {shloka.chapter_name_hi}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
