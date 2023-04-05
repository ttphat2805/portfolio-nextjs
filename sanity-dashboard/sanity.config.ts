import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
console.log('vo day', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

export default defineConfig({
  name: 'default',
  title: 'sanity-dashboard',

  projectId: 'qn7ivsda',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
