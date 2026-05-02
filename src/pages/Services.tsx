import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FaPhoneAlt } from 'react-icons/fa'
import {
  LuScale,
  LuBuilding2,
  LuShieldCheck,
  LuCircleCheck,
} from 'react-icons/lu'

const PHONE = '(407) 219-2580'
const PHONE_HREF = 'tel:4072192580'

const services = [
  {
    id: 'personal-injury',
    Icon: LuScale,
    title: 'Personal Injury',
    tagline: 'In your corner when it counts.',
    description:
      'Hurt in an accident? Our team fights for the recovery you deserve. Start to finish.',
    points: [
      'Car, truck, and motorcycle accidents',
      'Slip and fall injuries',
      'Workplace and construction injuries',
      'Wrongful death claims',
      'Medical malpractice',
    ],
  },
  {
    id: 'criminal-defense',
    Icon: LuShieldCheck,
    title: 'Criminal Defense',
    tagline: 'Your freedom, defended.',
    description:
      'Facing charges is overwhelming. From arrest through trial, our team protects your rights and builds the strongest defense possible at every stage.',
    points: [
      'DUI and traffic offenses',
      'Drug charges and possession',
      'Assault, battery, and violent crimes',
      'Theft and property crimes',
      'Juvenile defense',
    ],
  },
  {
    id: 'corporate-law',
    Icon: LuBuilding2,
    title: 'Corporate Law',
    tagline: 'Practical counsel for local business.',
    description:
      'Straightforward legal guidance for small and mid-size businesses from formation to disputes.',
    points: [
      'Business formation and structuring',
      'Contract drafting and review',
      'Employment law guidance',
      'Commercial disputes and litigation',
    ],
  },
]

const scrollToService = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Services() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      setTimeout(() => scrollToService(id), 100)
    }
  }, [hash])

  return (
    <div className="grain overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16 relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-full opacity-10" style={{ background: 'radial-gradient(circle at 70% 30%, var(--gold) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs uppercase tracking-[0.5em] font-body font-semibold mb-4">How We Can Help</p>
          <h1 className="font-display text-4xl lg:text-7xl font-black text-cream leading-[0.85] tracking-tighter uppercase mb-6">
            Services
          </h1>
          <div className="section-divider w-20 h-1 bg-gold" />
          <p className="text-cream/60 text-lg font-body leading-relaxed max-w-2xl">
            Every case gets our full, personal attention.
          </p>
        </div>
      </section>

      {/* ─── QUICK NAV ─── */}
      <section className="bg-gold py-6 sticky top-20 z-30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-2">
            {services.map(({ id, Icon, title }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToService(id)}
                className="flex items-center gap-3 group py-3 px-4 hover:bg-navy/10 transition-all rounded text-left"
              >
                <Icon className="text-navy text-3xl group-hover:scale-110 transition-transform" />
                <span className="font-display text-navy text-sm font-bold uppercase tracking-wider">{title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE SECTIONS ─── */}
      {services.map(({ id, Icon, title, tagline, description, points }, i) => (
        <section
          key={id}
          id={id}
          className="py-16 lg:py-24 scroll-mt-32"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
              {/* Content */}
              <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-16 h-16 flex items-center justify-center bg-gold/10 border border-gold/30">
                    <Icon className="text-gold text-3xl" />
                  </div>
                  <p className="text-gold text-[10px] uppercase tracking-[0.4em] font-semibold">{title}</p>
                </div>
                <h2 className="font-display text-3xl lg:text-5xl font-black text-cream leading-[0.9] uppercase tracking-tighter mb-4">
                  {tagline}
                </h2>
                <div className="section-divider w-12 h-1 bg-gold my-6" />
                <p className="text-cream/60 font-body text-base leading-relaxed mb-8">
                  {description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-gold text-navy font-display font-bold text-xs uppercase tracking-[0.2em] px-7 py-3.5 hover:bg-gold-light transition-all"
                >
                  <FaPhoneAlt className="text-sm" /> Free Consultation
                </Link>
              </div>

              {/* Points card */}
              <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <div className="bg-navy-light border-t-4 border-gold p-7 lg:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <h3 className="font-display text-base font-bold text-cream uppercase tracking-tight mb-6">What We Handle</h3>
                  <ul className="space-y-4">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-4">
                        <LuCircleCheck className="text-gold text-lg mt-0.5 shrink-0" />
                        <span className="text-cream/70 font-body text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-28 text-center border-t border-gold/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl lg:text-7xl font-black text-cream mb-6 leading-[0.85] uppercase tracking-tighter">
            Ready to<br /><span className="text-gradient font-serif-bold italic lowercase tracking-normal inline-block pr-3 pb-2 leading-[1]">Talk?</span>
          </h2>
          <p className="text-cream/50 font-body text-base mb-10">
            Every case starts with a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-4 bg-gold text-navy font-display font-bold text-xs uppercase tracking-[0.3em] px-10 py-5 hover:bg-gold-light transition-all shadow-xl">
              <FaPhoneAlt /> Call {PHONE}
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center border-2 border-gold/40 text-gold font-display font-bold text-xs uppercase tracking-widest px-10 py-5 hover:bg-gold/10 transition-all">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
