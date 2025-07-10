import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'gestion-chantiers',
  title: 'Gestion des Chantiers',

  projectId: '4ec1gn11',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})