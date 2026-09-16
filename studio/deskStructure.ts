import type {StructureResolver} from 'sanity/structure'

// Custom desk structure: groups job postings, applications and taxonomy
// separately, and pins Site Settings as a singleton (no "create new" list).
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Job Postings')
        .schemaType('careerJobPosting')
        .child(S.documentTypeList('careerJobPosting').title('Job Postings')),
      S.listItem()
        .title('Applications')
        .schemaType('jobApplication')
        .child(S.documentTypeList('jobApplication').title('Applications').defaultOrdering([{field: 'submittedAt', direction: 'desc'}])),
      S.divider(),
      S.listItem().title('Categories').schemaType('careerCategory').child(S.documentTypeList('careerCategory').title('Categories')),
      S.listItem().title('Job Types').schemaType('careerJobType').child(S.documentTypeList('careerJobType').title('Job Types')),
      S.listItem().title('Locations').schemaType('careerLocation').child(S.documentTypeList('careerLocation').title('Locations')),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .schemaType('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
