import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {PortableText} from '@portabletext/react'
import {sanityClient} from '../lib/sanity.js'
import {JOB_DETAIL_QUERY} from '../lib/queries.js'
import {timeAgo} from '../lib/format.js'
import JobFeaturesTable from '../components/JobFeaturesTable.jsx'
import ApplyForm from '../components/ApplyForm.jsx'
import Loader from '../components/Loader.jsx'

function BulletList({title, items}) {
  if (!items || items.length === 0) return null
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function JobDetailPage() {
  const {slug} = useParams()
  const [job, setJob] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setJob(null)
    setNotFound(false)
    sanityClient.fetch(JOB_DETAIL_QUERY, {slug}).then((result) => {
      if (!result) setNotFound(true)
      else setJob(result)
    })
  }, [slug])

  if (notFound) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
        <p className="mt-2 text-gray-600">This posting may have closed.</p>
        <Link to="/" className="mt-6 inline-block text-brand-orange">
          ← Back to all jobs
        </Link>
      </main>
    )
  }

  if (!job) return <Loader label="Loading job…" />

  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 md:px-0">
      <Link to="/" className="text-sm text-gray-500 hover:text-brand-orange">
        ← Back to all jobs
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-gray-900">{job.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <span className="font-semibold text-pink-700">{job.company}</span>
        {job.jobType && <span>🧳 {job.jobType.title}</span>}
        {job.locations?.length > 0 && <span>📍 {job.locations.map((l) => l.title).join(', ')}</span>}
        <span>🗓 {timeAgo(job.postedAt)}</span>
      </div>

      {job.aboutCompany && (
        <div className="prose prose-gray mt-8 max-w-none">
          <h3 className="text-xl font-semibold text-gray-900">About {job.company}</h3>
          <PortableText value={job.aboutCompany} />
        </div>
      )}

      {job.role && (
        <div className="prose prose-gray mt-8 max-w-none">
          <h3 className="text-xl font-semibold text-gray-900">The Role</h3>
          <PortableText value={job.role} />
        </div>
      )}

      <BulletList title="What You'll Do" items={job.responsibilities} />
      <BulletList title="What You Bring" items={job.requirements} />
      <BulletList title="Nice to Have" items={job.niceToHave} />
      <BulletList title="Core Competencies" items={job.coreCompetencies} />
      <BulletList title="What We Offer" items={job.benefits} />

      <JobFeaturesTable job={job} />

      <div className="mt-12 rounded-xl border border-gray-200 p-6">
        <ApplyForm jobId={job._id} jobTitle={job.title} />
      </div>
    </main>
  )
}
