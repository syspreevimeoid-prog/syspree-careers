import {useRef, useState} from 'react'

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_SIZE_BYTES = 5 * 1024 * 1024

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-black placeholder:text-gray-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20'

function Field({label, children}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[15px] text-black">
        {label} <span className="text-brand-deep">*</span>
      </span>
      {children}
    </label>
  )
}

function formatSize(bytes) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function ApplyForm({jobId, jobTitle}) {
  const [values, setValues] = useState({name: '', email: '', phone: ''})
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [error, setError] = useState('')
  const fileInput = useRef(null)

  function pickFile(f) {
    if (!f) return
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError('Please attach a PDF or Word document (.pdf, .doc, .docx).')
      return
    }
    if (f.size > MAX_SIZE_BYTES) {
      setError('Resume must be 5 MB or smaller.')
      return
    }
    setError('')
    setFile(f)
  }

  function clearFile() {
    setFile(null)
    if (fileInput.current) fileInput.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) {
      setError('Please attach your resume.')
      return
    }
    setStatus('submitting')
    setError('')

    const formData = new FormData()
    formData.append('jobId', jobId)
    formData.append('jobTitle', jobTitle)
    formData.append('name', values.name.trim())
    formData.append('email', values.email.trim())
    formData.append('phone', values.phone.trim())
    formData.append('resume', file)

    try {
      const res = await fetch('/api/apply', {method: 'POST', body: formData})
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(
          body.error ||
            (res.status === 404
              ? "We couldn't reach the application service. Please email your resume to hr@syspree.com."
              : 'Something went wrong. Please try again.'),
        )
      }
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      setError(
        err instanceof TypeError
          ? 'Network error - please check your connection and try again.'
          : err.message || 'Something went wrong. Please try again.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="#16a34a" strokeWidth="2.4" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-medium text-black">Application received!</h3>
        <p className="mx-auto mt-2 max-w-md">
          Thanks, {values.name.trim().split(' ')[0] || 'there'}. Your application for <strong className="text-black">{jobTitle}</strong>{' '}
          has been sent to our HR team. We'll be in touch if there's a fit.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <h3 className="text-2xl font-medium text-black">Apply For This Job</h3>
      <p className="mt-1 text-base">
        Applying for <span className="text-brand-deep">{jobTitle}</span>
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full Name">
            <input
              required
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.name}
              onChange={(e) => setValues({...values, name: e.target.value})}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Email">
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setValues({...values, email: e.target.value})}
            className={inputClass}
          />
        </Field>
        <Field label="Phone">
          <input
            required
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(e) => setValues({...values, phone: e.target.value})}
            className={inputClass}
          />
        </Field>

        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-[15px] text-black">
            Resume <span className="text-brand-deep">*</span>
          </span>
          {file ? (
            <div className="flex items-center gap-4 rounded-lg border border-gray-300 bg-[#FAFAFA] px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#FFF1E6] text-xs font-bold uppercase text-brand-deep">
                {file.name.split('.').pop()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base text-black">{file.name}</p>
                <p className="text-sm text-brand-muted">{formatSize(file.size)}</p>
              </div>
              <button type="button" onClick={clearFile} className="text-sm text-brand-muted underline hover:text-brand-deep">
                Remove
              </button>
            </div>
          ) : (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                pickFile(e.dataTransfer.files?.[0])
              }}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-[#FAFAFA] px-4 py-8 text-center transition hover:border-brand-orange hover:bg-[#FFF8F1]"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-deep" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="mt-2 text-base text-black">
                <span className="text-brand-deep underline underline-offset-2">Choose a file</span> or drag it here
              </span>
              <span className="mt-1 text-sm text-brand-muted">PDF, DOC or DOCX · up to 5 MB</span>
              <input
                ref={fileInput}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => pickFile(e.target.files?.[0])}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 w-full rounded-full bg-brand-orange px-6 py-4 text-base font-medium text-white transition hover:bg-brand-deep disabled:cursor-wait disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </button>
      <p className="mt-3 text-center text-sm text-brand-muted">Your details are only shared with SySpree's HR team.</p>
    </form>
  )
}
