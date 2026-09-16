import {Link} from 'react-router-dom'
import {timeAgo} from '../lib/format.js'

function BriefcaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}

export default function JobCard({job, onQuickApply}) {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-start gap-4">
        <img src="/logo.webp" alt="" className="mt-1 h-8 w-auto shrink-0 object-contain" />
        <div className="min-w-0 flex-1">
          <Link
            to={`/jobs/${job.slug.current}`}
            className="font-serif text-lg font-bold text-gray-900 hover:text-brand-orange"
          >
            {job.title} {job.company ? `| ${job.company.split(' ')[0]}` : ''}
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-5 font-serif text-sm text-gray-700">
            {job.jobType && (
              <span className="flex items-center gap-1.5">
                <BriefcaseIcon />
                <span className="text-brand-orange">{job.jobType.title}</span>
              </span>
            )}
            {job.locations?.length > 0 && (
              <span className="flex items-center gap-1.5">
                <PinIcon />
                <span className="text-brand-orange">{job.locations.map((l) => l.title).join(', ')}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <CalendarIcon />
              <span className="text-brand-orange">{timeAgo(job.postedAt)}</span>
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 font-serif text-sm text-gray-600">{job.summary}</p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onQuickApply(job)}
          className="rounded-full bg-brand-orange px-5 py-2 font-serif text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Quick Apply
        </button>
        <Link
          to={`/jobs/${job.slug.current}`}
          className="rounded-full border border-gray-300 px-5 py-2 font-serif text-sm font-semibold text-gray-700 transition hover:border-brand-orange hover:text-brand-orange"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}
