import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {PortableText} from '@portabletext/react'
import {sanityClient} from '../lib/sanity.js'
import {JOB_DETAIL_QUERY} from '../lib/queries.js'
import {timeAgo} from '../lib/format.js'
import ApplyForm from '../components/ApplyForm.jsx'
import Loader from '../components/Loader.jsx'

const ICONS = {
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  tag: (
    <>
      <path d="M3 12V4h8l10 10-8 8z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
}

function Icon({name, className = 'h-5 w-5'}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#FFF1E6" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#FF6600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionHeading({children}) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-2xl font-medium text-black">
      <span className="h-7 w-1 rounded-full bg-brand-deep" aria-hidden="true" />
      {children}
    </h2>
  )
}

function Section({title, children}) {
  return (
    <section className="border-b border-gray-200 py-8 first:pt-0 last:border-b-0">
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  )
}

function Checklist({items}) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[17px] leading-relaxed">
          <CheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Prose({value}) {
  return (
    <div className="space-y-4 text-[17px] leading-relaxed">
      <PortableText value={value} />
    </div>
  )
}

function MetaChip({icon, children}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[15px] text-black">
      <span className="text-brand-deep">
        <Icon name={icon} className="h-[18px] w-[18px]" />
      </span>
      {children}
    </span>
  )
}

function OverviewRow({icon, label, value}) {
  if (!value) return null
  return (
    <li className="flex gap-4 py-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF1E6] text-brand-deep">
        <Icon name={icon} />
      </span>
      <div>
        <p className="text-sm text-brand-muted">{label}</p>
        <p className="text-base text-black">{value}</p>
      </div>
    </li>
  )
}

function scrollToApply() {
  document.getElementById('apply')?.scrollIntoView({behavior: 'smooth', block: 'start'})
}

export default function JobDetailPage() {
  const {slug} = useParams()
  const [job, setJob] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setJob(null)
    setNotFound(false)
    window.scrollTo(0, 0)
    sanityClient
      .fetch(JOB_DETAIL_QUERY, {slug})
      .then((result) => (result ? setJob(result) : setNotFound(true)))
      .catch(() => setNotFound(true))
  }, [slug])

  useEffect(() => {
    if (job) document.title = `${job.title} — Careers at SySpree Digital`
  }, [job])

  if (notFound) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl font-medium text-black">This job isn't available</h1>
        <p className="mt-3">The posting may have closed. Take a look at our other openings.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-brand-orange px-7 py-3 text-base font-medium text-white transition hover:bg-brand-deep"
        >
          View all jobs
        </Link>
      </main>
    )
  }

  if (!job) return <Loader label="Loading job…" />

  const locations = job.locations?.map((l) => l.title).join(', ')

  return (
    <main>
      {/* Header band */}
      <div className="border-b border-gray-200 bg-[#F7F7F7]">
        <div className="mx-auto max-w-[1140px] px-5 py-10 md:py-14">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-brand-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-deep">
              Careers
            </Link>
            <span aria-hidden="true">/</span>
            {job.category && (
              <>
                <span>{job.category.title}</span>
                <span aria-hidden="true">/</span>
              </>
            )}
            <span className="text-black">{job.title}</span>
          </nav>

          <h1 className="mt-5 text-4xl font-medium leading-tight text-black md:text-5xl">{job.title}</h1>
          <p className="mt-2 text-lg">
            at <span className="text-brand-deep">{job.company}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {job.jobType && <MetaChip icon="briefcase">{job.jobType.title}</MetaChip>}
            {locations && <MetaChip icon="pin">{locations}</MetaChip>}
            {job.experience && <MetaChip icon="star">{job.experience}</MetaChip>}
            <MetaChip icon="calendar">{timeAgo(job.postedAt)}</MetaChip>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button
              onClick={scrollToApply}
              className="rounded-full bg-brand-orange px-8 py-4 text-base font-medium leading-none text-white transition hover:bg-brand-deep"
            >
              Apply Now
            </button>
            <Link to="/" className="text-base text-black underline-offset-4 hover:text-brand-deep hover:underline">
              ← Back to all jobs
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1140px] gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <article>
          {job.aboutCompany && (
            <Section title={`About ${job.company}`}>
              <Prose value={job.aboutCompany} />
            </Section>
          )}
          {job.role && (
            <Section title="The Role">
              <Prose value={job.role} />
            </Section>
          )}
          {job.responsibilities?.length > 0 && (
            <Section title="What You'll Do">
              <Checklist items={job.responsibilities} />
            </Section>
          )}
          {job.requirements?.length > 0 && (
            <Section title="What You Bring">
              <Checklist items={job.requirements} />
            </Section>
          )}
          {job.niceToHave?.length > 0 && (
            <Section title="Nice to Have">
              <Checklist items={job.niceToHave} />
            </Section>
          )}
          {job.coreCompetencies?.length > 0 && (
            <Section title="Core Competencies">
              <ul className="flex flex-wrap gap-2.5">
                {job.coreCompetencies.map((c, i) => (
                  <li key={i} className="rounded-full bg-[#FFF1E6] px-4 py-2 text-[15px] text-black">
                    {c}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {job.benefits?.length > 0 && (
            <Section title="What We Offer">
              <ul className="grid gap-4 sm:grid-cols-2">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex gap-3 rounded-lg border border-gray-200 p-4 text-base leading-relaxed">
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Apply */}
          <section id="apply" className="mt-10 scroll-mt-28 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_6px_30px_rgba(0,0,0,0.06)] md:p-10">
            <ApplyForm jobId={job._id} jobTitle={job.title} />
          </section>
        </article>

        {/* Sidebar */}
        <aside className="lg:order-none">
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-medium text-black">Job Overview</h2>
              <ul className="mt-2 divide-y divide-gray-100">
                <OverviewRow icon="tag" label="Category" value={job.category?.title} />
                <OverviewRow icon="briefcase" label="Job Type" value={job.jobType?.title} />
                <OverviewRow icon="pin" label="Location" value={locations} />
                <OverviewRow icon="star" label="Experience" value={job.experience} />
                <OverviewRow icon="calendar" label="Posted" value={timeAgo(job.postedAt).replace(/^Posted /, '')} />
              </ul>
              <button
                onClick={scrollToApply}
                className="mt-4 w-full rounded-full bg-brand-orange py-3.5 text-base font-medium text-white transition hover:bg-brand-deep"
              >
                Apply Now
              </button>
            </div>

            <div className="rounded-xl bg-brand-orange p-6 text-black">
              <h2 className="text-xl font-medium">Questions about this role?</h2>
              <p className="mt-2 text-base">Write to our HR team and we'll get back to you.</p>
              <a href="mailto:hr@syspree.com" className="mt-3 inline-block text-lg font-medium underline underline-offset-4">
                hr@syspree.com
              </a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
