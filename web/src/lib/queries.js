export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`

export const TAXONOMY_QUERY = `{
  "categories": *[_type == "careerCategory"] | order(title asc) { _id, title, slug },
  "jobTypes": *[_type == "careerJobType"] | order(title asc) { _id, title, slug },
  "locations": *[_type == "careerLocation"] | order(title asc) { _id, title, slug }
}`

export const JOB_LIST_QUERY = `*[_type == "careerJobPosting" && isActive == true] | order(postedAt desc) {
  _id,
  title,
  slug,
  company,
  experience,
  postedAt,
  summary,
  "category": category->{_id, title, slug},
  "jobType": jobType->{_id, title, slug},
  "locations": locations[]->{_id, title, slug}
}`

export const JOB_DETAIL_QUERY = `*[_type == "careerJobPosting" && slug.current == $slug && isActive == true][0] {
  _id,
  title,
  slug,
  company,
  experience,
  postedAt,
  summary,
  aboutCompany,
  role,
  responsibilities,
  requirements,
  niceToHave,
  coreCompetencies,
  benefits,
  "category": category->{_id, title, slug},
  "jobType": jobType->{_id, title, slug},
  "locations": locations[]->{_id, title, slug}
}`
