import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const PHONE = '(407) 219-2580'
const PHONE_HREF = 'tel:4072192580'
const EMAIL = 'invictadefense@gmail.com'
const FORMSPREE_URL = 'https://formspree.io/f/mjgaowao'

const LEGAL_DISCLAIMER = `By submitting my phone number above I authorize Invicta Attorney, PLLC, and its service providers, to deliver calls including using an automatic telephone dialing system or artificial or prerecorded voice, to the number submitted. Consent is not a condition to receive services. Msg frequency varies. Msg & data rates may apply. Upon receipt of any message, reply STOP to unsubscribe. By submitting this form, you agree to our Terms & acknowledge our privacy policy. Results may vary depending on your particular facts and legal circumstances. ©2026 Invicta Attorney, PLLC. All rights reserved.`
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="grain min-h-screen selection:bg-gold selection:text-navy">
      
      {/* ─── HEADER ─── */}
      <section className="pt-32 lg:pt-40 pb-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-black text-cream leading-[0.85] tracking-tighter normal-case">
            <span className="text-gradient font-serif-bold italic tracking-tight normal-case">Lets Talk</span>
          </h1>
        </div>
      </section>

      {/* ─── FORM SECTION ─── */}
      <section className="pb-24 lg:pb-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-4 space-y-10">
              <h2 className="font-display text-2xl lg:text-3xl font-black text-cream uppercase tracking-tighter">Speak Directly<br/>With Me</h2>
              <div className="space-y-6">
                <a href={PHONE_HREF} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold transition-all rounded-sm">
                    <FaPhoneAlt className="text-gold text-xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gold/70 text-[10px] uppercase tracking-[0.3em] font-semibold mb-1">Call</span>
                    <span className="text-cream font-body text-base group-hover:text-gold transition-colors">{PHONE}</span>
                  </div>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold transition-all rounded-sm">
                    <FaEnvelope className="text-gold text-xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gold/70 text-[10px] uppercase tracking-[0.3em] font-semibold mb-1">Email</span>
                    <span className="text-cream font-body text-base group-hover:text-gold transition-colors break-all">{EMAIL}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-navy-light border-t-4 border-gold p-8 lg:p-12 shadow-2xl">
                {status === 'success' ? (
                  <div className="text-center py-20 animate-fade-up">
                    <FaCheckCircle className="text-gold text-6xl mx-auto mb-6" />
                    <h3 className="font-display text-3xl text-gold font-black uppercase">Submitted</h3>
                    <p className="text-cream/60 mt-4">I'll personally get back to you within 24 hours.</p>
                    <button onClick={() => setStatus('idle')} className="mt-8 text-gold/40 text-xs uppercase tracking-widest underline">New Inquiry</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <h3 className="font-display text-4xl font-black text-cream uppercase tracking-tighter leading-none">Get in Touch</h3>

                    {status === 'error' && (
                      <div className="bg-red-900/20 border border-red-500/50 p-4 text-red-200 text-xs uppercase tracking-widest">
                        Something went wrong. Please call {PHONE} directly.
                      </div>
                    )}

                    <div className="flex items-start gap-3 bg-yellow-400/10 border border-yellow-400/40 px-4 py-3">
                      <FaExclamationTriangle className="text-yellow-400 text-sm shrink-0 mt-0.5" />
                      <p className="text-yellow-200 text-[11px] font-body font-medium leading-snug">
                        Please do not submit confidential or sensitive information through this form.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label className="text-gold/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Full Name</label>
                        <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full bg-navy/40 border-b border-gold/20 text-cream font-body text-base py-3 focus:outline-none focus:border-gold transition-all placeholder:text-cream/30" placeholder="Your full name" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-gold/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Phone</label>
                        <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                          className="w-full bg-navy/40 border-b border-gold/20 text-cream font-body text-base py-3 focus:outline-none focus:border-gold transition-all placeholder:text-cream/30" placeholder="(555) 123-4567" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-gold/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Secure Email</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-navy/40 border-b border-gold/20 text-cream font-body text-base py-3 focus:outline-none focus:border-gold transition-all placeholder:text-cream/30" placeholder="you@example.com" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-gold/70 text-[10px] uppercase tracking-[0.3em] font-semibold">Case Details</label>
                      <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full bg-navy/40 border-b border-gold/20 text-cream font-body text-sm py-3 focus:outline-none focus:border-gold transition-all resize-none placeholder:text-cream/30" placeholder="Briefly describe the matter..." />
                    </div>

                    <div className="bg-navy/80 p-5 border-l-2 border-gold shadow-inner text-[9px] text-cream/30 leading-relaxed">
                      {LEGAL_DISCLAIMER}
                    </div>

                    <button type="submit" disabled={status === 'submitting'}
                      className="w-full bg-gold text-navy font-display font-black text-xs uppercase tracking-[0.3em] py-6 hover:bg-gold-light transition-all disabled:opacity-50">
                      {status === 'submitting' ? 'Transmitting...' : 'Submit Secure Inquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}