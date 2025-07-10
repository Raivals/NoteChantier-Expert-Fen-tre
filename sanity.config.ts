import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { chantierSchema } from './src/schemas/chantier'

export default defineConfig({
  name: 'gestion-chantiers',
  title: 'Gestion des Chantiers',

  projectId: process.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.VITE_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: [chantierSchema],
  },
})