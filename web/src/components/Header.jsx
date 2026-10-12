import {useState} from 'react'
import {Link} from 'react-router-dom'
import {CTA, HEADER_MENU} from '../lib/siteNav.js'
import SiteLink from './SiteLink.jsx'

function Chevron({className = ''}) {
  return (
    <svg width="9" height="6" viewBox="0 0 10 6" fill="none" className={className} aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

// Each menu level gets its own Tailwind group name: a named group-hover matches any
// ancestor with that name, so sharing one name would open every nested flyout at once.
const GROUP = ['group/l0', 'group/l1', 'group/l2', 'group/l3']
const SHOW_ON_PARENT_HOVER = [
  'group-hover/l0:visible group-hover/l0:opacity-100',
  'group-hover/l1:visible group-hover/l1:opacity-100',
  'group-hover/l2:visible group-hover/l2:opacity-100',
]

// Desktop flyout: first level drops down, deeper levels open to the right.
function DropdownList({items, depth}) {
  const nested = depth > 0
  return (
    <ul
      className={`invisible absolute z-50 min-w-[230px] bg-white py-2 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition ${
        SHOW_ON_PARENT_HOVER[depth]
      } ${nested ? 'left-full top-0' : 'left-0 top-full'}`}
    >
      {items.map((item) => (
        <li key={item.label} className={`${GROUP[depth + 1]} relative`}>
          <SiteLink
            item={item}
            className={`flex items-center justify-between gap-3 px-5 py-2.5 text-base hover:text-brand-deep ${
              item.active ? 'text-brand-deep' : 'text-black'
            }`}
          >
            {item.label}
            {item.children && <Chevron className="-rotate-90" />}
          </SiteLink>
          {item.children && <DropdownList items={item.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  )
}

// Mobile accordion
function MobileItem({item, depth, onNavigate}) {
  const [open, setOpen] = useState(false)
  return (
    <li>
      <div className="flex items-center justify-between border-b border-gray-100" style={{paddingLeft: depth * 16}}>
        <SiteLink
          item={item}
          onClick={onNavigate}
          className={`flex-1 py-3 text-base ${item.active ? 'text-brand-deep' : 'text-black'}`}
        />
        {item.children && (
          <button onClick={() => setOpen((v) => !v)} aria-label={`Toggle ${item.label}`} className="p-3">
            <Chevron className={open ? 'rotate-180' : ''} />
          </button>
        )}
      </div>
      {item.children && open && (
        <ul>
          {item.children.map((child) => (
            <MobileItem key={child.label} item={child} depth={depth + 1} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-6 px-5 py-3">
        <Link to="/" className="shrink-0">
          <img
            src="/logo.webp"
            alt="Digital Marketing Agency | Web Design Company | AI Marketing Agency LOGO | Syspree"
            className="h-[45px] w-auto"
          />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center">
            {HEADER_MENU.map((item) => (
              <li key={item.label} className={`${GROUP[0]} relative`}>
                <SiteLink
                  item={item}
                  className={`flex items-center gap-1.5 px-3 py-6 text-base font-medium hover:text-brand-deep ${
                    item.active ? 'text-brand-deep' : 'text-black'
                  }`}
                >
                  {item.label}
                  {item.children && <Chevron />}
                </SiteLink>
                {item.children && <DropdownList items={item.children} depth={0} />}
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={CTA.href}
          className="hidden shrink-0 rounded-full border border-white bg-brand-orange px-5 py-[18px] text-base font-medium leading-none text-white transition hover:bg-brand-deep lg:inline-block"
        >
          {CTA.label}
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
        >
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
        </button>
      </div>

      {menuOpen && (
        <nav className="max-h-[75vh] overflow-y-auto border-t border-gray-100 px-5 pb-5 lg:hidden">
          <ul>
            {HEADER_MENU.map((item) => (
              <MobileItem key={item.label} item={item} depth={0} onNavigate={() => setMenuOpen(false)} />
            ))}
          </ul>
          <a
            href={CTA.href}
            className="mt-4 block rounded-full bg-brand-orange px-5 py-4 text-center text-base font-medium text-white"
          >
            {CTA.label}
          </a>
        </nav>
      )}
    </header>
  )
}
