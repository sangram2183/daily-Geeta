import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'

export function AuthPage() {
  const { signInAsGuest } = useAuthStore()
  const [step, setStep] = useState<'landing' | 'name'>('landing')
  const [name, setName] = useState('')

  const handleGuest = () => {
    if (step === 'landing') { setStep('name'); return }
    signInAsGuest(name.trim() || 'Seeker')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1A0A00 0%, #2D1500 40%, #1A0800 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Om watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 400, color: 'rgba(184,134,11,0.04)',
        fontFamily: 'Noto Sans Devanagari, sans-serif',
        pointerEvents: 'none', userSelect: 'none',
        lineHeight: 1,
      }}>ॐ</div>

      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,131,26,0.12) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,134,11,0.1) 0%, transparent 70%)' }} />

      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

        {step === 'landing' ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            {/* Logo */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 72, marginBottom: 8 }}
            >
              🪔
            </motion.div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 42, fontWeight: 600,
              color: '#DAA520', marginBottom: 4,
              letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              Daily Gita
            </h1>
            <p style={{
              fontFamily: 'Noto Sans Devanagari, sans-serif',
              fontSize: 16, color: '#C4956A', marginBottom: 6,
            }}>
              दैनिक गीता
            </p>

            {/* Tagline */}
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 18, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 48, lineHeight: 1.6,
            }}>
              One shloka. One reflection.<br />Every single day.
            </p>

            {/* Sanskrit verse decoration */}
            <div style={{
              background: 'rgba(184,134,11,0.1)',
              border: '0.5px solid rgba(184,134,11,0.2)',
              borderRadius: 16, padding: '14px 20px',
              marginBottom: 40,
            }}>
              <p style={{
                fontFamily: 'Noto Sans Devanagari, sans-serif',
                fontSize: 13, color: 'rgba(218,165,32,0.8)',
                lineHeight: 1.9, margin: 0,
              }}>
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
              </p>
              <p style={{ fontSize: 11, color: 'rgba(196,149,106,0.7)', marginTop: 6, fontStyle: 'italic' }}>
                — Bhagavad Gita 2.47
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Google sign in - visual only for now */}
              <button
                onClick={() => signInAsGuest('Devotee')}
                style={{
                  width: '100%', padding: '14px',
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none', borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontSize: 15, fontWeight: 600, color: '#1a1208',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={handleGuest}
                style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #E8831A, #F5A623)',
                  border: 'none', borderRadius: 14,
                  fontSize: 15, fontWeight: 600, color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(232,131,26,0.4)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                🙏 Begin as a Seeker
              </button>
            </div>

            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 20 }}>
              No account needed to start · Free forever
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 30, color: '#DAA520', marginBottom: 8,
            }}>
              What shall we call you?
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
              Your name will personalize your daily practice
            </p>

            <input
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGuest()}
              placeholder="Your name..."
              autoFocus
              style={{
                width: '100%', padding: '14px 18px',
                background: 'rgba(255,255,255,0.08)',
                border: '0.5px solid rgba(184,134,11,0.3)',
                borderRadius: 14, fontSize: 16,
                color: '#fff', outline: 'none',
                marginBottom: 16, textAlign: 'center',
                fontFamily: 'Cormorant Garamond, serif',
              }}
            />

            <button
              onClick={handleGuest}
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #E8831A, #F5A623)',
                border: 'none', borderRadius: 14,
                fontSize: 15, fontWeight: 600, color: '#fff',
                cursor: 'pointer',
              }}
            >
              Begin my journey ✨
            </button>

            <button
              onClick={() => setStep('landing')}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', marginTop: 16 }}
            >
              ← Back
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
