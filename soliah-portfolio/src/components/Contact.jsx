import { useState } from 'react'
import Section from './Section'
import { profile, FORMSPREE_ID } from '../data'

const fieldClass =
  'mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/20'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    // No Formspree ID yet: open the visitor's email app with the message filled in
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section
      id="contact"
      title="Let's work together"
      intro="Tell me about your project, role or idea. I usually reply within a day or two."
    >
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Your name
              <input name="name" required value={form.name} onChange={handleChange} className={fieldClass} placeholder="Ada Obi" />
            </label>
            <label className="block text-sm font-medium">
              Your email
              <input type="email" name="email" required value={form.email} onChange={handleChange} className={fieldClass} placeholder="ada@company.com" />
            </label>
          </div>
          <label className="block text-sm font-medium">
            Message
            <textarea name="message" required rows="6" value={form.message} onChange={handleChange} className={fieldClass} placeholder="What are you looking to build?" />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-pine px-7 py-3 font-medium text-white transition-colors hover:bg-pine-dark disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending message…' : 'Send message'}
          </button>

          <p aria-live="polite" className="text-[15px]">
            {status === 'sent' && <span className="text-pine">Message sent. I'll get back to you soon.</span>}
            {status === 'error' && (
              <span className="text-red-700">
                The message didn't go through. Try again, or email me directly at {profile.email}.
              </span>
            )}
          </p>
        </form>

        <div className="space-y-6">
          <div>
            <h3 className="font-display text-lg font-bold">Email</h3>
            <a href={`mailto:${profile.email}`} className="mt-1 inline-block break-all text-pine underline decoration-pine/30 underline-offset-4 hover:decoration-pine">
              {profile.email}
            </a>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">Elsewhere</h3>
            <ul className="mt-1 space-y-1">
              <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-ink">LinkedIn</a></li>
              <li><a href={profile.github} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-ink">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">CV</h3>
            <a href={profile.resume} download className="mt-1 inline-block underline decoration-line underline-offset-4 hover:decoration-ink">
              Download my CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact
