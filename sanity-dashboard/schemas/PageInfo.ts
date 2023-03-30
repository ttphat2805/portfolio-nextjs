import {defineType} from 'sanity'

export default defineType({
  name: 'pageInfo',
  title: 'Page Info',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'avatarHero',
      title: 'Avatar Hero',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'profilePic',
      title: 'Profile Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'introduce',
      title: 'Introduce',
      type: 'text',
    },
  ],
})
