import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production'
  }
})