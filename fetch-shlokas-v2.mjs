// fetch-shlokas-v2.mjs
// Run: node fetch-shlokas-v2.mjs
// Tries multiple free APIs, handles all known response formats

import fs from 'fs'
import https from 'https'
import http from 'http'

const CHAPTER_VERSE_COUNTS = [47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78]

const CHAPTER_NAMES = [
  ['Arjuna Vishada Yoga',           'अर्जुन विषाद योग'],
  ['Sankhya Yoga',                   'सांख्य योग'],
  ['Karma Yoga',                     'कर्म योग'],
  ['Jnana Karma Sanyasa Yoga',       'ज्ञान कर्म सन्यास योग'],
  ['Karma Sanyasa Yoga',             'कर्म सन्यास योग'],
  ['Dhyana Yoga',                    'ध्यान योग'],
  ['Jnana Vijnana Yoga',             'ज्ञान विज्ञान योग'],
  ['Aksara Brahma Yoga',             'अक्षर ब्रह्म योग'],
  ['Raja Vidya Yoga',                'राज विद्या योग'],
  ['Vibhuti Yoga',                   'विभूति योग'],
  ['Vishvarupa Darshana Yoga',       'विश्वरूप दर्शन योग'],
  ['Bhakti Yoga',                    'भक्ति योग'],
  ['Kshetra Kshetrajna Vibhaga Yoga','क्षेत्र क्षेत्रज्ञ विभाग योग'],
  ['Gunatraya Vibhaga Yoga',         'गुणत्रय विभाग योग'],
  ['Purushottama Yoga',              'पुरुषोत्तम योग'],
  ['Daivasura Sampad Vibhaga Yoga',  'दैवासुर सम्पद विभाग योग'],
  ['Shraddhatraya Vibhaga Yoga',     'श्रद्धात्रय विभाग योग'],
  ['Moksha Sanyasa Yoga',            'मोक्ष सन्यास योग'],
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

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(url, { headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' } }, res => {
      // follow redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject)
      }
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { reject(new Error(`Parse failed (status ${res.statusCode}): ${data.slice(0,100)}`)) }
      })
    })
    req.on('error', reject)
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('Timeout')) })
  })
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// Extract fields from whatever format the API returns
function extractShloka(data, ch, v) {
  if (!data || typeof data !== 'object') return null

  // Try all known field name patterns across different APIs
  const sanskrit =
    data.slok ||
    data.sanskrit ||
    data.verse ||
    data.devanagari ||
    data.shloka ||
    ''

  const transliteration =
    data.transliteration ||
    data.trans ||
    data.roman ||
    ''

  // English meaning — try nested objects first
  const meaning_en =
    data.tej?.ht ||         // tej translator
    data.purohit?.et ||     // purohit translator
    data.siva?.et ||        // siva translator
    data.chinmay?.hc ||
    data.san?.et ||
    data.adi?.et ||
    data.gambir?.et ||
    data.prabhu?.et ||
    data.translation ||
    data.meaning ||
    data.meaning_en ||
    data.english ||
    data.description ||
    ''

  // Hindi meaning
  const meaning_hi =
    data.tej?.tv ||
    data.chinmay?.hc ||
    data.san?.hc ||
    data.adi?.hc ||
    data.meaning_hi ||
    data.hindi ||
    ''

  return { sanskrit, transliteration, meaning_en, meaning_hi }
}

// Multiple API endpoints to try per verse
function getUrls(ch, v) {
  return [
    `https://gita-api.vercel.app/slok/${ch}/${v}`,
    `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${ch}/verses/${v}/`,
    `https://gitabyvedicscholars.vercel.app/api/${ch}/${v}`,
  ]
}

async function fetchVerse(ch, v) {
  const urls = getUrls(ch, v)
  for (const url of urls) {
    try {
      const data = await fetchUrl(url)
      const extracted = extractShloka(data, ch, v)
      if (extracted && (extracted.sanskrit || extracted.meaning_en)) {
        return extracted
      }
      // Log what we got for debugging
      if (process.env.DEBUG) {
        console.log(`  [DEBUG ${ch}.${v}] Keys:`, Object.keys(data).join(', '))
      }
    } catch (e) {
      // try next URL
    }
    await sleep(80)
  }
  return null
}

async function main() {
  console.log('🪔 Fetching all 700 Bhagavad Gita shlokas (v2)...\n')

  // First test one verse to confirm API works
  console.log('Testing API with 2.47...')
  const test = await fetchVerse(2, 47)
  if (!test) {
    console.log('\n❌ All APIs failed. Run: node debug-api.mjs to see which APIs are reachable from your network.')
    process.exit(1)
  }
  console.log('✅ API working! Got:', {
    sanskrit: test.sanskrit?.slice(0, 50) + '...',
    meaning_en: test.meaning_en?.slice(0, 60) + '...',
  })
  console.log('\nFetching all chapters...\n')

  const all = []
  let empty = 0

  for (let ch = 1; ch <= 18; ch++) {
    const total = CHAPTER_VERSE_COUNTS[ch - 1]
    process.stdout.write(`Chapter ${ch} (${CHAPTER_NAMES[ch-1][0]}): `)

    for (let v = 1; v <= total; v++) {
      const extracted = await fetchVerse(ch, v)

      const shloka = {
        id: `${ch}.${v}`,
        chapter: ch,
        verse: v,
        chapter_name: CHAPTER_NAMES[ch-1][0],
        chapter_name_hi: CHAPTER_NAMES[ch-1][1],
        sanskrit: extracted?.sanskrit || '',
        transliteration: extracted?.transliteration || '',
        meaning_en: extracted?.meaning_en || '',
        meaning_hi: extracted?.meaning_hi || '',
        tags: CHAPTER_TAGS[ch-1] || [],
        audio_url: null,
      }

      if (!shloka.sanskrit && !shloka.meaning_en) empty++
      all.push(shloka)
      process.stdout.write('.')
      await sleep(150) // polite rate limiting
    }

    console.log(` ✓ (${total} verses)`)
    await sleep(400)
  }

  // Save
  fs.mkdirSync('./src/data', { recursive: true })
  fs.writeFileSync('./src/data/shlokas.json', JSON.stringify(all, null, 2), 'utf-8')

  console.log(`\n✅ Done! ${all.length} shlokas saved.`)
  if (empty > 0) {
    console.log(`⚠️  ${empty} verses had empty content — API may have rate-limited.`)
    console.log('   Wait 10 minutes and run again to fill gaps.')
  }
  console.log('\nRestart dev server: npm run dev')
  console.log('Or push to GitHub:  git add src/data/shlokas.json && git commit -m "data: 700 shlokas" && git push')
}

main().catch(e => {
  console.error('\n❌ Error:', e.message)
  process.exit(1)
})
