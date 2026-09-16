# SySpree Careers — React + Sanity

A rebuild of careers.syspree.com: a job-board frontend (React + Vite + Tailwind, deployed
on Vercel) backed by a Sanity Studio so HR can add/edit job postings and review
applications without touching code.

```
studio/   Sanity Studio — content editing UI (job postings, taxonomy, applications)
web/      Public site (React) + /api/apply.js serverless function
```

## 1. Set up Sanity (content backend)

```bash
cd studio
npm install
npx sanity login          # opens a browser to log in / create a free Sanity account
npx sanity init            # choose "Create new project", any name, dataset "production"
                            # when it asks about a config file, say no (one is already here)
```

`sanity init` prints your **Project ID**. Create `studio/.env` from `studio/.env.example` and fill in:

```
SANITY_STUDIO_PROJECT_ID=<the project id>
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=          # see step 2
```

Also create an API token for server-side writes (used by the seed script and by
`web/api/apply.js`): go to https://www.sanity.io/manage → your project → **API** → **Tokens**
→ **Add API token** → permissions **Editor** → copy it into `SANITY_API_TOKEN` above
(and later into Vercel's env vars — see step 4).

Run the Studio locally to check the schema:

```bash
npm run dev
# opens http://localhost:3333 — you should see Job Postings, Applications,
# Categories, Job Types, Locations, and Site Settings in the sidebar
```

Optionally seed a couple of sample categories/locations/job postings so the site
isn't empty:

```bash
npm run seed
```

When ready to give HR a real login, deploy the Studio to its own hosted URL:

```bash
npm run deploy   # choose a studio hostname, e.g. syspree-careers -> syspree-careers.sanity.studio
```

## 2. Run the website locally

```bash
cd web
npm install
copy .env.example .env      # (PowerShell: Copy-Item .env.example .env)
```

Fill in `web/.env`:

```
VITE_SANITY_PROJECT_ID=<same project id as above>
VITE_SANITY_DATASET=production
SANITY_API_TOKEN=<the Editor token from step 1>
```

The apply form's file upload needs the serverless function running, which plain
`vite dev` does not serve. Use the Vercel CLI instead:

```bash
npm install -g vercel   # one-time
vercel dev
```

This serves the React app **and** `/api/apply` together, reading env vars from
`web/.env`. Open the printed local URL — you should see the jobs listing, filters,
job detail pages, and a working apply form (try a small test PDF).

If you just want to look at the UI without testing the apply flow, `npm run dev`
(plain Vite) is faster, but submitting the form will fail with a 404 since there's
no server for `/api/apply`.

## 3. Deploy the website to Vercel

```bash
cd web
vercel        # first time: link/create a project
vercel --prod
```

In the Vercel dashboard → your project → **Settings → Environment Variables**, add:

| Name | Value | Notes |
|---|---|---|
| `VITE_SANITY_PROJECT_ID` | your project id | public |
| `VITE_SANITY_DATASET` | `production` | public |
| `SANITY_API_TOKEN` | the Editor token | **secret** — server-side only |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `HR_NOTIFY_EMAIL` | *(optional)* | enables an email to HR on every new application; leave blank to skip — applications are always saved in Sanity regardless |

Redeploy after adding env vars (`vercel --prod`) so the function picks them up.

## 4. Day-to-day content editing (for HR)

- Add a job: Studio → **Job Postings** → **+ Create** → fill in the fields, set
  **Active** to true, publish. It appears on the site immediately (Sanity's CDN
  caches for ~a minute).
- Close a job: open it in the Studio and toggle **Active** off, or delete it.
- Add a new category/job type/location: create it under those lists in the Studio
  — it will automatically show up as a filter option on the site.
- Review applications: Studio → **Applications**, sorted newest first, with the
  resume file attached to each entry.

## Notes / follow-ups

- Email notifications to HR are optional and env-gated (see table above) —
  without SMTP configured, new applications are still saved and visible in the
  Studio, just without an email ping.
- `/contact-us` on the site is a simple static page; it isn't modeled in Sanity.
- The seed script's job postings are original placeholder content, not the real
  live postings — replace them with actual roles once you're set up.
