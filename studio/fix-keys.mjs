// One-off repair: adds the `_key` that Sanity Studio requires on every rich-text block
// (and every span inside it) in job postings. Text is left exactly as-is. Safe to re-run.
//
// Usage: cd studio && node fix-keys.mjs
import 'dotenv/config'
import {randomUUID} from 'node:crypto'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'raw', // include drafts
})

const RICH_TEXT_FIELDS = ['aboutCompany', 'role']
const newKey = () => randomUUID().replace(/-/g, '').slice(0, 12)

function withKeys(blocks) {
  let changed = false
  const fixed = blocks.map((block) => {
    const b = {...block}
    if (!b._key) {
      b._key = newKey()
      changed = true
    }
    if (Array.isArray(b.children)) {
      b.children = b.children.map((span) => {
        if (span._key) return span
        changed = true
        return {...span, _key: newKey()}
      })
    }
    if (Array.isArray(b.markDefs)) {
      b.markDefs = b.markDefs.map((def) => (def._key ? def : ((changed = true), {...def, _key: newKey()})))
    } else {
      b.markDefs = []
    }
    return b
  })
  return {fixed, changed}
}

const docs = await client.fetch(`*[_type == "careerJobPosting"]{_id, title, ${RICH_TEXT_FIELDS.join(', ')}}`)
let patched = 0
for (const doc of docs) {
  const set = {}
  for (const field of RICH_TEXT_FIELDS) {
    if (!Array.isArray(doc[field])) continue
    const {fixed, changed} = withKeys(doc[field])
    if (changed) set[field] = fixed
  }
  if (Object.keys(set).length) {
    await client.patch(doc._id).set(set).commit()
    patched++
    console.log(`fixed: ${doc.title}`)
  }
}
console.log(`Done - ${patched} of ${docs.length} job postings needed keys.`)
