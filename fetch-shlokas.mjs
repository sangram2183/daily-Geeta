// fetch-shlokas.mjs
// Run once: node fetch-shlokas.mjs
// Saves all 700 shlokas to src/data/shlokas.json in the right format
// Uses the free Bhagavad Gita API — no key needed

import fs from 'fs'
import https from 'https'

const CHAPTER_VERSE_COUNTS = [47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78]

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { reject(new Error('JSON parse failed for: ' + url)) }
      })
    }).on('error', reject)
  })
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

const CHAPTER_NAMES = [
  ['Arjuna Vishada Yoga', 'अर्जुन विषाद योग'],
  ['Sankhya Yoga', 'सांख्य योग'],
  ['Karma Yoga', 'कर्म योग'],
  ['Jnana Karma Sanyasa Yoga', 'ज्ञान कर्म सन्यास योग'],
  ['Karma Sanyasa Yoga', 'कर्म सन्यास योग'],
  ['Dhyana Yoga', 'ध्यान योग'],
  ['Jnana Vijnana Yoga', 'ज्ञान विज्ञान योग'],
  ['Aksara Brahma Yoga', 'अक्षर ब्रह्म योग'],
  ['Raja Vidya Yoga', 'राज विद्या योग'],
  ['Vibhuti Yoga', 'विभूति योग'],
  ['Vishvarupa Darshana Yoga', 'विश्वरूप दर्शन योग'],
  ['Bhakti Yoga', 'भक्ति योग'],
  ['Kshetra Kshetrajna Vibhaga Yoga', 'क्षेत्र क्षेत्रज्ञ विभाग योग'],
  ['Gunatraya Vibhaga Yoga', 'गुणत्रय विभाग योग'],
  ['Purushottama Yoga', 'पुरुषोत्तम योग'],
  ['Daivasura Sampad Vibhaga Yoga', 'दैवासुर सम्पद विभाग योग'],
  ['Shraddhatraya Vibhaga Yoga', 'श्रद्धात्रय विभाग योग'],
  ['Moksha Sanyasa Yoga', 'मोक्ष सन्यास योग'],
]

// Tag map — key themes per chapter
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

async function fetchAllShlokas() {
  const all = []
  let total = 0

  for (let ch = 1; ch <= 18; ch++) {
    const verseCount = CHAPTER_VERSE_COUNTS[ch - 1]
    console.log(`\nChapter ${ch}: ${CHAPTER_NAMES[ch-1][0]} (${verseCount} verses)`)

    for (let v = 1; v <= verseCount; v++) {
      try {
        // Primary API
        const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${ch}/verses/${v}/`
        // Free alternative (no key needed)
        const freeUrl = `https://gita-api.vercel.app/slok/${ch}/${v}`

        let data
        try {
          data = await get(freeUrl)
        } catch {
          // fallback: skip this verse gracefully
          console.log(`  Skipped ${ch}.${v}`)
          continue
        }

        const shloka = {
          id: `${ch}.${v}`,
          chapter: ch,
          verse: v,
          chapter_name: CHAPTER_NAMES[ch-1][0],
          chapter_name_hi: CHAPTER_NAMES[ch-1][1],
          sanskrit: data.slok || data.sanskrit || '',
          transliteration: data.transliteration || data.trans || '',
          meaning_en: data.tej?.ht || data.purohit?.et || data.siva?.et || data.meaning || '',
          meaning_hi: data.tej?.tv || data.chinmay?.hc || data.meaning_hi || '',
          tags: CHAPTER_TAGS[ch-1] || [],
          audio_url: null,
        }

        all.push(shloka)
        total++
        process.stdout.write(`  ${v}/${verseCount}... `)

        // Be polite to the API
        await sleep(120)

      } catch (err) {
        console.log(`  Error at ${ch}.${v}:`, err.message)
      }
    }
    console.log(`\n  ✓ Chapter ${ch} done`)
    await sleep(500)
  }

  return all
}

async function main() {
  console.log('🪔 Fetching all 700 Bhagavad Gita shlokas...')
  console.log('This will take ~3-4 minutes. Please wait.\n')

  const shlokas = await fetchAllShlokas()

  const outPath = './src/data/shlokas.json'
  fs.writeFileSync(outPath, JSON.stringify(shlokas, null, 2), 'utf-8')

  console.log(`\n✅ Done! ${shlokas.length} shlokas saved to ${outPath}`)
  console.log('Restart your dev server: npm run dev')
}

main().catch(console.error)
