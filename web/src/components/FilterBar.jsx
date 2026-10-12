export default function FilterBar({filters, onChange, taxonomy}) {
  const {keyword, categorySlug, jobTypeSlug, locationSlug} = filters

  return (
    <div className="mx-auto max-w-4xl rounded-md bg-gray-100 p-6 md:p-8">
      <input
        type="text"
        value={keyword}
        onChange={(e) => onChange({...filters, keyword: e.target.value})}
        placeholder="Keywords"
        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none"
      />
      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <select
          value={categorySlug}
          onChange={(e) => onChange({...filters, categorySlug: e.target.value})}
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none"
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
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none"
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
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none"
        >
          <option value="">Location</option>
          {taxonomy.locations.map((l) => (
            <option key={l._id} value={l.slug.current}>
              {l.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
