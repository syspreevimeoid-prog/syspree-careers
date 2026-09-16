import {useEffect, useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import {sanityClient} from './lib/sanity.js'
import {SITE_SETTINGS_QUERY} from './lib/queries.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import JobsPage from './pages/JobsPage.jsx'
import JobDetailPage from './pages/JobDetailPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

export default function App() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    sanityClient.fetch(SITE_SETTINGS_QUERY).then(setSettings).catch(() => setSettings({}))
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header contactUrl={settings?.contactUrl} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<JobsPage settings={settings} />} />
          <Route path="/jobs/:slug" element={<JobDetailPage />} />
          <Route path="/contact-us" element={<ContactPage settings={settings} />} />
        </Routes>
      </div>
      <Footer hrEmail={settings?.hrEmail} />
      <WhatsAppButton whatsappNumber={settings?.whatsappNumber} />
    </div>
  )
}
