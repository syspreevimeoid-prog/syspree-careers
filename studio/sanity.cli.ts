import {defineCliConfig} from 'sanity/cli'

// Used by `sanity deploy`, `sanity dev`, etc. The project ID isn't secret.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '4req6z9k',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Hosted Studio address: https://syspree-careers.sanity.studio
  studioHost: 'syspree-careers',
})
