import { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<string>('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)
  const { feedbackGiven, setFeedbackGiven } = useAppStore()

  const submit = () => {
    if (!msg.trim()) return
    // In production: POST to /api/feedback
    console.log('Feedback:', { type, msg })
    setSent(true)
    setFeedbackGiven()
    setTimeout(() => { setOpen(false); setSent(false); setMsg(''); setType('') }, 2000)
  }

  const types = [
    { id: 'bug', label: '🐛 Bug' },
    { id: 'feature', label: '💡 Feature idea' },
    { id: 'love', label: '❤️ Love it' },
    { id: 'other', label: '💬 Other' },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: 80, right: 16, zIndex: 50,
          width: 44, height: 44, borderRadius: '50%',
          background: '#7f77dd', color: '#fff', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 12px rgba(127,119,221,0.35)',
        }}
        title="Send feedback"
      >
        <MessageSquare size={18} />
      </button>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'flex-end',
        }}>
          <div style={{
            background: '#fff', borderRadius: '20px 20px 0 0',
            padding: 24, width: '100%', maxWidth: 480, margin: '0 auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a1208' }}>Share your thoughts</h3>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} color="#888" />
              </button>
            </div>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🙏</div>
                <p style={{ fontSize: 14, color: '#1d9e75', fontWeight: 600 }}>Thank you! Your feedback helps us grow.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {types.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      style={{
                        padding: '6px 12px', borderRadius: 20, fontSize: 12,
                        border: `0.5px solid ${type === t.id ? '#7f77dd' : '#eee'}`,
                        background: type === t.id ? '#EEEDFE' : '#fafafa',
                        color: type === t.id ? '#3C3489' : '#666',
                        cursor: 'pointer',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Tell us what you think, what's missing, or what you love..."
                  rows={4}
                  style={{
                    width: '100%', border: '0.5px solid #f0e8d8', borderRadius: 12,
                    padding: '10px 14px', fontSize: 13, color: '#3d3020',
                    background: '#fdf8f4', resize: 'none', fontFamily: 'inherit',
                    outline: 'none', marginBottom: 12,
                  }}
                />

                <button
                  onClick={submit}
                  disabled={!msg.trim()}
                  style={{
                    width: '100%', background: msg.trim() ? '#7f77dd' : '#e0ddf5',
                    color: '#fff', border: 'none', borderRadius: 12,
                    padding: '13px', fontSize: 14, fontWeight: 600,
                    cursor: msg.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  <Send size={15} /> Send feedback
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
