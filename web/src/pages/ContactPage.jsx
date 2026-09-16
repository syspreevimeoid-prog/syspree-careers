export default function ContactPage({settings}) {
  const hrEmail = settings?.hrEmail || 'hr@syspree.com'
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center md:px-0">
      <h1 className="text-3xl font-bold text-gray-900">Get in Touch</h1>
      <p className="mt-4 text-gray-600">
        Have a question about a role, or want to send us your resume for a future opening? Reach out any time.
      </p>
      <a href={`mailto:${hrEmail}`} className="mt-6 inline-block text-lg font-semibold text-brand-orange">
        {hrEmail}
      </a>
      <div className="mt-10">
        <a
          href={settings?.contactUrl || 'https://syspree.com/contact-us/'}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Visit syspree.com
        </a>
      </div>
    </main>
  )
}
