import {useState} from 'react'

const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const MAX_SIZE_BYTES = 5 * 1024 * 1024

export default function ApplyForm({jobId, jobTitle}) {
  const [values, setValues] = useState({name: '', email: '', phone: ''})
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  function handleFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return setFile(null)
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError('Please attach a PDF or Word document (.pdf, .doc, .docx).')
      e.target.value = ''
      setFile(null)
      return
    }
    if (f.size > MAX_SIZE_BYTES) {
      setError('Resume must be 5MB or smaller.')
      e.target.value = ''
      setFile(null)
      return
    }
    setError('')
    setFile(f)
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
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    formData.append('resume', file)

    try {
      const res = await fetch('/api/apply', {method: 'POST', body: formData})
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center text-green-800">
        Thanks, {values.name.split(' ')[0] || 'there'}! Your application for <strong>{jobTitle}</strong> has been received.
        We'll be in touch if there's a fit.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Apply For This Job</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Name*</label>
        <input
          required
          type="text"
          value={values.name}
          onChange={(e) => setValues({...values, name: e.target.value})}
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Email*</label>
        <input
          required
          type="email"
          value={values.email}
          onChange={(e) => setValues({...values, email: e.target.value})}
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Phone*</label>
        <input
          required
          type="tel"
          value={values.phone}
          onChange={(e) => setValues({...values, phone: e.target.value})}
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Attach Resume*</label>
        <input
          required
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  )
}
