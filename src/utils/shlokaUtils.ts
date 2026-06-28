import shlokas from '../data/shlokas.json'

export type Shloka = {
  id: string
  chapter: number
  verse: number
  chapter_name: string
  chapter_name_hi: string
  sanskrit: string
  transliteration: string
  meaning_en: string
  meaning_hi: string
  tags: string[]
  audio_url: string | null
}

export const allShlokas: Shloka[] = shlokas as Shloka[]

// Same shloka for everyone on a given day
export function getDailyShloka(): Shloka {
  const start = new Date('2024-01-01').getTime()
  const now = new Date().getTime()
  const dayIndex = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return allShlokas[dayIndex % allShlokas.length]
}

export function getShlokaById(id: string): Shloka | undefined {
  return allShlokas.find((s) => s.id === id)
}

export function getChapters(): { chapter: number; name: string; name_hi: string; count: number }[] {
  const map: Record<number, { name: string; name_hi: string; count: number }> = {}
  for (const s of allShlokas) {
    if (!map[s.chapter]) map[s.chapter] = { name: s.chapter_name, name_hi: s.chapter_name_hi, count: 0 }
    map[s.chapter].count++
  }
  return Object.entries(map).map(([ch, v]) => ({ chapter: Number(ch), ...v }))
}

export function getShlokasByChapter(chapter: number): Shloka[] {
  return allShlokas.filter((s) => s.chapter === chapter)
}

export function searchShlokas(query: string): Shloka[] {
  const q = query.toLowerCase()
  return allShlokas.filter(
    (s) =>
      s.meaning_en.toLowerCase().includes(q) ||
      s.meaning_hi.includes(q) ||
      s.tags.some((t) => t.includes(q)) ||
      s.chapter_name.toLowerCase().includes(q) ||
      s.transliteration.toLowerCase().includes(q)
  )
}

export function getShlokasByTag(tag: string): Shloka[] {
  return allShlokas.filter((s) => s.tags.includes(tag))
}

export const ALL_TAGS = [
  'karma', 'duty', 'devotion', 'knowledge', 'wisdom', 'peace',
  'mind', 'meditation', 'faith', 'divine', 'surrender', 'courage',
  'action', 'detachment', 'compassion', 'equanimity', 'self', 'dharma'
]

export function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
}
