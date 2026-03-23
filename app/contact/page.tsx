'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import { PERSON } from '@/lib/data'
import BackBar from '@/components/ui/BackBar'

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 8 10-8"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
)

const LINKS = [
  { Icon: EmailIcon,    label: 'Email',    value: 'joshidarshan193@gmail.com', href: `mailto:${PERSON.email}` },
  { Icon: LinkedInIcon, label: 'LinkedIn', value: 'linkedin.com/in/darshanjoshi05', href: PERSON.linkedin },
  { Icon: GithubIcon,   label: 'GitHub',   value: 'github.com/darshanjoshi05', href: PERSON.github },
  { Icon: LocationIcon, label: 'Location', value: 'Southfield, MI, USA', href: '#' },
]

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrMsg('')

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrMsg(data.error || 'Something went wrong. Please try again.')
        return
      }
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
      setErrMsg('Network error. Please email directly at joshidarshan193@gmail.com')
    }
  }

  const inputBase = `w-full bg-surface border border-white/[0.08] px-4 py-3 text-[0.82rem] font-mono outline-none focus:border-accent/50 focus:bg-accent/[0.02] transition-all placeholder:text-muted/40`

  return (
    <>
      <ProgressBar />
      <Nav />
      <BackBar label="Back to Home" href="/" section="Contact Darshan" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 md:px-16 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10 sm:mb-16">
          <h1 className="sr-only">Contact Darshan Joshi</h1>
          <div className="text-[0.62rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-accent mb-4 flex items-center gap-3">
            <span className="w-6 sm:w-8 h-px bg-accent" /> 05 — Let's Connect
          </div>
          <h1 className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-[-0.03em] mb-4 leading-tight">
            Let's build something
            <span className="gradient-text"> remarkable.</span>
          </h1>
          <p className="text-[0.8rem] sm:text-[0.85rem] leading-[1.85] text-muted max-w-xl">
            Actively looking for AI Engineer / ML Engineer roles. Open to full-time, contract, or research positions. Guaranteed response within 24 hours. Currently available for new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">

          {/* Form */}
          <FadeUp className="lg:col-span-3 order-2 lg:order-1" delay={0.1}>
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="border border-[#34d399]/30 bg-[#34d399]/5 p-8 sm:p-12 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-serif text-2xl font-bold text-[#34d399] mb-3">Message Sent!</h3>
                <p className="text-[0.8rem] sm:text-[0.82rem] text-muted leading-[1.8] mb-6">
                  Your message has been delivered to{' '}
                  <span className="text-accent">joshidarshan193@gmail.com</span>.
                  You should also receive a confirmation email. I'll reply within 24 hours.
                </p>
                <button onClick={() => setStatus('idle')}
                  className="text-[0.7rem] sm:text-[0.72rem] tracking-[0.12em] uppercase border border-white/[0.1] text-muted px-6 py-2.5 hover:border-accent/40 hover:text-accent transition-all font-mono">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-2">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input type="text" placeholder="John Smith" required
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputBase} />
                  </div>
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-2">
                      Your Email <span className="text-accent">*</span>
                    </label>
                    <input type="email" placeholder="john@company.com" required
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputBase} />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-2">Subject</label>
                  <input type="text" placeholder="Job Opportunity / Collaboration / Just Saying Hi"
                    value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className={inputBase} />
                </div>

                <div>
                  <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-2">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea placeholder="Tell me about your project, opportunity, or just introduce yourself..."
                    rows={7} required
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`${inputBase} resize-none`} />
                </div>

                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="border border-[#f87171]/30 bg-[#f87171]/5 px-4 py-3 text-[0.75rem] text-[#f87171] leading-[1.6]">
                    ⚠ {errMsg}
                  </motion.div>
                )}

                <button type="submit" disabled={status === 'sending'}
                  className={`w-full clip-btn font-sans font-bold text-[0.76rem] sm:text-[0.78rem] tracking-[0.1em] uppercase py-4 transition-all ${status === 'sending' ? 'bg-accent/60 text-black/60 cursor-not-allowed' : 'bg-accent text-black hover:shadow-[0_8px_40px_rgba(0,212,255,0.45)] hover:-translate-y-px active:translate-y-0'}`}>
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin inline-block" />
                      Sending…
                    </span>
                  ) : 'Send Message →'}
                </button>

                <p className="text-[0.6rem] text-muted/50 text-center leading-[1.7]">
                  Sent directly to{' '}
                  <a href={`mailto:${PERSON.email}`} className="text-accent/70 hover:text-accent transition-colors">
                    {PERSON.email}
                  </a>{' '}
                  — no bots, no CRMs, just me.
                </p>
              </form>
            )}
          </FadeUp>

          {/* Links */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-3">
            <FadeUp delay={0.15}>
              <h3 className="text-[0.65rem] tracking-[0.18em] uppercase text-muted mb-4">Direct Channels</h3>
            </FadeUp>

            {LINKS.map((l, i) => (
              <FadeUp key={l.label} delay={0.2 + i * 0.07}>
                <a href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 sm:gap-4 border border-white/[0.06] bg-surface p-4 hover:border-accent/30 hover:-translate-y-px transition-all group">
                  <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-accent/30 group-hover:text-accent text-muted transition-colors">
                    <l.Icon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.58rem] tracking-[0.14em] uppercase text-muted mb-0.5">{l.label}</div>
                    <div className="text-[0.74rem] font-mono truncate group-hover:text-accent transition-colors">
                      {l.value}
                    </div>
                  </div>
                  {l.href !== '#' && (
                    <svg className="w-3.5 h-3.5 text-muted/30 group-hover:text-accent transition-colors shrink-0"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  )}
                </a>
              </FadeUp>
            ))}

            <FadeUp delay={0.5}>
              <div className="border border-accent/20 bg-accent/5 p-4 sm:p-5 mt-2">
                <div className="flex items-center gap-2 text-[0.62rem] tracking-[0.14em] uppercase text-accent mb-2">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  Available for Hire
                </div>
                <p className="text-[0.74rem] leading-[1.7] text-muted">
                  Actively looking for AI / ML Engineering roles. Full-time, contract, or research. Based in Southfield, MI — open to remote.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.62}>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Projects', href: '/projects' },
                  { label: 'Research', href: '/publications' },
                  { label: 'Education', href: '/education' },
                  { label: 'GitHub', href: PERSON.github },
                ].map(l => (
                  <a key={l.label} href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[0.62rem] tracking-[0.1em] uppercase text-muted border border-white/[0.06] px-3 py-2.5 text-center hover:border-accent/30 hover:text-accent transition-all">
                    {l.label}
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
