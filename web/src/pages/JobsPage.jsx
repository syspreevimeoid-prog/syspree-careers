import {useEffect, useMemo, useState} from 'react'
import {sanityClient} from '../lib/sanity.js'
import {JOB_LIST_QUERY, TAXONOMY_QUERY} from '../lib/queries.js'
import Hero from '../components/Hero.jsx'
import FilterBar from '../components/FilterBar.jsx'
import JobList from '../components/JobList.jsx'
import QuickApplyModal from '../components/QuickApplyModal.jsx'
import Loader from '../components/Loader.jsx'

export default function JobsPage({settings}) {
  const [jobs, setJobs] = useState(null)
  const [taxonomy, setTaxonomy] = useState({categories: [], jobTypes: [], locations: []})
  const [filters, setFilters] = useState({keyword: '', categorySlug: '', jobTypeSlug: '', locationSlug: ''})
  const [quickApplyJob, setQuickApplyJob] = useState(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    Promise.all([sanityClient.fetch(JOB_LIST_QUERY), sanityClient.fetch(TAXONOMY_QUERY)])
      .then(([jobList, tax]) => {
        setJobs(jobList)
        setTaxonomy(tax)
      })
      .catch((err) => setLoadError(err.message || 'Could not load jobs.'))
  }, [])

  const filteredJobs = useMemo(() => {
    if (!jobs) return []
    const keyword = filters.keyword.trim().toLowerCase()
    return jobs.filter((job) => {
      if (keyword && !`${job.title} ${job.summary}`.toLowerCase().includes(keyword)) return false
      if (filters.categorySlug && job.category?.slug?.current !== filters.categorySlug) return false
      if (filters.jobTypeSlug && job.jobType?.slug?.current !== filters.jobTypeSlug) return false
      if (filters.locationSlug && !job.locations?.some((l) => l.slug?.current === filters.locationSlug)) return false
      return true
    })
  }, [jobs, filters])

  return (
    <>
      <Hero
        tagline={settings?.heroTagline}
        headingHighlight={settings?.heroHeadingHighlight}
        headingRest={settings?.heroHeadingRest}
        subtext={settings?.heroSubtext}
        contactUrl={settings?.contactUrl}
      />
      <main className="mx-auto max-w-4xl px-6 pb-20 md:px-0">
        <FilterBar filters={filters} onChange={setFilters} taxonomy={taxonomy} />

        <h2 className="mt-12 mb-6 font-serif text-3xl font-bold text-gray-900">Current Jobs</h2>

        {loadError && <p className="text-sm text-red-600">{loadError}</p>}
        {!jobs && !loadError && <Loader label="Loading jobs…" />}
        {jobs && <JobList jobs={filteredJobs} onQuickApply={setQuickApplyJob} />}
      </main>

      <QuickApplyModal job={quickApplyJob} onClose={() => setQuickApplyJob(null)} />
    </>
  )
}
