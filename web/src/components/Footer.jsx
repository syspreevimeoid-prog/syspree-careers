import {useState} from 'react'
import {
  FOOTER_LOCATIONS,
  FOOTER_QUICKLINKS,
  FOOTER_SERVICES,
  INDUSTRIES,
  PAY_HERE,
  PAYMENT_LOGOS,
  SOCIALS,
} from '../lib/siteNav.js'
import SiteLink from './SiteLink.jsx'

const ICON = {
  Facebook: 'M14 8h3V4h-3c-2.8 0-4 1.7-4 4.2V10H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z',
  Instagram:
    'M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21 7a5.4 5.4 0 0 0-1.5-3.8A5.4 5.4 0 0 0 15.7 2C14.2 2 9.8 2 8.3 2a5.4 5.4 0 0 0-3.8 1.5A5.4 5.4 0 0 0 3 7.3C3 8.8 3 15.2 3 16.7a5.4 5.4 0 0 0 1.5 3.8A5.4 5.4 0 0 0 8.3 22h7.4a5.4 5.4 0 0 0 3.8-1.5 5.4 5.4 0 0 0 1.5-3.8C21 15.2 21 8.8 21 7.3z',
  LinkedIn:
    'M6.5 8.5h-3V20h3zM5 3.5A1.8 1.8 0 1 0 6.8 5.3 1.8 1.8 0 0 0 5 3.5zM20.5 13.4c0-3-1.6-5.1-4.4-5.1a3.8 3.8 0 0 0-3.4 1.9V8.5h-3V20h3v-6c0-1.6.6-3 2.3-3s2.2 1.4 2.2 3.1V20h3.3z',
  X: 'M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2 3h6.3l4.3 5.7zm-1.1 16.2h1.7L7.4 4.7H5.6z',
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  )
}
function SignpostIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 2h2v3h7l2 2.5L20 10h-7v2h-2V9H4L2 6.5 4 4h7zm0 12h2v8h-2zm-7 0h7v-1H3l-1 1.5L3 16h8v-1H4z" />
    </svg>
  )
}
function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  )
}
function MailIcon({size = 18}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function ContactRow({icon, children}) {
  return (
    <div className="flex gap-4 border-b border-gray-200 py-3 last:border-b-0">
      <span className="mt-1 shrink-0 text-black">{icon}</span>
      <div className="text-[17px] leading-relaxed text-black">{children}</div>
    </div>
  )
}

function OfficeHeading({children}) {
  return <h3 className="mb-2 text-[23px] font-medium text-brand-deep">{children}</h3>
}

function Chevron({open}) {
  return (
    <svg width="9" height="6" viewBox="0 0 10 6" fill="none" className={`transition ${open ? 'rotate-180' : ''}`} aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

// A footer link list where items with children expand in place, like the main site's footer.
function FooterTree({items, depth = 0}) {
  return (
    <ul className={depth ? 'mt-1 space-y-1 pl-4' : 'space-y-1'}>
      {items.map((item) => (
        <FooterTreeItem key={item.label} item={item} depth={depth} />
      ))}
    </ul>
  )
}

function FooterTreeItem({item, depth}) {
  const [open, setOpen] = useState(false)
  if (!item.children) {
    return (
      <li>
        <SiteLink item={item} className="block py-1 text-base text-brand-muted transition hover:text-brand-deep" />
      </li>
    )
  }
  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 py-1 text-base text-brand-muted transition hover:text-brand-deep"
      >
        {item.label}
        <Chevron open={open} />
      </button>
      {open && <FooterTree items={item.children} depth={depth + 1} />}
    </li>
  )
}

function ColumnHeading({children}) {
  return <h4 className="mb-4 text-xl font-bold uppercase text-brand-deep">{children}</h4>
}

export default function Footer({hrEmail}) {
  const email = hrEmail || 'hr@syspree.com'
  return (
    <footer className="mt-16 bg-white">
      {/* Careers-specific banner, as on careers.syspree.com */}
      <div className="bg-brand-orange px-5 py-8">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-2xl leading-snug text-black md:max-w-[60%] md:text-left md:text-[28px]">
            Email now for web development, designing, SEO and Social media marketing jobs!
          </p>
          <a href={`mailto:${email}`} className="flex items-center gap-4 text-2xl text-[#333] md:text-[28px]">
            <MailIcon size={40} />
            {email}
          </a>
        </div>
      </div>

      {/* Get in Touch */}
      <div className="px-5 py-16">
        <div className="mx-auto max-w-[1140px]">
          <p className="text-[17px] font-medium uppercase text-[#434242]">Contact Us</p>
          <h2 className="mt-1 text-[26px] font-medium text-black">Get in Touch</h2>

          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <div className="space-y-10">
              <div>
                <OfficeHeading>Singapore Office:</OfficeHeading>
                <ContactRow icon={<PhoneIcon />}>
                  <a href="tel:+6589000811">+65 8900 0811</a>
                </ContactRow>
                <ContactRow icon={<SignpostIcon />}>
                  SYSPREE DIGITAL PTE LTD.
                  <br />7 Temasek Boulevard, #12-07 Suntec Tower One, Singapore, 038987
                </ContactRow>
                <ContactRow icon={<TargetIcon />}>UEN : 201931082K</ContactRow>
              </div>
              <div>
                <OfficeHeading>United Arab Emirates (UAE):</OfficeHeading>
                <ContactRow icon={<PhoneIcon />}>
                  <a href="tel:+97148714592">+971 48714592</a>
                  <br />
                  <a href="tel:+971505312199">+971 505312199</a>
                </ContactRow>
                <ContactRow icon={<SignpostIcon />}>
                  SySpree Digital
                  <br />
                  Aspect Tower 1005 A office no.
                  <br />
                  Business Bay, UAE
                </ContactRow>
              </div>
              <div>
                <OfficeHeading>Email:</OfficeHeading>
                <ContactRow icon={<MailIcon />}>
                  <a href="mailto:contactus@syspree.com">contactus@syspree.com</a>
                </ContactRow>
              </div>
            </div>

            <div>
              <OfficeHeading>India office:</OfficeHeading>
              <ContactRow icon={<PhoneIcon />}>
                <a href="tel:+918652398888">+91 8652398888</a>
                <br />
                <a href="tel:+912241275220">+91 22 41275220</a>,
                <br />
                <a href="tel:+912246048068">+91 2246048068</a>
              </ContactRow>
              <ContactRow icon={<SignpostIcon />}>
                SYSPREE DIGITAL PVT LTD.
                <br />
                1101- B, 11th Floor,
                <br />
                Dev Corpora, ‘A’ wing,
                <br />
                Eastern Express Highway,
                <br />
                Cadbury Junction,
                <br />
                Thane (W), Mumbai,
                <br />
                Maharashtra 400601, India.
              </ContactRow>
              <ContactRow icon={<TargetIcon />}>
                (CIN ) : U72900MH2021FTC372638
                <br />
                GSTIN : 27ABHCS6321H1Z9
              </ContactRow>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="px-5 pb-10">
        <div className="mx-auto grid max-w-[1140px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]">
          <div>
            <img src="/logo.webp" alt="SySpree Digital" className="h-[45px] w-auto" />
            <h4 className="mt-10 text-sm font-bold text-brand-deep">Socials</h4>
            <div className="mt-3 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-deep text-white transition hover:opacity-80"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={ICON[s.label]} />
                  </svg>
                </a>
              ))}
            </div>
            <h4 className="mt-6 text-sm font-bold text-brand-deep">Payments</h4>
            <div className="mt-3 space-y-2">
              {PAYMENT_LOGOS.map((src) => (
                <img key={src} src={src} alt="Accepted payment methods" className="h-14 w-auto" loading="lazy" />
              ))}
            </div>
            <a
              href={PAY_HERE}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-[30px] bg-[#808080] px-5 py-2 text-base text-white transition hover:bg-[#666]"
            >
              Pay Here
            </a>
          </div>

          <div>
            <ColumnHeading>Quicklinks</ColumnHeading>
            <FooterTree items={FOOTER_QUICKLINKS} />
          </div>
          <div>
            <ColumnHeading>Services</ColumnHeading>
            <FooterTree items={FOOTER_SERVICES} />
          </div>
          <div>
            <ColumnHeading>Industries</ColumnHeading>
            <FooterTree items={INDUSTRIES} />
          </div>
          <div>
            <ColumnHeading>Locations</ColumnHeading>
            <FooterTree items={FOOTER_LOCATIONS} />
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-[1140px] border-t border-gray-200 pt-6 text-sm text-brand-muted">
          © 2014 – {new Date().getFullYear()} · SySpree.Com · All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
