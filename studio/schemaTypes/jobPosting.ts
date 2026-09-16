import {defineField, defineType} from 'sanity'

// Named "careerJobPosting" (see category.ts for the dots-in-IDs bug this avoided/fixed).
export default defineType({
  name: 'careerJobPosting',
  title: 'Job Posting',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'content', title: 'Content'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      group: 'basics',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basics',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      group: 'basics',
      initialValue: 'SySpree Digital Pvt. Ltd.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'careerCategory'}],
      group: 'basics',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'jobType',
      title: 'Job Type',
      type: 'reference',
      to: [{type: 'careerJobType'}],
      group: 'basics',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'careerLocation'}]}],
      group: 'basics',
      validation: (r) => r.required().min(1),
    }),
    defineField({name: 'experience', title: 'Experience', type: 'string', group: 'basics', placeholder: 'e.g. 3–5 years'}),
    defineField({
      name: 'postedAt',
      title: 'Posted At',
      type: 'datetime',
      group: 'basics',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active (shown on the site)',
      type: 'boolean',
      group: 'basics',
      initialValue: true,
    }),
    defineField({
      name: 'summary',
      title: 'Card Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Short excerpt shown on the job card in the listing.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'aboutCompany', title: 'About the Company', type: 'array', group: 'content', of: [{type: 'block'}]}),
    defineField({name: 'role', title: 'The Role', type: 'array', group: 'content', of: [{type: 'block'}]}),
    defineField({
      name: 'responsibilities',
      title: "What You'll Do",
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
    }),
    defineField({name: 'requirements', title: 'What You Bring', type: 'array', group: 'content', of: [{type: 'string'}]}),
    defineField({name: 'niceToHave', title: 'Nice to Have', type: 'array', group: 'content', of: [{type: 'string'}]}),
    defineField({
      name: 'coreCompetencies',
      title: 'Core Competencies',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
    }),
    defineField({name: 'benefits', title: 'What We Offer', type: 'array', group: 'content', of: [{type: 'string'}]}),
  ],
  orderings: [
    {
      title: 'Posted date, newest first',
      name: 'postedAtDesc',
      by: [{field: 'postedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'company', active: 'isActive'},
    prepare({title, subtitle, active}) {
      return {title, subtitle: active ? subtitle : `${subtitle} (inactive)`}
    },
  },
})
