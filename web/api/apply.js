import Busboy from 'busboy'
import {createClient} from '@sanity/client'

// Server-side only — SANITY_API_TOKEN must never be exposed to the browser.
// Configured as a Vercel serverless function (this file lives under /api).
export const config = {
  api: {
    bodyParser: false, // we stream-parse multipart/form-data ourselves via busboy
  },
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024
const ACCEPTED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({headers: req.headers, limits: {fileSize: MAX_SIZE_BYTES}})
    const fields = {}
    let file = null
    let fileTooLarge = false

    busboy.on('field', (name, value) => {
      fields[name] = value
    })

    busboy.on('file', (name, stream, info) => {
      const chunks = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('limit', () => {
        fileTooLarge = true
      })
      stream.on('end', () => {
        if (!fileTooLarge) {
          file = {buffer: Buffer.concat(chunks), filename: info.filename, mimeType: info.mimeType}
        }
      })
    })

    busboy.on('error', reject)
    busboy.on('finish', () => {
      if (fileTooLarge) return reject(new Error('Resume must be 5MB or smaller.'))
      resolve({fields, file})
    })

    req.pipe(busboy)
  })
}

function getSanityClient() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
  const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN
  if (!projectId || !token) {
    throw new Error('Server is not configured (missing Sanity project id or token).')
  }
  return createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})
}

async function maybeSendNotification({name, email, phone, jobTitle}) {
  const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, HR_NOTIFY_EMAIL} = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !HR_NOTIFY_EMAIL) return // email is optional — skip silently

  const nodemailer = await import('nodemailer')
  const transporter = nodemailer.default.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    auth: {user: SMTP_USER, pass: SMTP_PASS},
  })

  await transporter.sendMail({
    from: SMTP_USER,
    to: HR_NOTIFY_EMAIL,
    subject: `New application: ${jobTitle}`,
    text: `${name} (${email}, ${phone}) applied for ${jobTitle}. Review it in Sanity Studio.`,
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({error: 'Method not allowed'})
  }

  try {
    const {fields, file} = await parseMultipart(req)
    const {jobId, jobTitle, name, email, phone} = fields

    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({error: 'Missing required fields.'})
    }
    if (!file) {
      return res.status(400).json({error: 'Resume file is required.'})
    }
    if (!ACCEPTED_MIME.has(file.mimeType)) {
      return res.status(400).json({error: 'Resume must be a PDF or Word document.'})
    }

    const client = getSanityClient()
    const asset = await client.assets.upload('file', file.buffer, {filename: file.filename})

    await client.create({
      _type: 'jobApplication',
      job: {_type: 'reference', _ref: jobId},
      name,
      email,
      phone,
      resume: {_type: 'file', asset: {_type: 'reference', _ref: asset._id}},
      submittedAt: new Date().toISOString(),
      status: 'New',
    })

    await maybeSendNotification({name, email, phone, jobTitle: jobTitle || 'a role'}).catch((err) => {
      // Notification failure shouldn't fail the application submission itself.
      console.error('Email notification failed:', err)
    })

    return res.status(200).json({ok: true})
  } catch (err) {
    console.error('Apply submission failed:', err)
    return res.status(500).json({error: err.message || 'Something went wrong. Please try again.'})
  }
}
