import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'

// Filled in after `sanity init` (or paste your existing project's values).
// These are also the values you'll put in web/.env as VITE_SANITY_PROJECT_ID / VITE_SANITY_DATASET.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your-project-id>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'SySpree Careers',
  projectId,
  dataset,
  plugins: [structureTool({structure: deskStructure}), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
