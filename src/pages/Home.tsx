import { useState, useRef } from 'react'
import {
  FaBalanceScale,
  FaBuilding,
  FaFistRaised,
  FaHome,
  FaPhoneAlt,
  FaCheckCircle,
} from 'react-icons/fa'
import { MdSend } from 'react-icons/md'

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const PHONE = '(800) 555-0199'
const PHONE_HREF = 'tel:8005550199'
const FORMSPREE_URL = 'https://formspree.io/f/mjgaowao' 

const LEGAL_DISCLAIMER = `By submitting my phone number above I authorize Rohan C. Palmer, and its service providers, to deliver calls including using an automatic telephone dialing system or artificial or prerecorded voice, to the number submitted. Consent is not a condition to receive services. Msg frequency varies. Msg & data rates may apply. Upon receipt of any message, reply STOP to unsubscribe. By submitting this form, you agree to our Terms & acknowledge our privacy policy. Results may vary depending on your particular facts and legal circumstances. ©2026 Rohan C. Palmer, P.A. All rights reserved.`
// ─────────────────────────────────────────────────────────────────────────────

const stats = [
  { value: '$2.1B+', label: 'Recovered for Clients' },
  { value: '98%', label: 'Case Success Rate' },
  { value: '30+', label: 'Years of Experience' },
  { value: '15K+', label: 'Clients Served' },
]

const practiceAreas = [
  { Icon: FaBalanceScale, title: 'Personal Injury', desc: 'Aggressive representation after accidents, workplace injuries, and wrongful death.' },
  { Icon: FaBuilding, title: 'Corporate Law', desc: 'Strategic counsel for businesses navigating complex regulations and high-stakes disputes.' },
  { Icon: FaFistRaised, title: 'Civil Rights', desc: 'Unwavering defense of your constitutional rights and equal protection under the law.' },
  { Icon: FaHome, title: 'Real Estate', desc: 'Expert guidance for property transactions, disputes, and development matters.' },
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
        <p className="text-cream/60 font-body text-sm italic">An analyst will contact you within 24 hours.</p>
        <button onClick={() => setStatus('idle')} className="text-gold/60 hover:text-gold text-[10px] uppercase tracking-widest font-bold underline mt-4">Submit New Inquiry</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {!compact && (
        <div className="mb-2">
          <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-black mb-2">Priority Access</p>
          <h3 className="font-display text-4xl font-black text-cream uppercase tracking-tighter leading-none">Secure Case Submission</h3>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-gold text-[9px] uppercase tracking-[0.2em] font-black ml-1">Full Name</label>
          <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-navy/50 border-b border-gold/20 text-cream font-display font-black text-lg px-2 py-3 focus:outline-none focus:border-gold transition-all uppercase placeholder:text-cream/5" placeholder="Required" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-gold text-[9px] uppercase tracking-[0.2em] font-black ml-1">Phone Number</label>
          <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-navy/50 border-b border-gold/20 text-cream font-display font-black text-lg px-2 py-3 focus:outline-none focus:border-gold transition-all uppercase placeholder:text-cream/5" placeholder="Required" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-gold text-[9px] uppercase tracking-[0.2em] font-black ml-1">Secure Email</label>
        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-navy/50 border-b border-gold/20 text-cream font-display font-black text-lg px-2 py-3 focus:outline-none focus:border-gold transition-all uppercase placeholder:text-cream/5" placeholder="Required" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-gold text-[9px] uppercase tracking-[0.2em] font-black ml-1">Case Particulars</label>
        <textarea rows={compact ? 3 : 4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-navy/50 border-b border-gold/20 text-cream font-body font-medium text-sm px-2 py-3 focus:outline-none focus:border-gold transition-all resize-none uppercase placeholder:text-cream/5" placeholder="Briefly describe the matter..." />
      </div>

      {/* ─── LEGAL DISCLAIMER SECTION ─── */}
      <div className="bg-navy/80 p-5 border-l-2 border-gold shadow-inner">
        <p className="text-[10px] leading-relaxed text-cream/40 font-body font-medium">
          {LEGAL_DISCLAIMER}
        </p>
        <div className="flex gap-6 mt-4">
           <a href="/terms" className="text-[10px] text-gold/40 hover:text-gold uppercase font-black tracking-widest transition-colors underline decoration-gold/20 underline-offset-4">Terms of Service</a>
           <a href="/privacy" className="text-[10px] text-gold/40 hover:text-gold uppercase font-black tracking-widest transition-colors underline decoration-gold/20 underline-offset-4">Privacy Policy</a>
        </div>
      </div>

      <button type="submit" disabled={status === 'submitting'} className="w-full bg-gold text-navy font-display font-black text-xs uppercase tracking-[0.3em] py-6 hover:bg-gold-light transition-all shadow-2xl disabled:opacity-50">
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
        <div className="absolute inset-0 z-0 bg-navy">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy-accent opacity-90" />
          <div className="absolute top-0 right-0 w-2/3 h-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, var(--gold) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <div className="lg:col-span-7 flex flex-col pt-8">
              <p className="text-gold text-xs uppercase tracking-[0.5em] font-body font-black mb-8 animate-fade-in">
                Rohan C. Palmer, Attorney at Law
              </p>
              <h1 className="font-display text-6xl md:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter text-cream mb-8 uppercase">   
                I Fight.<br />
                <span className="text-gradient font-serif-bold italic lowercase tracking-tight">You Win.</span>
              </h1>
              <div className="section-divider w-24 h-1.5 bg-gold my-8" />
              <p className="text-cream/60 text-xl font-body leading-relaxed max-w-xl mb-12">
                For over 30 years, we've stood with the people who need it most — delivering multi-billion dollar results that change lives. 
                <span className="text-gold block mt-4 font-black uppercase tracking-widest text-sm">No fees unless we win. Available 24/7.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={PHONE_HREF} className="w-full sm:w-auto flex items-center justify-center gap-4 bg-gold text-navy font-display font-black text-xs uppercase tracking-widest px-10 py-6 hover:bg-gold-light transition-all shadow-xl">
                  <FaPhoneAlt /> Call {PHONE}
                </a>
                <button onClick={scrollToContact} className="w-full sm:w-auto border-2 border-gold/40 text-gold font-display font-black text-xs uppercase tracking-widest px-10 py-6 hover:bg-gold/10 transition-all">
                  Secure Consultation
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

      {/* ─── STATS ─── */}
      <section className="bg-gold py-16 lg:py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center group">
                <p className="font-display text-navy text-5xl lg:text-7xl font-black mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-500">{value}</p>
                <div className="w-8 h-0.5 bg-navy/20 mx-auto mb-3" />
                <p className="font-body text-navy/70 text-[10px] lg:text-xs uppercase tracking-[0.3em] font-black">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRACTICE AREAS ─── */}
      <section className="py-24 lg:py-40 bg-navy-mid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="text-gold text-xs uppercase tracking-[0.4em] font-black mb-4">Elite Expertise</p>
              <h2 className="font-display text-5xl lg:text-8xl font-black text-cream leading-[0.85] uppercase tracking-tighter">
                Elite<br/>Practice Areas
              </h2>              
              <div className="section-divider w-24 h-1.5 bg-gold my-10" />
              <p className="text-cream/50 text-xl font-body">We specialize in high-stakes litigation where the opposition is powerful and the stakes are life-altering.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map(({ Icon, title, desc }) => (
              <div key={title} className="group border border-gold/10 p-10 bg-navy-light hover:bg-navy-accent transition-all duration-500 flex flex-col h-full border-t-4 hover:border-t-gold">
                <Icon className="text-gold text-4xl mb-10 transition-transform duration-500 group-hover:-translate-y-2" />
                <h3 className="font-display text-2xl font-black text-cream mb-4 uppercase tracking-tighter leading-none">{title}</h3>
                <p className="text-cream/40 text-sm font-body leading-relaxed mb-12 flex-grow">{desc}</p>
                <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-4">
                  Case Review <span className="w-8 h-px bg-gold/40 group-hover:w-16 transition-all duration-500" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-24 lg:py-40 bg-navy">
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
                    <p className="text-gold font-display font-black text-sm tracking-widest uppercase">Lewis F. Powell Jr.</p>
                    <p className="text-cream/30 text-[10px] uppercase tracking-widest">U.S. Supreme Court Justice</p>
                  </div>
                </footer>
              </blockquote>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-gold text-xs uppercase tracking-[0.4em] font-black mb-6">The Advantage</p>
              <h2 className="font-display text-5xl lg:text-7xl font-black text-cream mb-8 leading-[0.85] uppercase tracking-tighter">
                Relentless<br />Strategy.
              </h2>
              <p className="text-cream/60 font-body text-xl leading-relaxed mb-12">
                We don't just process cases; we win battles. Every client gets a custom-engineered legal strategy backed by three decades of dominance.
              </p>
              <ul className="space-y-6">
                {['Trial-ready from day one', 'Custom jury analytics', 'Elite medical network'].map(text => (
                  <li key={text} className="flex items-center gap-4 text-cream font-display font-black text-xs uppercase tracking-widest">
                    <FaCheckCircle className="text-gold" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOBILE CONTACT ─── */}
      <section ref={contactRef} className="py-24 bg-navy-mid lg:hidden border-t border-gold/10">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-navy-light border-t-4 border-gold p-8 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 lg:py-56 bg-navy relative overflow-hidden text-center border-t border-gold/5">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="font-display text-6xl lg:text-[9rem] font-black text-cream mb-12 leading-[0.8] uppercase tracking-tighter">
            Your Rights.<br /><span className="text-gradient font-serif-bold italic lowercase tracking-tight">Our Priority.</span>
          </h2>
          <a href={PHONE_HREF} className="inline-flex items-center gap-8 bg-gold text-navy font-display font-black text-sm uppercase tracking-[0.4em] px-16 py-8 hover:bg-gold-light transition-all shadow-2xl group">
             Call {PHONE} <span className="w-12 h-px bg-navy/30 group-hover:w-24 transition-all duration-500" />
          </a>
        </div>
      </section>
    </div>
  )
}