// debug-api.mjs
// Run: node debug-api.mjs
// Shows exactly what the API returns for one shloka

import https from 'https'

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { reject(new Error('Parse failed: ' + data.slice(0, 200))) }
      })
    }).on('error', reject)
  })
}

async function main() {
  const apis = [
    'https://gita-api.vercel.app/slok/2/47',
    'https://gitabyvedicscholars.vercel.app/api/2/47',
    'https://bhagavad-gita-api.vercel.app/v1/chapter/2/verse/47',
  ]

  for (const url of apis) {
    console.log('\n─────────────────────')
    console.log('Testing:', url)
    try {
      const data = await get(url)
      console.log('Keys:', Object.keys(data))
      console.log('Full response:', JSON.stringify(data, null, 2).slice(0, 800))
      break // stop at first working API
    } catch (e) {
      console.log('Failed:', e.message)
    }
  }
}

main()
