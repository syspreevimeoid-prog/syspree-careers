// WARNING: already run (2026-10). Re-running OVERWRITES these 8 job postings with the
// text below, discarding any edits made in the Studio since. Edit jobs in the Studio.
//
// Migrates the real, currently-live postings from careers.syspree.com into Sanity,
// and removes the two sample/placeholder postings from seed.mjs.
//
// Usage: cd studio && npm run real-jobs
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

// Studio requires a unique _key on every rich-text block and span ("Missing keys" otherwise).
const newKey = () => Math.random().toString(36).slice(2, 14)
function block(text) {
  return [{_type: 'block', _key: newKey(), style: 'normal', markDefs: [], children: [{_type: 'span', _key: newKey(), text, marks: []}]}]
}
const ref = (id) => ({_type: 'reference', _ref: id})
const locRefs = (...ids) => ids.map((id, i) => ({...ref(`careerLocation-${id}`), _key: `loc${i}`}))

const jobs = [
  {
    _id: 'careerJobPosting-seo-intern',
    title: 'SEO Intern',
    slug: 'seo-intern',
    category: 'careerCategory-seo',
    jobType: 'careerJobType-intern',
    locations: locRefs('mumbai', 'thane'),
    experience: 'Freshers – less than 1 year',
    summary:
      'The SEO intern role supports the SEO specialist in the conceptualization, design and delivery of SEO for clients to ensure top ranking in search engines.',
    aboutCompany: block(
      'SySpree is a leading SEO company in Mumbai that has been serving clients from different industries for the past 9 years. We offer an entire gamut of services like Digital Marketing, Web and Mobile App Development, Web designing, and Branding, and have proved to be a reliable partner to many leading organizations in India and abroad.',
    ),
    role: block(
      'The SEO intern role supports the SEO specialist in the conceptualization, design and delivery of SEO for clients to ensure top ranking in search engines.',
    ),
    responsibilities: [
      'Keyword research in coordination with objectives to optimize existing content and uncover new opportunities',
      'SEO analysis and recommendations in coordination with elements and structure of websites and web pages',
      'Provide recommendations and execute strategies for content development in coordination with SEO goals',
      'Administer search engine programs (XML sitemaps, shopping feeds, webmaster tools) for diagnostic reporting',
      'Implement link-building campaigns in coordination with client SEO goals',
      'Assist in the development and execution of communication/content strategies via social communities',
      'Keep pace with SEO, search engine, social media and internet marketing industry trends and developments',
      'Monitor and administer web analytics dashboards and reports, and evaluate search performance',
      'Work closely with other team members to meet client goals and develop recommendations based on results',
    ],
    requirements: [
      'Proficiency in MS Excel, PowerPoint, and Word',
      'Understanding of on-page, off-page, blog post, and website analysis using analytics tools including Google Analytics',
      'Ability to work with popular keyword tools',
      'Ability to assist with full-fledged SEO campaigns, website analysis, on-page and system optimization',
      'Passionate about search engine optimization, web technologies and internet marketing trends',
      'Able to interact with team members and clients to achieve desired results',
    ],
    niceToHave: ['Knowledge of HTML/CSS and website administration'],
  },
  {
    _id: 'careerJobPosting-sales-associate',
    title: 'Sales Associate',
    slug: 'sales-associate',
    category: 'careerCategory-sales',
    jobType: 'careerJobType-full-time',
    locations: locRefs('mumbai', 'thane'),
    experience: '1–3 years',
    summary:
      "The sales associate position is responsible for promoting and selling SySpree's wide range of digital products and services across assigned market verticals.",
    aboutCompany: block(
      'SySpree is a leading digital marketing agency in Mumbai serving clients from different industries for the past 9 years. We offer an entire gamut of services including Digital Marketing, Web and Mobile App Development, Web designing, and Branding, and have proved to be a reliable partner to many leading organizations in India and abroad.',
    ),
    role: block(
      "The sales associate position is responsible for promoting and selling SySpree's wide range of products and services across assigned market verticals.",
    ),
    responsibilities: [
      'Find and nurture new and existing customers, keeping an open channel of communication in assigned market verticals via meets, calls and emails',
      'Establish a good rapport with customers and be dependable in servicing them to earn trust, initiating tie-ups and collaborations',
      'Analyse customer requirements and present price proposals and offers after discussing with Product Management; negotiate and close deals effectively',
      'Collect and summarise sales leads in focus market verticals for new business acquisition and market development',
    ],
    requirements: [
      'Experience in digital product sales',
      'Knowledge of sales process, customer engagement, data management and sales pipeline',
      'Results-oriented with the ability to keep up with market information and trends',
      '1–3 years of work experience with a digital marketing or web design agency in Mumbai, highly preferred',
    ],
    niceToHave: ['Strong network with corporates, media and ad agencies to generate sales and tie-ups'],
  },
  {
    _id: 'careerJobPosting-seo-specialist',
    title: 'SEO Specialist',
    slug: 'seo-specialist',
    category: 'careerCategory-seo',
    jobType: 'careerJobType-full-time',
    locations: locRefs('mumbai', 'thane'),
    experience: '1–3 years',
    summary:
      'The SEO specialist role supports the conceptualization, design and delivery of SEO for clients to ensure top ranking in search engines.',
    aboutCompany: block(
      'SySpree is a leading SEO company in Mumbai that has been serving clients from different industries for the past 7 years. We offer an entire gamut of services like Digital Marketing, Web and Mobile App Development, Web designing, and Branding, and have proved to be a reliable partner to many leading organizations in India and abroad.',
    ),
    role: block(
      'The SEO specialist role supports the conceptualization, design and delivery of SEO for clients to ensure top ranking in search engines.',
    ),
    responsibilities: [
      'Keyword research in coordination with objectives to optimize existing content and uncover new opportunities',
      'SEO analysis and recommendations in coordination with elements and structure of websites and web pages',
      'Provide recommendations and execute strategies for content development in coordination with SEO goals',
      'Administer search engine programs (XML sitemaps, shopping feeds, webmaster tools) for diagnostic reporting',
      'Implement link-building campaigns in coordination with client SEO goals',
      'Keep pace with SEO, search engine, social media and internet marketing industry trends and developments',
      'Monitor and evaluate search results and search performance, working closely with the team to meet client goals',
    ],
    requirements: [
      '1–3 years of experience in Digital Marketing, SEO and/or Social Media Marketing',
      'Proficiency in MS Excel, PowerPoint, and Word',
      'Experience with on-page, off-page, blog post, and website analysis using analytics tools including Google Analytics',
      'Experience working with popular keyword tools and with CMS environments',
      'Ability to manage full-fledged SEO campaigns, website analysis, on-page and system optimization',
      'Able to interact with team members and clients to achieve desired results',
    ],
    niceToHave: ['Knowledge of HTML/CSS and website administration', '2–3 years of experience with another SEO company in Mumbai'],
  },
  {
    _id: 'careerJobPosting-project-manager',
    title: 'Project Manager',
    slug: 'project-manager',
    category: 'careerCategory-digital-marketing',
    jobType: 'careerJobType-full-time',
    locations: locRefs('mumbai', 'thane'),
    experience: '3–5 years (Digital Agency)',
    summary:
      'Own the planning, execution, and delivery of our website development and SEO projects, keeping engagements moving on time, on scope, and on budget.',
    aboutCompany: block(
      'SySpree Digital is a full-service digital transformation and marketing agency specialising in website development, SEO, branding, eCommerce, and technology-driven growth. We partner with clients across India and the GCC to deliver work that is both creative and measurable — and we are growing the team that makes it happen.',
    ),
    role: block(
      'We are looking for an organised, proactive Project Manager to own the planning, execution, and delivery of our website development and SEO projects. You will be the engine that keeps engagements moving — coordinating cross-functional teams, managing client relationships, and making sure every project ships on time, on scope, and on budget without compromising quality.',
    ),
    responsibilities: [
      'Own end-to-end delivery of website development (WordPress, React, and similar) and SEO projects from kickoff through launch and post-launch optimisation',
      'Define scope, timelines, budgets, milestones, and resourcing for each engagement',
      'Coordinate designers, developers, SEO specialists, and content writers to keep work on track and dependencies unblocked',
      'Act as the primary point of contact for clients — running updates, managing expectations, and keeping stakeholders aligned',
      'Translate client goals into clear briefs and acceptance criteria for the delivery team',
      'Track build progress and SEO deliverables against agreed KPIs and success metrics',
      'Identify risks early and put mitigation plans in place to protect timelines and quality',
      'Facilitate project meetings, maintain documentation, and report status using ClickUp or similar tools',
      'Spot opportunities to grow accounts through upsells and additional services',
      'Partner with leadership to sharpen delivery processes and improve operational efficiency',
    ],
    requirements: [
      '3–5 years of project management experience within a digital agency, specifically delivering website development and SEO projects',
      "Bachelor's degree in Business, IT, Marketing, or a related field",
      'Solid working knowledge of website development workflows (CMS platforms such as WordPress, plus modern frameworks) and the full SEO lifecycle',
      'A proven track record managing multiple client projects simultaneously',
      'Hands-on experience with project management and collaboration tools (ClickUp, Asana, Jira, or similar)',
      'Comfort working across Agile/Scrum and Waterfall delivery approaches',
      'Excellent communication, presentation, and stakeholder-management skills',
      'Strong organisational, problem-solving, and decision-making abilities',
    ],
    niceToHave: [
      'Experience working with international / GCC clients and distributed teams',
      'Familiarity with PPC, social media marketing, and eCommerce platforms',
      'Exposure to CRM systems and business-process automation tools',
    ],
    coreCompetencies: [
      'Leadership and team coordination',
      'Client relationship management',
      'Time and budget management',
      'Risk assessment and mitigation',
      'Strategic thinking and attention to detail',
      'Accountability and adaptability in a fast-paced environment',
    ],
    benefits: [
      'Competitive salary and performance incentives',
      'Career growth and leadership opportunities',
      'Exposure to global clients and diverse industries',
      'A collaborative, innovative work environment',
      'Professional development and training programmes',
    ],
  },
  {
    _id: 'careerJobPosting-client-service-associate',
    title: 'Client Service Associate',
    slug: 'client-service-associate',
    category: 'careerCategory-client-service',
    jobType: 'careerJobType-intern',
    locations: locRefs('mumbai', 'thane'),
    experience: '2–3 years',
    summary:
      "A unique chance for a self-motivated individual who is curious and passionate about connecting to and engaging SySpree's client community.",
    aboutCompany: block(
      'SySpree is a leading digital marketing agency in Mumbai and a web design company in Mumbai, serving clients from different industries for the past 9 years. We offer digital marketing services including social media marketing, SEO, web designing and branding, and have proved to be a reliable partner to leading organizations in India and abroad.',
    ),
    role: block(
      "We are looking for a Client Service Associate to join SySpree's team — a unique chance for a self-motivated individual who is curious, and passionate about connecting to and engaging the client community.",
    ),
    responsibilities: [
      'Manage the needs of our existing pool of clients',
      'Learn and understand the different products and solutions available',
      'Keep up to date on market trends and share the latest developments with clients',
      'Engage clients to assist with their enquiries and propose customised solutions',
      'Prepare proposals and present them to clients when required',
      'Liaise and coordinate with clients regarding their paperwork',
      'Serve as an intermediary between the company and existing and newly onboarded clients',
      'Provide after-sales service over meetings, emails, phone calls and WhatsApp',
      'Build and maintain long-term relationships with clients',
      'Introduce clients to a wider range of products based on their suitability',
      'Ensure all call reports and documentation are complete',
      'Achieve client relationship targets, reporting and KPIs set',
    ],
    requirements: [
      'At least a graduate degree',
      'Strong English communication (international accent preferred)',
      'Willingness to learn and adapt to the work culture',
      'Strong grasp of workflow from onboarding to daily deliverables',
      'Problem-solving mindset and strong attention to detail',
      'Client service experience in another digital marketing or web design agency',
      'Organised, with good time management and multi-tasking skills',
    ],
  },
  {
    _id: 'careerJobPosting-sr-seo-executive',
    title: 'Sr. SEO Executive',
    slug: 'sr-seo-executive',
    category: 'careerCategory-seo',
    jobType: 'careerJobType-full-time',
    locations: locRefs('thane'),
    experience: 'Minimum 4 years',
    summary: 'Lead SEO strategy and a team of specialists, driving on-page and off-page optimisation across client accounts.',
    aboutCompany: block(
      'SySpree is a leading Digital Marketing Company that has been serving clients from different industries for the past 10 years. We offer Digital Marketing, Web and Mobile App Development, Web designing, and Branding, and have proved to be a reliable partner to leading organizations in India and abroad.',
    ),
    role: block(
      'As Sr. SEO Executive you will develop and implement SEO strategy, lead a team of specialists, and ensure SEO best practices are integrated across teams.',
    ),
    responsibilities: [
      'Develop and implement SEO strategies, including on-page and off-page optimisation, across teams',
      'Lead and mentor SEO specialists, ensuring alignment with business goals',
      'Analyse website traffic and performance metrics to identify areas for improvement',
      'Collaborate with content, design, and development teams to integrate SEO best practices',
      'Stay current on SEO trends, algorithm updates, and tools',
      'Conduct technical SEO audits, integrating tools like GA4, Google Search Console, and Google Tag Manager',
      'Optimise content for search engines, ensuring high-quality and keyword-rich material',
    ],
    requirements: [
      "Bachelor's degree in Management Studies, Business Administration, Mass Media, Digital Marketing or a related field",
      'Minimum of 4 years of experience',
      'Strong understanding of various SEO strategies and tools',
    ],
  },
  {
    _id: 'careerJobPosting-seo-executive',
    title: 'SEO Executive',
    slug: 'seo-executive',
    category: 'careerCategory-seo',
    jobType: 'careerJobType-full-time',
    locations: locRefs('thane'),
    experience: '1–2 years',
    summary: 'Support SEO delivery across client accounts — technical audits, content optimisation, and performance reporting.',
    aboutCompany: block(
      'SySpree is a leading Digital Marketing Company that has been serving clients from different industries for the past 10 years. We offer Digital Marketing, Web and Mobile App Development, Web designing, and Branding, and have proved to be a reliable partner to leading organizations in India and abroad.',
    ),
    role: block(
      'As SEO Executive you will analyse website performance, collaborate across teams, and keep our SEO practice current with the latest trends and tools.',
    ),
    responsibilities: [
      'Analyse website traffic and performance metrics to identify areas for improvement',
      'Collaborate with content, design, and development teams to integrate SEO best practices',
      'Stay current on SEO trends, algorithm updates, and tools',
      'Conduct technical SEO audits, integrating tools like GA4, Google Search Console, and Google Tag Manager',
      'Optimise content for search engines, ensuring high-quality and keyword-rich material',
    ],
    requirements: [
      "Bachelor's degree in Management Studies, Business Administration, Mass Media, Digital Marketing or a related field",
      '1 to 2 years of experience',
      'Strong understanding of various SEO strategies and tools',
    ],
  },
  {
    _id: 'careerJobPosting-content-writer-intern',
    title: 'Content Writer Intern',
    slug: 'content-writer-intern',
    category: 'careerCategory-content-writer',
    jobType: 'careerJobType-intern',
    locations: locRefs('mumbai', 'thane'),
    experience: 'Fresher – less than 1 year',
    summary:
      'Assist the digital marketing team creating short and long-form content across blogs, articles, social copy, and marketing materials.',
    aboutCompany: block(
      'SySpree is a leading content marketing services provider in Mumbai, serving clients from different industries for the past 9 years. We offer Digital Marketing, Web and Mobile App Development, Web designing, and Branding, and have proved to be a reliable partner to leading organizations in India and abroad.',
    ),
    role: block(
      'We are looking for a content writing intern to support the digital marketing team across a range of written content.',
    ),
    responsibilities: [
      'Assist the digital marketing team to create short and long-form written content: blogs, articles, posts, social copy, website content, profiles/bios and marketing proposal content',
      'Research current trends and participate in brainstorming sessions',
      'Work closely with the marketing team to create and curate content aligned with marketing goals for pitches and existing accounts',
      'Handle day-to-day operations such as curating content and supporting campaigns alongside designers',
    ],
    requirements: [
      'Excellent command of English with strong communication and writing skills',
      'Intermediate skills in content topic research',
      'Creative and analytical skills, able to identify target audience and analyse preferences',
      'Organised, diligent and meticulous with an eye for detail',
      'Good time management, able to work independently and across project teams',
      'A portfolio and/or writing samples to showcase',
      'Able to commit for a minimum of 4 months',
    ],
  },
]

async function main() {
  // Add the missing "Sales" category (seed.mjs only covers the other 4).
  await client.createOrReplace({_id: 'careerCategory-sales', _type: 'careerCategory', title: 'Sales', slug: {_type: 'slug', current: 'sales'}})
  console.log('Ensured careerCategory-sales exists')

  const now = new Date().toISOString()
  const tx = client.transaction()
  for (const job of jobs) {
    const {category, jobType, ...rest} = job
    tx.createOrReplace({
      _type: 'careerJobPosting',
      company: 'SySpree Digital Pvt. Ltd.',
      isActive: true,
      postedAt: now,
      category: ref(category),
      jobType: ref(jobType),
      ...rest,
      slug: {_type: 'slug', current: rest.slug},
    })
  }
  // Remove the two sample/placeholder postings from seed.mjs - real content supersedes them.
  tx.delete('careerJobPosting-sample-seo-executive')
  tx.delete('careerJobPosting-sample-client-service-associate')

  await tx.commit()
  console.log(`Upserted ${jobs.length} real job postings, removed 2 sample postings.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
