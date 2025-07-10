import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { chantierType } from './src/schemas/chantierType'

export default defineConfig({
  name: 'gestion-chantiers',
  title: 'Gestion des Chantiers',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: [chantierType],
  },
})