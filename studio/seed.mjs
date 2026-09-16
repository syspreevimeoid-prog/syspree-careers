// Creates sample taxonomy documents + a couple of example job postings so the
// site isn't empty on first run. Content is original placeholder copy, not
// copied from any live posting. Safe to run multiple times (upserts by _id).
//
// Usage:
//   cd studio
//   npm install
//   copy .env.example to .env and fill in SANITY_STUDIO_PROJECT_ID / DATASET / SANITY_API_TOKEN
//   npm run seed
import 'dotenv/config'
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_API_TOKEN — see .env.example')
  process.exit(1)
}

const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

// IDs and _type values are prefixed "career" - "category"/"jobType"/"location"/"jobPosting"
// on their own collide with something Sanity provisions for new projects, which silently
// excludes documents from every query/list while direct-by-ID reads keep working.
const categories = [
  {_id: 'careerCategory-client-service', title: 'Client Service'},
  {_id: 'careerCategory-content-writer', title: 'Content Writer'},
  {_id: 'careerCategory-digital-marketing', title: 'Digital Marketing'},
  {_id: 'careerCategory-seo', title: 'SEO'},
]

const jobTypes = [
  {_id: 'careerJobType-full-time', title: 'Full Time'},
  {_id: 'careerJobType-intern', title: 'Intern'},
]

const locations = [
  {_id: 'careerLocation-mumbai', title: 'Mumbai'},
  {_id: 'careerLocation-thane', title: 'Thane'},
]

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function upsertTaxonomy(type, docs) {
  const tx = client.transaction()
  for (const doc of docs) {
    tx.createOrReplace({_type: type, slug: {_type: 'slug', current: slugify(doc.title)}, ...doc})
  }
  await tx.commit()
  console.log(`Upserted ${docs.length} ${type} documents`)
}

function block(text) {
  return [{_type: 'block', style: 'normal', children: [{_type: 'span', text}]}]
}

async function seedJobs() {
  const jobs = [
    {
      _id: 'careerJobPosting-sample-seo-executive',
      _type: 'careerJobPosting',
      title: 'SEO Executive',
      slug: {_type: 'slug', current: 'seo-executive'},
      company: 'SySpree Digital Pvt. Ltd.',
      category: {_type: 'reference', _ref: 'careerCategory-seo'},
      jobType: {_type: 'reference', _ref: 'careerJobType-full-time'},
      locations: [{_type: 'reference', _ref: 'careerLocation-thane', _key: 'loc1'}],
      experience: '1–3 years',
      postedAt: new Date().toISOString(),
      isActive: true,
      summary:
        'Own on-page and technical SEO delivery for a portfolio of client websites, from keyword research through reporting.',
      aboutCompany: block(
        'SySpree Digital is a full-service digital growth agency working with clients across India and the GCC on websites, SEO, and performance marketing.',
      ),
      role: block(
        'You will plan and execute SEO campaigns for a set of client accounts, working closely with content and development to move rankings and organic traffic.',
      ),
      responsibilities: [
        'Run keyword research and competitive analysis for assigned accounts',
        'Implement on-page and technical SEO fixes in partnership with developers',
        'Build and maintain monthly performance reports for clients',
        'Coordinate with content writers on SEO-driven content briefs',
      ],
      requirements: [
        '1–3 years of hands-on SEO experience, agency experience a plus',
        'Comfortable with tools such as Google Search Console, GA4, and a rank tracker',
        'Clear written communication for client-facing reporting',
      ],
      niceToHave: ['Experience with WordPress', 'Basic HTML/CSS familiarity'],
      coreCompetencies: ['Analytical thinking', 'Attention to detail', 'Time management'],
      benefits: ['Competitive salary', 'Learning & development support', 'Collaborative team environment'],
    },
    {
      _id: 'careerJobPosting-sample-client-service-associate',
      _type: 'careerJobPosting',
      title: 'Client Service Associate',
      slug: {_type: 'slug', current: 'client-service-associate'},
      company: 'SySpree Digital Pvt. Ltd.',
      category: {_type: 'reference', _ref: 'careerCategory-client-service'},
      jobType: {_type: 'reference', _ref: 'careerJobType-intern'},
      locations: [
        {_type: 'reference', _ref: 'careerLocation-mumbai', _key: 'loc1'},
        {_type: 'reference', _ref: 'careerLocation-thane', _key: 'loc2'},
      ],
      experience: '0–1 years',
      postedAt: new Date().toISOString(),
      isActive: true,
      summary: 'Support day-to-day client communication and coordination across active digital marketing projects.',
      aboutCompany: block(
        'SySpree Digital is a full-service digital growth agency working with clients across India and the GCC on websites, SEO, and performance marketing.',
      ),
      role: block(
        'You will assist the client service team with scheduling, status updates, and keeping projects organised across delivery teams.',
      ),
      responsibilities: [
        'Help prepare client status updates and meeting notes',
        'Track action items across design, development and marketing teams',
        'Support onboarding of new client accounts',
      ],
      requirements: ['Strong written and verbal communication', 'Comfortable working with spreadsheets and task trackers'],
      niceToHave: ['Prior internship in a client-facing role'],
      coreCompetencies: ['Communication', 'Organisation', 'Proactivity'],
      benefits: ['Mentorship from senior client service leads', 'Certificate on completion', 'Potential full-time conversion'],
    },
  ]

  const tx = client.transaction()
  for (const job of jobs) tx.createOrReplace(job)
  await tx.commit()
  console.log(`Upserted ${jobs.length} careerJobPosting documents`)
}

async function seedSiteSettings() {
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    heroTagline: 'SEE THE DIFFERENCE SYSPREE MAKES',
    heroHeadingHighlight: 'Explore Opportunities:',
    heroHeadingRest: 'Build a Future That Thrives',
    heroSubtext:
      'Discover roles that empower professionals to grow, innovate, and excel in a dynamic and competitive environment.',
    contactUrl: 'https://syspree.com/contact-us/',
    hrEmail: 'hr@syspree.com',
  })
  console.log('Upserted siteSettings document')
}

async function main() {
  await upsertTaxonomy('careerCategory', categories.map(({_id, title}) => ({_id, title})))
  await upsertTaxonomy('careerJobType', jobTypes.map(({_id, title}) => ({_id, title})))
  await upsertTaxonomy('careerLocation', locations.map(({_id, title}) => ({_id, title})))
  await seedJobs()
  await seedSiteSettings()
  console.log('Seed complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
