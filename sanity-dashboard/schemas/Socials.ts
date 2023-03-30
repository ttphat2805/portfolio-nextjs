import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socials',
  title: 'Socials',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Title of the social',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
})
