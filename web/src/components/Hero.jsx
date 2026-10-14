// Text sizes/weights mirror the syspree.com homepage hero (measured at 1440px and 375px).
export default function Hero({tagline, headingHighlight, headingRest, subtext, contactUrl}) {
  return (
    <section
      className="relative overflow-hidden bg-white bg-cover bg-[position:18%_45%] bg-no-repeat pb-28 pt-14 text-center md:bg-[position:center_45%] md:pb-36 md:pt-20"
      // Jumping figure + cliffs artwork, carried over from the original careers.syspree.com hero
      style={{backgroundImage: 'url(/hero-bg.png)'}}
    >
      <div className="relative mx-auto max-w-[1140px] px-5">
        <p className="text-base font-medium uppercase leading-[1.3] text-[#434242] md:text-[17px]">
          {tagline || 'See the difference SySpree makes'}
        </p>

        <h1 className="mt-3 text-[30px] font-medium leading-[36px] text-black md:text-[36px] md:leading-[50.4px]">
          <b className="text-brand-orange">{headingHighlight || 'Explore Opportunities:'}</b>{' '}
          {headingRest || 'Build a Future That Thrives'}
        </h1>

        <p className="mx-auto mt-3 max-w-[900px] text-base font-medium uppercase leading-[1.1] tracking-[0.9px] text-[#434242] md:text-[17px]">
          {subtext ||
            'Discover roles that empower professionals to grow, innovate, and excel in a dynamic and competitive environment.'}
        </p>

        <a
          href={contactUrl || 'https://syspree.com/contact/'}
          className="mt-10 inline-block rounded-[50px] bg-brand-orange px-8 py-4 text-lg leading-none text-white transition hover:bg-brand-deep md:mt-12 md:p-[25px] md:px-10 md:text-[23px]"
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
