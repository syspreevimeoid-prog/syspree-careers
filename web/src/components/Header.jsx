import {useState} from 'react'
import {Link} from 'react-router-dom'

const MAIN_SITE = 'https://syspree.com'

const NAV_LINKS = [
  {label: 'Home', href: MAIN_SITE},
  {label: 'About US', href: `${MAIN_SITE}/about-us/`},
  {label: 'Services', href: `${MAIN_SITE}/services/`},
  {label: 'Portfolio', href: `${MAIN_SITE}/portfolio/`},
  {label: 'Careers', href: '/', active: true},
  {
    label: 'Testimonials',
    href: `${MAIN_SITE}/testimonials/`,
    children: [
      {label: 'Client Reviews', href: `${MAIN_SITE}/testimonials/` },
      {label: 'Case Studies', href: `${MAIN_SITE}/case-studies/`},
    ],
  },
]

export default function Header({contactUrl}) {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <Link to="/" className="shrink-0">
          <img src="/logo.webp" alt="SySpree Digital Pvt. Ltd." className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 font-serif text-[17px] text-gray-900 lg:flex">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <button className="flex items-center gap-1 py-2 hover:text-brand-orange">
                  {link.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-0.5">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="invisible absolute left-0 top-full min-w-[180px] rounded-md border border-gray-100 bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-brand-orange"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : link.href === '/' ? (
              <Link key={link.label} to={link.href} className={link.active ? 'text-brand-orange' : 'hover:text-brand-orange'}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-brand-orange">
                {link.label}
              </a>
            ),
          )}
        </nav>

        <a
          href={contactUrl || 'https://syspree.com/contact-us/'}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-brand-orange px-6 py-2.5 font-serif text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 lg:inline-block"
        >
          Contact Us
        </a>

        <button
          onClick={() => setOpenMenu((v) => !v)}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 lg:hidden"
        >
          <span className="h-0.5 w-6 bg-gray-900" />
          <span className="h-0.5 w-6 bg-gray-900" />
          <span className="h-0.5 w-6 bg-gray-900" />
        </button>
      </div>

      {openMenu && (
        <nav className="flex flex-col gap-1 border-t border-gray-100 px-6 py-4 font-serif text-base lg:hidden">
          {NAV_LINKS.map((link) =>
            link.href === '/' ? (
              <Link key={link.label} to={link.href} className="py-2 text-brand-orange" onClick={() => setOpenMenu(false)}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="py-2 hover:text-brand-orange">
                {link.label}
              </a>
            ),
          )}
          <a
            href={contactUrl || 'https://syspree.com/contact-us/'}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block rounded-full bg-brand-orange px-6 py-2.5 text-center text-sm font-semibold text-white"
          >
            Contact Us
          </a>
        </nav>
      )}
    </header>
  )
}
