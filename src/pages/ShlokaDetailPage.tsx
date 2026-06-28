import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ShlokaCard } from '../components/ShlokaCard'
import { getShlokaById } from '../utils/shlokaUtils'

export function ShlokaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const shloka = getShlokaById(id || '')

  if (!shloka) return (
    <div className="bg-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
      Shloka not found
    </div>
  )

  return (
    <div className="bg-page" style={{ minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '56px 16px 20px' }}>
        <button onClick={() => navigate(-1)} style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          border: '0.5px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ArrowLeft size={16} color="rgba(255,255,255,0.6)" />
        </button>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#E8B84B', fontWeight: 600 }}>
            Bhagavad Gita · {shloka.id}
          </h1>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{shloka.chapter_name}</p>
        </div>
      </div>
      <div style={{ padding: '0 16px', maxWidth: 760, margin: '0 auto' }}>
        <ShlokaCard shloka={shloka} />
      </div>
    </div>
  )
}
