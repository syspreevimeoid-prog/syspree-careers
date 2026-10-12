// Header/footer navigation mirrored from syspree.com so the careers subdomain
// matches the main site. Update here when the main site's menus change.
const S = 'https://syspree.com'

const INDIA = [
  ['Mumbai', 'mumbai'],
  ['Delhi NCR', 'delhi-ncr'],
  ['Bengaluru', 'bengaluru'],
  ['Chennai', 'chennai'],
  ['Hyderabad', 'hyderabad'],
  ['Pune', 'pune'],
  ['Surat', 'surat'],
  ['Ahmedabad', 'ahmedabad'],
  ['Goa', 'goa'],
]
const AUSTRALIA = [
  ['Brisbane', 'brisbane'],
  ['Gold Coast', 'gold-coast'],
  ['Adelaide', 'adelaide'],
  ['Canberra', 'canberra'],
  ['Perth', 'perth'],
  ['Melbourne', 'melbourne'],
  ['Sydney', 'sydney'],
]
const UK = [
  ['London', 'london'],
  ['Manchester', 'manchester'],
  ['Birmingham', 'birmingham'],
  ['Edinburgh', 'edinburgh'],
  ['Glasgow', 'glasgow'],
  ['Leeds', 'leeds'],
]
const USA = [
  ['New York', 'new-york-city'],
  ['Los Angeles', 'los-angeles'],
  ['Chicago', 'chicago'],
  ['Miami', 'miami'],
  ['San Francisco', 'san-francisco'],
]
const UAE = [
  ['Ajman', 'ajman'],
  ['Sharjah', 'sharjah'],
  ['Dubai', 'dubai'],
  ['Ras Al Khaimah', 'ras-al-khaimah'],
  ['Abu Dhabi', 'abu-dhabi'],
  ['Al Ain', 'al-ain'],
  ['Fujairah', 'fujairah'],
]

const loc = ([label, slug]) => ({label, href: `${S}/locations/${slug}/`})

export const CASE_STUDIES = [
  {label: 'Sports Coaching Company', href: `${S}/case-studies/case-study-digital-marketing-for-sports/`},
  {label: 'Immigration Company', href: `${S}/case-studies/case-study-digital-marketing-for-oracle/`},
  {label: 'FMCG Distributors', href: `${S}/case-studies/case-study-digital-fmcg-marketing-for-fmcg-products/`},
  {label: 'Decking and Patio Company', href: `${S}/case-studies/case-study-digital-marketing-for-decking/`},
  {label: 'Accountants and Corporate Services', href: `${S}/case-studies/case-study-digital-marketing-for-accounting-leads/`},
  {label: 'Social Media of Instagram Chai Reel', href: `${S}/case-studies/case-study-social-media-of-syspree-instagram-chai-reel/`},
]

export const SERVICES = [
  {label: 'Web Design & Development', href: `${S}/services/web-design-development/`},
  {label: 'Digital Marketing', href: `${S}/services/digital-marketing/`},
  {label: 'AI Marketing', href: `${S}/services/ai-marketing/`},
  {label: 'Information Technology', href: `${S}/services/information-technology/`},
  {label: 'Outsourcing', href: `${S}/services/outsourcing/`},
]

export const INDUSTRIES = [
  {label: 'E-commerce', href: `${S}/industries/e-commerce-industry/`},
  {label: 'Technology and SaaS', href: `${S}/industries/technology-and-saas/`},
  {label: 'Consulting and Corporate Services', href: `${S}/industries/consulting/`},
  {label: 'Education and Training', href: `${S}/industries/education-marketing/`},
  {label: 'Healthcare', href: `${S}/industries/healthcare/`},
  {label: 'Interior Designers and Renovators', href: `${S}/industries/interiors/`},
  {label: 'Travel and Tourism', href: `${S}/industries/travel/`},
  {label: 'Hospitality and FnB', href: `${S}/industries/hospitality/`},
]

export const LOCATIONS = [
  {label: 'India', href: `${S}/locations/india/`, children: INDIA.map(loc)},
  {label: 'Australia', href: `${S}/locations/australia/`, children: AUSTRALIA.map(loc)},
  {
    label: 'Europe',
    href: `${S}/locations/europe/`,
    children: [
      ...[['France', 'france'], ['Belgium', 'belgium'], ['Portugal', 'portugal'], ['Poland', 'poland']].map(loc),
      {label: 'UK', href: `${S}/locations/uk/`, children: UK.map(loc)},
      ...[['Germany', 'germany'], ['Ireland', 'ireland']].map(loc),
    ],
  },
  {label: 'USA', href: `${S}/locations/usa/`, children: USA.map(loc)},
  {
    label: 'Middle East',
    href: `${S}/locations/middle-east/`,
    children: [
      {label: 'UAE', href: `${S}/locations/uae/`, children: UAE.map(loc)},
      ...[['Oman', 'oman'], ['Saudi Arabia', 'saudi-arabia'], ['Kuwait', 'kuwait'], ['Bahrain', 'bahrain'], ['Syria', 'syria']].map(loc),
    ],
  },
  ...[
    ['Singapore', 'singapore'],
    ['New Zealand', 'newzealand'],
    ['Africa', 'africa'],
    ['Thailand', 'thailand'],
    ['Philippines', 'philippines'],
    ['Canada', 'canada'],
    ['Malaysia', 'malaysia'],
    ['Sri Lanka', 'sri-lanka'],
    ['Nepal', 'nepal'],
    ['Hong Kong', 'hongkong'],
    ['Cameroon', 'cameroon'],
    ['Finland', 'finland'],
  ].map(loc),
]

// `internal: true` marks a link that lives on this careers app (React Router).
export const HEADER_MENU = [
  {label: 'Home', href: `${S}/`},
  {
    label: 'About Us',
    href: `${S}/about-us/`,
    active: true, // Careers lives under About Us on the main site
    children: [
      {label: 'Our Team', href: `${S}/our-team/`},
      {label: 'Careers', href: '/', internal: true, active: true},
    ],
  },
  {label: 'Services', href: `${S}/services/`, children: SERVICES},
  {label: 'Industries', href: `${S}/industries/`, children: INDUSTRIES},
  {label: 'Locations', href: `${S}/locations/`, children: LOCATIONS},
  {
    label: 'Our Works',
    href: `${S}/portfolio/`,
    children: [
      {label: 'Testimonials', href: `${S}/testimonials/`},
      {label: 'Case Studies', href: `${S}/case-studies/`, children: CASE_STUDIES},
    ],
  },
  {label: 'Blog', href: `${S}/blog/`},
]

export const CTA = {label: 'Book Free Consultation', href: `${S}/contact/`}

export const FOOTER_QUICKLINKS = [
  {label: 'Blogs', href: `${S}/blog/`},
  {label: 'About Us', href: `${S}/about-us/`},
  {label: 'Careers', href: '/', internal: true},
  {label: 'Contact Us', href: `${S}/contact/`},
  {label: 'Case Studies', children: CASE_STUDIES.slice(0, 5)},
  {
    label: 'Policies',
    children: [
      {label: 'Privacy Policy', href: `${S}/privacy-policy/`},
      {label: 'Terms and Conditions', href: `${S}/terms-conditions/`},
      {label: 'Posh Policies', href: `${S}/posh-policy/`},
    ],
  },
]

export const FOOTER_SERVICES = [
  {label: 'Web Design And Development', href: `${S}/services/web-design-development/`},
  {label: 'Digital Marketing', href: `${S}/services/digital-marketing/`},
  {label: 'Artificial Intelligence', href: `${S}/services/ai-marketing/`},
  {label: 'Information Technology', href: `${S}/services/information-technology/`},
  {label: 'Outsourcing', href: `${S}/services/outsourcing/`},
]

export const FOOTER_LOCATIONS = [
  {label: 'India', children: [loc(['India', 'india']), ...INDIA.map(loc)]},
  loc(['Singapore', 'singapore']),
  {label: 'Australia', children: [loc(['Australia', 'australia']), ...AUSTRALIA.map(loc)]},
  {label: 'USA', children: [loc(['USA', 'usa']), ...USA.map(loc)]},
  {
    label: 'Europe',
    children: [
      loc(['Europe', 'europe']),
      ...[['France', 'france'], ['Belgium', 'belgium'], ['Ireland', 'ireland'], ['Germany', 'germany'], ['Portugal', 'portugal'], ['Poland', 'poland']].map(loc),
      {label: 'UK', children: [loc(['UK', 'uk']), ...UK.map(loc)]},
    ],
  },
  {
    label: 'Middle East',
    children: [
      loc(['Middle East', 'middle-east']),
      ...[['Oman', 'oman'], ['Saudi Arabia', 'saudi-arabia']].map(loc),
      {label: 'UAE', children: [loc(['UAE', 'uae']), ...UAE.map(loc)]},
      ...[['Kuwait', 'kuwait'], ['Syria', 'syria'], ['Bahrain', 'bahrain']].map(loc),
    ],
  },
  {label: 'Africa', children: [loc(['Africa', 'africa']), loc(['Tanzania', 'tanzania'])]},
  ...[
    ['Thailand', 'thailand'],
    ['Philippines', 'philippines'],
    ['Canada', 'canada'],
    ['Sri Lanka', 'sri-lanka'],
    ['Malaysia', 'malaysia'],
    ['New Zealand', 'newzealand'],
  ].map(loc),
]

export const SOCIALS = [
  {label: 'Facebook', href: 'https://www.facebook.com/Syspree/'},
  {label: 'Instagram', href: 'https://www.instagram.com/syspree/?hl=en'},
  {label: 'LinkedIn', href: 'https://in.linkedin.com/company/syspreedigital'},
  {label: 'X', href: 'https://x.com/SySpree'},
]

export const PAY_HERE = 'https://rzp.io/rzp/bXUeuTea'
export const PAYMENT_LOGOS = [
  `${S}/wp-content/smush-webp/2024/08/Footer-logos-1.png.webp`,
  `${S}/wp-content/smush-webp/2024/08/Footer-logos-2.png.webp`,
]
