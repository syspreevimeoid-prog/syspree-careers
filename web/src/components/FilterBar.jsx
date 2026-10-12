// Results already update as you type/select; the search button (as on the original
// careers.syspree.com) submits the form and scrolls down to the matching jobs.
export default function FilterBar({filters, onChange, taxonomy, onSearch}) {
  const {keyword, categorySlug, jobTypeSlug, locationSlug} = filters
  const field =
    'w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none'

  function handleSubmit(e) {
    e.preventDefault()
    onSearch?.()
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="mx-auto max-w-4xl rounded-md bg-gray-100 p-6 md:p-8">
      <input
        type="text"
        value={keyword}
        onChange={(e) => onChange({...filters, keyword: e.target.value})}
        placeholder="Keywords"
        aria-label="Keywords"
        className={field}
      />
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <select
          value={categorySlug}
          onChange={(e) => onChange({...filters, categorySlug: e.target.value})}
          aria-label="Category"
          className={field}
        >
          <option value="">Category</option>
          {taxonomy.categories.map((c) => (
            <option key={c._id} value={c.slug.current}>
              {c.title}
            </option>
          ))}
        </select>
        <select
          value={jobTypeSlug}
          onChange={(e) => onChange({...filters, jobTypeSlug: e.target.value})}
          aria-label="Job Type"
          className={field}
        >
          <option value="">Job Type</option>
          {taxonomy.jobTypes.map((t) => (
            <option key={t._id} value={t.slug.current}>
              {t.title}
            </option>
          ))}
        </select>
        <select
          value={locationSlug}
          onChange={(e) => onChange({...filters, locationSlug: e.target.value})}
          aria-label="Location"
          className={field}
        >
          <option value="">Location</option>
          {taxonomy.locations.map((l) => (
            <option key={l._id} value={l.slug.current}>
              {l.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          aria-label="Search jobs"
          className="flex items-center justify-center rounded-md bg-brand-deep py-2.5 text-white transition hover:bg-brand-orange"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5L21 21" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </form>
  )
}
