import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FaPhoneAlt } from 'react-icons/fa'
import {
  LuScale,
  LuBuilding2,
  LuShieldCheck,
  LuLandmark,
  LuCircleCheck,
} from 'react-icons/lu'

const PHONE = '(407) 520-6985'
const PHONE_HREF = 'tel:4075206985'

const services = [
  {
    id: 'personal-injury',
    Icon: LuScale,
    title: 'Personal Injury',
    tagline: 'You deserve someone in your corner.',
    description:
      'If you or a loved one has been hurt due to someone else\'s negligence, I\'m here to help you get back on your feet. From car accidents to workplace injuries, I handle every case personally — because your recovery matters to me and to this community.',
    points: [
      'Car, truck, and motorcycle accidents',
      'Slip and fall injuries',
      'Workplace and construction injuries',
      'Wrongful death claims',
      'Medical malpractice',
    ],
  },
  {
    id: 'corporate-law',
    Icon: LuBuilding2,
    title: 'Corporate Law',
    tagline: 'Helping local businesses grow with confidence.',
    description:
      'Whether you\'re starting a new venture or navigating a complex dispute, I provide practical, straightforward legal counsel tailored to the needs of small and mid-size businesses in our community.',
    points: [
      'Business formation and structuring',
      'Contract drafting and review',
      'Employment law guidance',
      'Regulatory compliance',
      'Commercial disputes and litigation',
    ],
  },
  {
    id: 'civil-rights',
    Icon: LuShieldCheck,
    title: 'Civil Rights',
    tagline: 'Standing up for what\'s right.',
    description:
      'Everyone deserves equal treatment under the law. With 10 years of experience, I\'ve made it my mission to protect the civil liberties of individuals in our community — holding institutions accountable when they fall short.',
    points: [
      'Discrimination and harassment claims',
      'Police misconduct and excessive force',
      'First Amendment protections',
      'Voting rights issues',
      'Disability rights and ADA compliance',
    ],
  },
  {
    id: 'real-estate',
    Icon: LuLandmark,
    title: 'Real Estate',
    tagline: 'Your property, your peace of mind.',
    description:
      'Buying, selling, or dealing with a property dispute? I guide homeowners, investors, and local developers through every step — making sure your interests are protected from contract to closing.',
    points: [
      'Residential and commercial transactions',
      'Title disputes and quiet title actions',
      'Landlord-tenant matters',
      'Zoning and land use issues',
      'Construction and development contracts',
    ],
  },
]

export default function Services() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  }, [hash])

  return (
    <div className="grain overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="pt-32 lg:pt-44 pb-16 lg:pb-24 bg-navy relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy-accent opacity-90" />
          <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, var(--gold) 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs uppercase tracking-[0.5em] font-body font-black mb-6">How I Can Help</p>
          <h1 className="font-display text-5xl lg:text-8xl font-black text-cream leading-[0.85] tracking-tighter uppercase mb-8">
            Services
          </h1>
          <div className="section-divider w-24 h-1.5 bg-gold" />
          <p className="text-cream/60 text-xl font-body leading-relaxed max-w-2xl">
            I focus on the legal matters that affect everyday people and families in our community. Every case gets my full, personal attention.
          </p>
        </div>
      </section>

      {/* ─── QUICK NAV ─── */}
      <section className="bg-gold py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ id, Icon, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-3 group py-3 px-4 hover:bg-navy/10 transition-all rounded"
              >
                <Icon className="text-navy text-xl group-hover:scale-110 transition-transform" />
                <span className="font-display text-navy text-xs font-black uppercase tracking-wider">{title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE SECTIONS ─── */}
      {services.map(({ id, Icon, title, tagline, description, points }, i) => (
        <section
          key={id}
          id={id}
          className={`py-24 lg:py-32 scroll-mt-24 ${i % 2 === 0 ? 'bg-navy' : 'bg-navy-mid'}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
              {/* Content */}
              <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <Icon className="text-gold text-3xl" />
                  <p className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">{title}</p>
                </div>
                <h2 className="font-display text-4xl lg:text-6xl font-black text-cream leading-[0.85] uppercase tracking-tighter mb-6">
                  {tagline}
                </h2>
                <div className="section-divider w-16 h-1 bg-gold my-8" />
                <p className="text-cream/60 font-body text-lg leading-relaxed mb-10">
                  {description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-4 bg-gold text-navy font-display font-black text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-gold-light transition-all"
                >
                  <FaPhoneAlt className="text-sm" /> Free Consultation
                </Link>
              </div>

              {/* Points card */}
              <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <div className="bg-navy-light border-t-4 border-gold p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <h3 className="font-display text-lg font-black text-cream uppercase tracking-tight mb-8">What I Handle</h3>
                  <ul className="space-y-5">
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
      <section className="py-24 lg:py-40 bg-navy text-center border-t border-gold/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-5xl lg:text-8xl font-black text-cream mb-8 leading-[0.85] uppercase tracking-tighter">
            Ready to<br /><span className="text-gradient font-serif-bold italic lowercase tracking-tight">Talk?</span>
          </h2>
          <p className="text-cream/50 font-body text-lg mb-12">
            Every case starts with a conversation. Reach out and let's discuss how I can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-4 bg-gold text-navy font-display font-black text-xs uppercase tracking-[0.3em] px-12 py-6 hover:bg-gold-light transition-all shadow-xl">
              <FaPhoneAlt /> Call {PHONE}
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center border-2 border-gold/40 text-gold font-display font-black text-xs uppercase tracking-widest px-12 py-6 hover:bg-gold/10 transition-all">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
