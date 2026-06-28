import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ShlokaCard } from '../components/ShlokaCard'
import { getShlokaById } from '../utils/shlokaUtils'

export function ShlokaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const shloka = getShlokaById(id || '')

  if (!shloka) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Shloka not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50/30 pb-24">
      <div className="flex items-center gap-3 px-4 pt-14 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1 className="text-base font-medium text-gray-700">
          Bhagavad Gita · {shloka.id}
        </h1>
      </div>
      <div className="px-4">
        <ShlokaCard shloka={shloka} showReflection={true} />
      </div>
    </div>
  )
}
