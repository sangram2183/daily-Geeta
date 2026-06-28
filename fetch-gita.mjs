// fetch-gita.mjs
// Run: node fetch-gita.mjs
// Uses vedicscriptures API - confirmed working format

import fs from 'fs'
import https from 'https'

const CHAPTER_VERSE_COUNTS = [47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78]

const CHAPTER_NAMES = [
  ['Arjuna Vishada Yoga',            'अर्जुन विषाद योग'],
  ['Sankhya Yoga',                    'सांख्य योग'],
  ['Karma Yoga',                      'कर्म योग'],
  ['Jnana Karma Sanyasa Yoga',        'ज्ञान कर्म सन्यास योग'],
  ['Karma Sanyasa Yoga',              'कर्म सन्यास योग'],
  ['Dhyana Yoga',                     'ध्यान योग'],
  ['Jnana Vijnana Yoga',              'ज्ञान विज्ञान योग'],
  ['Aksara Brahma Yoga',              'अक्षर ब्रह्म योग'],
  ['Raja Vidya Yoga',                 'राज विद्या योग'],
  ['Vibhuti Yoga',                    'विभूति योग'],
  ['Vishvarupa Darshana Yoga',        'विश्वरूप दर्शन योग'],
  ['Bhakti Yoga',                     'भक्ति योग'],
  ['Kshetra Kshetrajna Vibhaga Yoga', 'क्षेत्र क्षेत्रज्ञ विभाग योग'],
  ['Gunatraya Vibhaga Yoga',          'गुणत्रय विभाग योग'],
  ['Purushottama Yoga',               'पुरुषोत्तम योग'],
  ['Daivasura Sampad Vibhaga Yoga',   'दैवासुर सम्पद विभाग योग'],
  ['Shraddhatraya Vibhaga Yoga',      'श्रद्धात्रय विभाग योग'],
  ['Moksha Sanyasa Yoga',             'मोक्ष सन्यास योग'],
]

const CHAPTER_TAGS = [
  ['dharma','battle','duty','beginning'],
  ['karma','duty','detachment','action','self','impermanence'],
  ['karma','action','duty','leadership','society'],
  ['knowledge','wisdom','karma','yoga','self-realization','divine'],
  ['renunciation','wisdom','equality','compassion','peace'],
  ['meditation','mind','yoga','discipline','self','focus'],
  ['divine','nature','god','creation','faith','knowledge'],
  ['devotion','faith','god','surrender','remembrance'],
  ['devotion','faith','grace','god','knowledge'],
  ['divine','god','creation','oneness','wisdom'],
  ['divine','duty','courage','action','destiny','purpose'],
  ['devotion','compassion','love','equanimity','forgiveness'],
  ['wisdom','unity','divine','perception','oneness','self'],
  ['nature','wisdom','purity','knowledge','gunas'],
  ['divine','knowledge','self','god','wisdom'],
  ['virtue','courage','purity','devotion','discipline'],
  ['faith','belief','nature','self','worship'],
  ['surrender','liberation','moksha','devotion','grace','duty'],
]

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject)
      }
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { reject(new Error(`Parse fail (${res.statusCode}): ${data.slice(0,100)}`)) }
      })
    })
    req.on('error', reject)
    req.setTimeout(12000, () => { req.destroy(); reject(new Error('timeout')) })
  })
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// Extract from confirmed API format:
// { slok, transliteration, tej: { ht, tv }, purohit: { et }, prabhu: { et }, rams: { ht } }
function extract(d) {
  const sanskrit = (d.slok || '').trim()

  const transliteration = (d.transliteration || '').trim()

  // English — pick shortest clean one (avoid super long commentaries)
  const enCandidates = [
    d.tej?.ht,
    d.purohit?.et,
    d.siva?.et,
    d.gambir?.et,
    d.adi?.et,
    d.san?.et,
    d.prabhu?.et,
  ].filter(Boolean).map(s => s.trim())

  // prefer under 400 chars (concise translation, not full commentary)
  const meaning_en = enCandidates.find(s => s.length < 400)
    || enCandidates[0]
    || ''

  // Hindi
  const hiCandidates = [
    d.rams?.ht,
    d.tej?.tv,
    d.sankar?.ht,
  ].filter(Boolean).map(s => s.trim())

  const meaning_hi = hiCandidates.find(s => s.length < 600)
    || hiCandidates[0]
    || ''

  return { sanskrit, transliteration, meaning_en, meaning_hi }
}

async function fetchVerse(ch, v) {
  // Primary: vedicscriptures GitHub API
  const url = `https://vedicscriptures.github.io/slok/${ch}/${v}/index.json`
  try {
    const data = await get(url)
    const result = extract(data)
    if (result.sanskrit || result.meaning_en) return result
  } catch {}

  // Fallback: gita-api.vercel.app
  try {
    const data = await get(`https://gita-api.vercel.app/slok/${ch}/${v}`)
    const result = extract(data)
    if (result.sanskrit || result.meaning_en) return result
  } catch {}

  return null
}

async function main() {
  console.log('🪔 Bhagavad Gita — Fetching all 700 shlokas\n')

  // Test with 2.47 (the most famous verse)
  console.log('Testing API with verse 2.47...')
  const test = await fetchVerse(2, 47)

  if (!test || (!test.sanskrit && !test.meaning_en)) {
    console.log('\n❌ API not reachable.')
    console.log('\nManual fix: Open this in your browser:')
    console.log('https://vedicscriptures.github.io/slok/2/47/index.json')
    console.log('\nIf you see JSON, your network is fine — rerun this script.')
    console.log('If you see an error, check your internet connection.')
    process.exit(1)
  }

  console.log('✅ API working!')
  console.log('Sanskrit:', test.sanskrit.slice(0, 60) + '...')
  console.log('Meaning :', test.meaning_en.slice(0, 80) + '...')
  console.log('\nFetching all 700 shlokas. This takes ~5 minutes...\n')

  const all = []
  let filled = 0, empty = 0

  for (let ch = 1; ch <= 18; ch++) {
    const total = CHAPTER_VERSE_COUNTS[ch - 1]
    process.stdout.write(`Ch ${String(ch).padStart(2)} │ ${CHAPTER_NAMES[ch-1][0].padEnd(32)} │ `)

    for (let v = 1; v <= total; v++) {
      const d = await fetchVerse(ch, v)

      const shloka = {
        id: `${ch}.${v}`,
        chapter: ch,
        verse: v,
        chapter_name: CHAPTER_NAMES[ch-1][0],
        chapter_name_hi: CHAPTER_NAMES[ch-1][1],
        sanskrit: d?.sanskrit || '',
        transliteration: d?.transliteration || '',
        meaning_en: d?.meaning_en || '',
        meaning_hi: d?.meaning_hi || '',
        tags: CHAPTER_TAGS[ch-1],
        audio_url: null,
      }

      if (shloka.sanskrit || shloka.meaning_en) { filled++; process.stdout.write('█') }
      else { empty++; process.stdout.write('░') }

      all.push(shloka)
      await sleep(180) // polite rate limit
    }

    console.log(` ${total}v`)
    await sleep(400)
  }

  // Save
  fs.mkdirSync('./src/data', { recursive: true })
  fs.writeFileSync('./src/data/shlokas.json', JSON.stringify(all, null, 2), 'utf-8')

  console.log('\n' + '═'.repeat(60))
  console.log(`✅ Saved ${all.length} shlokas → src/data/shlokas.json`)
  console.log(`   Filled: ${filled} | Empty: ${empty}`)
  if (empty > 0) console.log(`   Tip: Wait 5 min and rerun to fill the ${empty} empty ones`)
  console.log('\nNext:')
  console.log('  git add src/data/shlokas.json')
  console.log('  git commit -m "data: all 700 shlokas"')
  console.log('  git push')
}

main().catch(e => { console.error('\n❌', e.message); process.exit(1) })
