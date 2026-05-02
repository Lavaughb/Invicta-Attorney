import { useState, useRef } from 'react'
import { FaPhoneAlt, FaCheckCircle, FaExclamationTriangle, FaMapMarkerAlt } from 'react-icons/fa'
import {
  LuScale,
  LuBuilding2,
  LuShieldCheck,
} from 'react-icons/lu'

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const PHONE = '(407) 219-2580'
const PHONE_HREF = 'tel:4072192580'
const FORMSPREE_URL = 'https://formspree.io/f/mjgaowao' 

const LEGAL_DISCLAIMER = `By submitting my phone number above I authorize Rohan C. Palmer, Attorney at Law, and its service providers, to deliver calls including using an automatic telephone dialing system or artificial or prerecorded voice, to the number submitted. Consent is not a condition to receive services. Msg frequency varies. Msg & data rates may apply. Upon receipt of any message, reply STOP to unsubscribe. By submitting this form, you agree to our Terms & acknowledge our privacy policy. Results may vary depending on your particular facts and legal circumstances. ©2026 Rohan C. Palmer, Attorney at Law. All rights reserved.`
// ─────────────────────────────────────────────────────────────────────────────

const practiceAreas = [
  { Icon: LuScale, title: 'Personal Injury', desc: 'Dedicated representation after accidents, workplace injuries, and wrongful death — right here in your community.' },
  { Icon: LuBuilding2, title: 'Corporate Law', desc: 'Practical counsel for local businesses navigating regulations and everyday legal challenges.' },
  { Icon: LuShieldCheck, title: 'Criminal Defense', desc: 'Protecting your rights and freedom from arrest through trial — at every stage of the process.' },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      res.ok ? setStatus('success') : setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <FaCheckCircle className="text-gold text-5xl" />
        <h3 className="font-display text-2xl text-gold font-bold uppercase tracking-tighter">Submitted</h3>
        <p className="text-cream/60 font-body text-sm italic">We'll personally get back to you within 24 hours.</p>
        <button onClick={() => setStatus('idle')} className="text-gold/60 hover:text-gold text-[10px] uppercase tracking-widest font-semibold underline mt-4">Submit New Inquiry</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {!compact && (
        <h3 className="font-display text-4xl font-black text-cream uppercase tracking-tighter leading-none mb-2">Get in Touch</h3>
      )}

      <div className="flex items-start gap-3 bg-yellow-400/10 border border-yellow-400/40 px-4 py-3">
        <FaExclamationTriangle className="text-yellow-400 text-sm shrink-0 mt-0.5" />
        <p className="text-yellow-200 text-[11px] font-body font-medium leading-snug">
          Please do not submit confidential or sensitive information through this form.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-gold text-[9px] uppercase tracking-[0.2em] font-semibold ml-1">Full Name</label>
          <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-navy/50 border-b border-gold/20 text-cream font-body font-medium text-sm px-2 py-3 focus:outline-none focus:border-gold transition-all placeholder:text-cream/20" placeholder="Required" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-gold text-[9px] uppercase tracking-[0.2em] font-semibold ml-1">Phone Number</label>
          <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-navy/50 border-b border-gold/20 text-cream font-body font-medium text-sm px-2 py-3 focus:outline-none focus:border-gold transition-all placeholder:text-cream/20" placeholder="Required" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-gold text-[9px] uppercase tracking-[0.2em] font-semibold ml-1">Secure Email</label>
        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-navy/50 border-b border-gold/20 text-cream font-body font-medium text-sm px-2 py-3 focus:outline-none focus:border-gold transition-all placeholder:text-cream/20" placeholder="Required" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-gold text-[9px] uppercase tracking-[0.2em] font-semibold ml-1">Case Particulars</label>
        <textarea rows={compact ? 3 : 4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-navy/50 border-b border-gold/20 text-cream font-body font-medium text-sm px-2 py-3 focus:outline-none focus:border-gold transition-all resize-none placeholder:text-cream/20" placeholder="Briefly describe the matter..." />
      </div>

      {/* ─── LEGAL DISCLAIMER SECTION ─── */}
      <div className="bg-navy/80 p-5 border-l-2 border-gold shadow-inner">
        <p className="text-[10px] leading-relaxed text-cream/40 font-body font-medium">
          {LEGAL_DISCLAIMER}
        </p>
        <div className="flex gap-6 mt-4">
           <a href="/terms" className="text-[10px] text-gold/40 hover:text-gold uppercase font-semibold tracking-widest transition-colors underline decoration-gold/20 underline-offset-4">Terms of Service</a>
           <a href="/privacy" className="text-[10px] text-gold/40 hover:text-gold uppercase font-semibold tracking-widest transition-colors underline decoration-gold/20 underline-offset-4">Privacy Policy</a>
        </div>
      </div>

      <button type="submit" disabled={status === 'submitting'} className="w-full bg-gold text-navy font-display font-bold text-xs uppercase tracking-[0.3em] py-6 hover:bg-gold-light transition-all shadow-2xl disabled:opacity-50">
        {status === 'submitting' ? 'Transmitting...' : 'Submit Secure Inquiry'}
      </button>
    </form>
  )
}

export default function Home() {
  const contactRef = useRef<HTMLDivElement>(null)
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="grain overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center lg:py-32 py-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-full opacity-20" style={{ background: 'radial-gradient(circle at 70% 30%, var(--gold) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <div className="lg:col-span-7 flex flex-col pt-8">
              <p className="text-gold text-xs uppercase tracking-[0.5em] font-body font-semibold mb-8 animate-fade-in">
                Rohan C. Palmer, Attorney at Law
              </p>
              <h1 className="font-display text-6xl md:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter text-cream mb-8 uppercase">
                Your Voice.<br />
                <span className="text-gradient font-serif-bold italic lowercase tracking-normal inline-block pr-3 pb-2 leading-[1]">Your Corner.</span>
              </h1>
              <div className="section-divider w-24 h-1.5 bg-gold my-8" />
              <p className="text-cream/60 text-xl font-body leading-relaxed max-w-xl mb-12">
                With over 10 years of experience, we're here to serve this community — one neighbor, one family, one case at a time.
                <span className="text-gold block mt-4 font-semibold uppercase tracking-widest text-sm">Free consultation. Personally committed.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={PHONE_HREF} className="w-full sm:w-auto flex items-center justify-center gap-4 bg-gold text-navy font-display font-bold text-xs uppercase tracking-widest px-10 py-6 hover:bg-gold-light transition-all shadow-xl">
                  <FaPhoneAlt /> Call {PHONE}
                </a>
                <button onClick={scrollToContact} className="w-full sm:w-auto border-2 border-gold/40 text-gold font-display font-bold text-xs uppercase tracking-widest px-10 py-6 hover:bg-gold/10 transition-all">
                  Free Consultation
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block sticky top-32">
              <div className="bg-navy-light border-t-4 border-gold p-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA ─── */}
      <section className="py-24 lg:py-36 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.5em] font-semibold mb-4">Where We Serve</p>
              <h2 className="font-display text-5xl lg:text-7xl font-black text-cream leading-[0.85] uppercase tracking-tighter mb-6">
                Greater<br />
                <span className="text-gradient font-serif-bold italic lowercase tracking-normal inline-block pr-3 pb-2 leading-[1]">Orlando.</span>
              </h2>
              <div className="section-divider w-16 h-1 bg-gold my-8" />
              <p className="text-cream/60 font-body text-lg leading-relaxed mb-8">
                Proudly representing clients across Central Florida from downtown Orlando to Deltona and the surrounding communities. Local roots, personal service, real results.
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10">
                {['Orlando', 'Deltona', 'Sanford', 'Winter Park', 'Kissimmee', 'Daytona Beach', 'Altamonte Springs', 'Lake Mary'].map(city => (
                  <li key={city} className="flex items-center gap-3 text-cream/70 font-body text-sm">
                    <FaMapMarkerAlt className="text-gold text-xs shrink-0" /> {city}
                  </li>
                ))}
              </ul>
              <p className="text-cream/40 font-body text-xs uppercase tracking-[0.3em]">Orange · Volusia · Seminole · Osceola Counties</p>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-navy-light border-t-4 border-gold shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                <iframe
                  title="Greater Orlando service area map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-81.85%2C28.40%2C-81.10%2C29.10&amp;layer=mapnik&amp;marker=28.5421%2C-81.3790"
                  className="w-full h-full grayscale-[40%] contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gold text-navy font-display font-black text-xs uppercase tracking-[0.3em] px-6 py-4 shadow-xl hidden md:block">
                Central Florida
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRACTICE AREAS ─── */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="text-gold text-xs uppercase tracking-[0.4em] font-semibold mb-4">How We Can Help</p>
              <h2 className="font-display text-5xl lg:text-8xl font-black text-cream leading-[0.85] uppercase tracking-tighter">
                Practice<br/>Areas
              </h2>
              <div className="section-divider w-24 h-1.5 bg-gold my-10" />
              <p className="text-cream/50 text-xl font-body">We focus on the legal matters that affect everyday people and families in our community.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map(({ Icon, title, desc }) => (
              <div key={title} className="group border border-gold/10 p-10 bg-navy-light hover:bg-navy-accent transition-all duration-500 flex flex-col h-full border-t-4 hover:border-t-gold">
                <div className="w-20 h-20 mb-10 flex items-center justify-center bg-gold/10 border border-gold/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-gold/20 group-hover:border-gold/60">
                  <Icon className="text-gold text-4xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-cream mb-4 uppercase tracking-tighter leading-none">{title}</h3>
                <p className="text-cream/40 text-sm font-body leading-relaxed mb-12 flex-grow">{desc}</p>
                <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-semibold flex items-center gap-4">
                  Case Review <span className="w-8 h-px bg-gold/40 group-hover:w-16 transition-all duration-500" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <blockquote className="border-l-4 border-gold pl-10 space-y-8">
                <p className="font-display text-4xl lg:text-5xl italic text-cream leading-tight tracking-tighter">
                  "Equal justice under law is not merely a caption... It is the most inspiring ideal of our society."
                </p>
                <footer className="flex items-center gap-6">
                  <div className="w-16 h-px bg-gold" />
                  <div>
                    <p className="text-gold font-display font-bold text-sm tracking-widest uppercase">Lewis F. Powell Jr.</p>
                    <p className="text-cream/30 text-[10px] uppercase tracking-widest">U.S. Supreme Court Justice</p>
                  </div>
                </footer>
              </blockquote>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-gold text-xs uppercase tracking-[0.4em] font-semibold mb-6">Why Work With Us</p>
              <h2 className="font-display text-5xl lg:text-7xl font-black text-cream mb-8 leading-[0.85] uppercase tracking-tighter">
                Personal<br />Attention.
              </h2>
              <p className="text-cream/60 font-body text-xl leading-relaxed mb-12">
                When you call, you get us — not a call center. We treat every case with the care and dedication it deserves because your community is our community.
              </p>
              <ul className="space-y-6">
                {['Hands-on from day one', 'Direct attorney access', 'Rooted in the community'].map(text => (
                  <li key={text} className="flex items-center gap-4 text-cream font-display font-bold text-xs uppercase tracking-widest">
                    <FaCheckCircle className="text-gold" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOBILE CONTACT ─── */}
      <section ref={contactRef} className="py-24 lg:hidden border-t border-gold/10">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-navy-light border-t-4 border-gold p-8 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 lg:py-56 relative overflow-hidden text-center border-t border-gold/5">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="font-display text-6xl lg:text-[9rem] font-black text-cream mb-12 leading-[0.8] uppercase tracking-tighter">
            Your Rights.<br /><span className="text-gradient font-serif-bold italic lowercase tracking-normal inline-block pr-4 pb-3 leading-[1]">Our Priority.</span>
          </h2>
          <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-4 bg-gold text-navy font-display font-bold text-sm uppercase tracking-[0.3em] px-12 py-6 hover:bg-gold-light transition-all shadow-2xl">
            <FaPhoneAlt className="text-base" />
            <span>Call {PHONE}</span>
          </a>
        </div>
      </section>
    </div>
  )
}