export default function Hero({tagline, headingHighlight, headingRest, subtext, contactUrl}) {
  return (
    <section className="relative overflow-hidden bg-white pb-28 pt-16 text-center">
      {/* Decorative backdrop: a reaching/leaping figure (original artwork, evoking the
          brand's motif without tracing their asset) on the left, a soft shape on the right */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <svg className="absolute -left-4 bottom-0 h-64 w-40 text-gray-300 opacity-60 md:h-80 md:w-52" viewBox="0 0 140 260" fill="currentColor">
          <ellipse cx="55" cy="30" rx="16" ry="17" />
          <path d="M60 45 C50 60 20 70 5 130 L20 138 C40 95 58 85 65 78 L78 140 L96 250 L118 244 L100 150 C112 120 130 90 132 60 L114 55 C108 85 96 105 82 118 C78 95 74 70 60 45 Z" />
        </svg>
        <div className="absolute -right-20 bottom-4 h-56 w-56 rounded-[45%] bg-gray-200 opacity-50 md:h-72 md:w-72" />
      </div>

      <p className="font-serif text-sm font-semibold uppercase tracking-widest text-gray-500">
        {tagline || 'See the difference SySpree makes'}
      </p>

      <h1 className="mx-auto mt-4 max-w-3xl px-6 font-serif text-3xl leading-tight text-gray-900 md:text-5xl">
        <span className="font-bold text-brand-orange">{headingHighlight || 'Explore Opportunities:'}</span>{' '}
        <span>{headingRest || 'Build a Future That Thrives'}</span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl px-6 font-serif text-sm uppercase tracking-wide text-gray-600 md:text-base">
        {subtext ||
          'Discover roles that empower professionals to grow, innovate, and excel in a dynamic and competitive environment.'}
      </p>

      <a
        href={contactUrl || 'https://syspree.com/contact-us/'}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block rounded-full bg-brand-orange px-8 py-3 font-serif text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
      >
        Contact Us
      </a>

      {/* Diagonal orange divider, recreated with clip-path — no image asset needed */}
      <div
        className="absolute inset-x-0 bottom-0 h-14 bg-brand-orange md:h-16"
        style={{clipPath: 'polygon(0 100%, 0 80%, 24% 45%, 35% 60%, 66% 0, 100% 75%, 100% 100%)'}}
        aria-hidden="true"
      />
    </section>
  )
}
