export default function Hero({tagline, headingHighlight, headingRest, subtext, contactUrl}) {
  return (
    <section
      className="relative overflow-hidden bg-white bg-cover bg-[position:18%_45%] bg-no-repeat md:bg-[position:center_45%] pb-32 pt-16 text-center md:pb-40 md:pt-24"
      // Jumping figure + cliffs artwork, carried over from the original careers.syspree.com hero
      style={{backgroundImage: 'url(/hero-bg.png)'}}
    >
      <div className="relative mx-auto max-w-[1700px] px-5">
        <p className="text-base uppercase text-[#434242] md:text-[22px]">{tagline || 'See the difference SySpree makes'}</p>

        <h1 className="mt-3 text-[34px] leading-tight text-black md:text-[52px]">
          <span className="font-bold text-brand-orange">{headingHighlight || 'Explore Opportunities:'}</span>{' '}
          <span>{headingRest || 'Build a Future That Thrives'}</span>
        </h1>

        <p className="mx-auto mt-3 max-w-[1650px] text-base uppercase leading-tight tracking-[0.04em] text-[#434242] md:text-[24px]">
          {subtext ||
            'Discover roles that empower professionals to grow, innovate, and excel in a dynamic and competitive environment.'}
        </p>

        <a
          href={contactUrl || 'https://syspree.com/contact/'}
          className="mt-12 inline-block rounded-full bg-brand-orange px-14 py-5 text-lg leading-none text-white transition hover:bg-brand-deep md:mt-20 md:text-[22px]"
        >
          Contact Us
        </a>
      </div>

      {/* Orange mountain divider */}
      <div
        className="absolute inset-x-0 bottom-0 h-14 bg-brand-orange md:h-20"
        style={{clipPath: 'polygon(0 100%, 0 95%, 25% 45%, 37% 60%, 67% 0, 100% 80%, 100% 100%)'}}
        aria-hidden="true"
      />
    </section>
  )
}
