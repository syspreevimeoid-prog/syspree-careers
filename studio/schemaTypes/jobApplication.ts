import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'jobApplication',
  title: 'Job Application',
  type: 'document',
  // Documents of this type are created server-side by web/api/apply.js — there is
  // intentionally no "create new" flow for it in the Studio.
  fields: [
    defineField({name: 'job', title: 'Job', type: 'reference', to: [{type: 'careerJobPosting'}], validation: (r) => r.required()}),
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'email', title: 'Email', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'phone', title: 'Phone', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'resume', title: 'Resume', type: 'file'}),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired']},
      initialValue: 'New',
    }),
  ],
  orderings: [{title: 'Submitted, newest first', name: 'submittedAtDesc', by: [{field: 'submittedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'job.title', status: 'status'},
    prepare({title, subtitle, status}) {
      return {title: `${title} — ${status}`, subtitle}
    },
  },
})
