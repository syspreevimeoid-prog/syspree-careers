const MAIN_SITE = 'https://syspree.com'

const QUICK_LINKS = [
  {label: 'About Us', href: `${MAIN_SITE}/about-us/`},
  {label: 'Services', href: `${MAIN_SITE}/services/`},
  {label: 'Careers', href: '/', internal: true},
  {label: 'Blog', href: `${MAIN_SITE}/blog/`},
  {label: 'Portfolio', href: `${MAIN_SITE}/portfolio/`},
  {label: 'Privacy Policy', href: `${MAIN_SITE}/privacy-policy/`},
]

const SERVICE_LINKS = [
  'Web Design And Development',
  'Digital Marketing',
  'Artificial Intelligence',
  'Information Technology',
  'Outsourcing',
]

const PAYMENT_METHODS = ['PayPal', 'Visa', 'Mastercard', 'Stripe', 'PayNow', 'GPay']

const SOCIALS = [
  {label: 'Facebook', href: 'https://www.facebook.com/syspreedigital'},
  {label: 'Instagram', href: 'https://www.instagram.com/syspreedigital'},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/company/syspree-digital'},
  {label: 'X', href: 'https://twitter.com/syspreedigital'},
]

function SocialIcon({label}) {
  const initials = label === 'X' ? '𝕏' : label[0]
  return (
    <a
      href={SOCIALS.find((s) => s.label === label)?.href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-sm font-semibold text-white transition hover:bg-orange-600"
    >
      {initials}
    </a>
  )
}

export default function Footer({hrEmail}) {
  return (
    <footer className="mt-16 font-serif">
      <div className="bg-brand-orange px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-gray-900 md:flex-row">
          <p className="text-center text-base md:text-left">
            Email now for web development, designing, SEO and Social media marketing jobs!
          </p>
          <a href={`mailto:${hrEmail || 'hr@syspree.com'}`} className="text-lg font-semibold text-gray-900">
            ✉ {hrEmail || 'hr@syspree.com'}
          </a>
        </div>
      </div>

      <div className="bg-white px-6 py-14 text-center md:px-12">
        <h2 className="text-3xl font-bold text-brand-orange">Get in Touch</h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-10 text-left md:grid-cols-2">
          <div>
            <h3 className="font-bold text-brand-orange">Singapore Office:</h3>
            <p className="mt-3 text-gray-700">+65 8900 0811</p>
            <p className="mt-3 text-gray-700">
              SYSPREE DIGITAL PTE LTD.
              <br />
              7 Temasek Boulevard, #12-07 Suntec Tower One, Singapore, 038987
            </p>
            <p className="mt-3 text-gray-700">UEN: 201931082K</p>
          </div>
          <div>
            <h3 className="font-bold text-brand-orange">India Office:</h3>
            <p className="mt-3 text-gray-700">
              +91 22 41275220,
              <br />
              +91 2246048068
            </p>
            <p className="mt-3 text-gray-700">
              SYSPREE DIGITAL PVT LTD.
              <br />
              1101-B, 11th Floor, Dev Corpora, 'A' wing,
              <br />
              Eastern Express Highway, Cadbury Junction,
              <br />
              Thane (W), Mumbai, Maharashtra 400601, India.
            </p>
            <p className="mt-3 text-gray-700">
              CIN: U72900MH2021FTC372638
              <br />
              GSTIN: 27ABHCS6321H1Z9
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-4xl border-t border-gray-200 pt-6">
          <h3 className="font-bold text-brand-orange">Email:</h3>
          <a href="mailto:contactus@syspree.com" className="mt-2 inline-block text-gray-700">
            contactus@syspree.com
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white px-6 py-12 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <img src="/logo.webp" alt="SySpree Digital" className="h-10 w-auto object-contain" />
            <h4 className="mt-6 text-sm font-bold text-gray-900">Socials</h4>
            <div className="mt-3 flex gap-2">
              {SOCIALS.map((s) => (
                <SocialIcon key={s.label} label={s.label} />
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase text-gray-900">Quicklinks</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target={link.internal ? undefined : '_blank'} rel="noreferrer" className="hover:text-brand-orange">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase text-gray-900">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              {SERVICE_LINKS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase text-gray-900">Payments</h4>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-gray-600">
              {PAYMENT_METHODS.map((label) => (
                <li key={label} className="rounded border border-gray-200 px-2 py-1">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-center text-xs text-gray-400">
          © {new Date().getFullYear()} SySpree Digital Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
