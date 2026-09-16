import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Read-only, CDN-backed client. Only the public projectId/dataset are used here —
// never import a write token into frontend code.
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source) {
  return builder.image(source)
}
