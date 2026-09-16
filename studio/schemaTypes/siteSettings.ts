import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton - only one document of this type should exist (enforced via Studio structure, not the API)
  fields: [
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: 'SEE THE DIFFERENCE SYSPREE MAKES',
    }),
    defineField({
      name: 'heroHeadingHighlight',
      title: 'Hero Heading — highlighted part (orange)',
      type: 'string',
      description: 'e.g. "Explore Opportunities:"',
      initialValue: 'Explore Opportunities:',
    }),
    defineField({
      name: 'heroHeadingRest',
      title: 'Hero Heading — rest (black)',
      type: 'string',
      description: 'e.g. "Build a Future That Thrives"',
      initialValue: 'Build a Future That Thrives',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      initialValue:
        'Discover roles that empower professionals to grow, innovate, and excel in a dynamic and competitive environment.',
    }),
    defineField({name: 'contactUrl', title: 'Contact Us URL', type: 'url', initialValue: 'https://syspree.com/contact-us/'}),
    defineField({name: 'hrEmail', title: 'HR Notification Email', type: 'string', initialValue: 'hr@syspree.com'}),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Full international number, digits only, e.g. 912241275220 (no +, spaces, or dashes). Leave blank to hide the floating WhatsApp button.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
