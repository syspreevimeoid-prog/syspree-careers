import {defineField, defineType} from 'sanity'

// Named "careerJobType" (see category.ts for the dots-in-IDs bug this avoided/fixed).
export default defineType({
  name: 'careerJobType',
  title: 'Job Type',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 60},
      validation: (r) => r.required(),
    }),
  ],
  preview: {select: {title: 'title'}},
})
