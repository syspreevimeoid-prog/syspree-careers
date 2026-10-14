import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// In production, Vercel runs everything in /api as serverless functions. Plain
// `vite dev` doesn't, so this plugin mounts /api/apply on the dev server with the
// small res.status()/res.json() helpers Vercel's Node runtime provides.
function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/apply', async (req, res) => {
        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (body) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        }
        try {
          const {default: handler} = await server.ssrLoadModule('/api/apply.js')
          await handler(req, res)
        } catch (err) {
          server.config.logger.error(`[local-api] ${err.stack || err}`)
          if (!res.headersSent) res.status(500).json({error: 'Local API error - see terminal.'})
        }
      })
    },
  }
}

export default defineConfig(({mode}) => {
  // Expose server-only vars (SANITY_API_TOKEN, SMTP_*) from web/.env to the local API.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  // Fixed port: http://localhost:5190 is the origin allowed in Sanity's CORS settings
  // for project 4req6z9k. Other ports get blocked ("Request error while attempting to reach...").
  return {plugins: [react(), localApi()], server: {port: 5190, strictPort: true}}
})
