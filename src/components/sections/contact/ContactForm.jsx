import { useState } from 'react'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import { SITE, CONTACT_PROJECT_TYPES } from '@/data/content'
import styles from './ContactForm.module.css'

const INITIAL = { firstName:'', lastName:'', email:'', phone:'', projectType:'', location:'', message:'' }

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()

    const subject = `Project inquiry: ${form.projectType || 'New project'}`

    const body = [
      `Name:         ${form.firstName} ${form.lastName}`,
      `Email:        ${form.email}`,
      form.phone    ? `Phone:        ${form.phone}`        : null,
      form.projectType ? `Project Type: ${form.projectType}` : null,
      form.location ? `Location:     ${form.location}`    : null,
      '',
      'Project Details:',
      form.message,
    ].filter(l => l !== null).join('\n')

    window.location.href =
      `mailto:${SITE.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    setSubmitted(true)
  }

  return (
    <>
      <div className={styles.hero}>
        <Eyebrow>Contact</Eyebrow>
        <h1 className={styles.title}>Hire <em>Ernest</em></h1>
        <p className={styles.sub}>
          Tell Ernest about your site and what you want to build. A finished
          brief is not needed; a rough idea is enough to start.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Left: contact info */}
        <aside className={styles.info}>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Location</span>
            <p className={styles.infoVal}>{SITE.location}</p>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Availability</span>
            <p className={styles.infoVal}>{SITE.availability}</p>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Email</span>
            <a href={`mailto:${SITE.email}`} className={styles.infoLink}>{SITE.email}</a>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Social</span>
            <div className={styles.socials}>
              {Object.entries(SITE.social).map(([platform, url]) => (
                <a key={platform} href={url} className={styles.social} target="_blank" rel="noopener noreferrer">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.responseBox}>
            <span className={styles.responseLabel}>Typical Response Time</span>
            <p className={styles.responseVal}>{SITE.responseTime}</p>
          </div>
        </aside>

        {/* Right: form */}
        {submitted ? (
          <div className={styles.success}>
            <h2 className={styles.successTitle}>Your email client has opened.</h2>
            <p className={styles.successBody}>Your inquiry is filled in and ready. Press send in your email app and Ernest will usually reply within 24 hours on weekdays.</p>
            <Button onClick={() => setSubmitted(false)} variant="ghost">Start a new inquiry</Button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="firstName" className={styles.label}>First Name</label>
                <input id="firstName" name="firstName" type="text" className={styles.input} placeholder="Kwame" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className={styles.group}>
                <label htmlFor="lastName" className={styles.label}>Last Name</label>
                <input id="lastName" name="lastName" type="text" className={styles.input} placeholder="Asante" value={form.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input id="email" name="email" type="email" className={styles.input} placeholder="kwame@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className={styles.group}>
                <label htmlFor="phone" className={styles.label}>Phone</label>
                <input id="phone" name="phone" type="tel" className={styles.input} placeholder="+233 XX XXX XXXX" value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <div className={styles.group}>
              <label htmlFor="projectType" className={styles.label}>Project Type</label>
              <select id="projectType" name="projectType" className={styles.input} value={form.projectType} onChange={handleChange} required>
                <option value="">Select a category</option>
                {CONTACT_PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.group}>
              <label htmlFor="location" className={styles.label}>Location / Site</label>
              <input id="location" name="location" type="text" className={styles.input} placeholder="Accra, Tema, etc." value={form.location} onChange={handleChange} />
            </div>
            <div className={styles.group}>
              <label htmlFor="message" className={styles.label}>Tell Ernest About Your Project</label>
              <textarea id="message" name="message" className={styles.textarea} placeholder="Describe your vision, scale, timeline, and any specific requirements..." value={form.message} onChange={handleChange} required rows={5} />
            </div>
            <Button fullWidth type="submit">Send Inquiry &rarr;</Button>
          </form>
        )}
      </div>
    </>
  )
}
