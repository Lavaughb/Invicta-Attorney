import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaCheckCircle } from 'react-icons/fa'
import { MdSend } from 'react-icons/md'

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const PHONE = '(800) 555-0199'
const PHONE_HREF = 'tel:8005550199'
const EMAIL = 'info@jamesblackwood.com'
const FORMSPREE_URL = 'https://formspree.io/f/mjgaowao' // <--- REPLACE THIS

const LEGAL_DISCLAIMER = `By submitting my phone number above I authorize James & Blackwood, and its service providers, to deliver calls including using an automatic telephone dialing system or artificial or prerecorded voice...`
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
    <div className="grain min-h-screen bg-navy selection:bg-gold selection:text-navy">
      
      {/* ─── HEADER ─── */}
      <section className="pt-32 lg:pt-40 pb-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center lg:text-left">
          <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-black mb-4">Priority Legal Access</p>
          <h1 className="font-display text-5xl lg:text-7xl font-black text-cream leading-[0.85] tracking-tighter uppercase">
            Start Your <span className="text-gradient font-serif-bold italic lowercase tracking-tight">Recovery.</span>
          </h1>
        </div>
      </section>

      {/* ─── FORM SECTION ─── */}
      <section className="pb-24 lg:pb-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-4 space-y-10">
              <h2 className="font-display text-2xl lg:text-3xl font-black text-cream uppercase tracking-tighter">Connect with<br/>a Partner</h2>
              <div className="space-y-6">
                <a href={PHONE_HREF} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all">
                    <FaPhoneAlt className="text-gold" />
                  </div>
                  <span className="text-cream font-display font-black uppercase tracking-tight">{PHONE}</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all">
                    <FaEnvelope className="text-gold" />
                  </div>
                  <span className="text-cream font-display font-black uppercase tracking-tight">{EMAIL}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-navy-light border-t-4 border-gold p-8 lg:p-12 shadow-2xl">
                {status === 'success' ? (
                  <div className="text-center py-20 animate-fade-up">
                    <FaCheckCircle className="text-gold text-6xl mx-auto mb-6" />
                    <h3 className="font-display text-3xl text-gold font-black uppercase">Submitted</h3>
                    <p className="text-cream/60 mt-4">An analyst has been notified. Stand by for contact.</p>
                    <button onClick={() => setStatus('idle')} className="mt-8 text-gold/40 text-xs uppercase tracking-widest underline">New Inquiry</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {status === 'error' && (
                      <div className="bg-red-900/20 border border-red-500/50 p-4 text-red-200 text-xs uppercase tracking-widest">
                        Transmission Error. Please call {PHONE} directly.
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label className="text-cream/40 text-[9px] uppercase tracking-[0.2em] font-black">Full Name</label>
                        <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full bg-navy/40 border-b border-gold/20 text-cream font-display font-black text-lg py-3 focus:outline-none focus:border-gold transition-all uppercase placeholder:text-cream/5" placeholder="REQUIRED" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-cream/40 text-[9px] uppercase tracking-[0.2em] font-black">Phone</label>
                        <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                          className="w-full bg-navy/40 border-b border-gold/20 text-cream font-display font-black text-lg py-3 focus:outline-none focus:border-gold transition-all uppercase placeholder:text-cream/5" placeholder="REQUIRED" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-cream/40 text-[9px] uppercase tracking-[0.2em] font-black">Secure Email</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-navy/40 border-b border-gold/20 text-cream font-display font-black text-lg py-3 focus:outline-none focus:border-gold transition-all uppercase placeholder:text-cream/5" placeholder="REQUIRED" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-cream/40 text-[9px] uppercase tracking-[0.2em] font-black">Case Details</label>
                      <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full bg-navy/40 border-b border-gold/20 text-cream font-body text-sm py-3 focus:outline-none focus:border-gold transition-all resize-none uppercase placeholder:text-cream/5" placeholder="DESCRIBE THE MATTER..." />
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