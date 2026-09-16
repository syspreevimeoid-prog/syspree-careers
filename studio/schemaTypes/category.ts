import {defineField, defineType} from 'sanity'

// Named "careerCategory". NOTE: the real bug this project hit was dots in document
// _ids (e.g. "category.foo") being silently excluded from every query - Sanity's
// path()-based query engine treats "." as a path separator. Fixed by using hyphens
// in every custom _id (see seed.mjs / real-jobs.mjs) - this type rename itself
// turned out to be unnecessary but is harmless, so it's left as-is.
export default defineType({
  name: 'careerCategory',
  title: 'Job Category',
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
