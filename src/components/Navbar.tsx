import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const PHONE = '(800) 555-0199'
const PHONE_HREF = 'tel:8005550199'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Results', to: '/results' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy/95 backdrop-blur-md shadow-[0_2px_40px_rgba(0,0,0,0.5)] border-b border-gold/10'
            : 'bg-gradient-to-b from-navy/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 border-2 border-gold flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
                <span className="text-gold font-display font-black text-sm -rotate-45 group-hover:rotate-0 transition-transform duration-500">RP</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-cream text-base tracking-wider uppercase">Rohan C. Palmer</span>
                <span className="text-gold text-[10px] tracking-[0.25em] uppercase font-body font-medium">Attorney at Law</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link font-body font-medium text-sm tracking-widest uppercase transition-colors duration-200 ${
                    location.pathname === to ? 'text-gold' : 'text-cream/80 hover:text-cream'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop Phone CTA */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-gold/60 text-[10px] uppercase tracking-widest font-body">Free Consultation</p>
                <a
                  href={PHONE_HREF}
                  className="text-gold font-display font-bold text-lg tracking-wide hover:text-gold-light transition-colors"
                >
                  {PHONE}
                </a>
              </div>
              <a
                href={PHONE_HREF}
                className="bg-gold text-navy font-body font-bold text-xs uppercase tracking-widest px-5 py-3 hover:bg-gold-light transition-colors duration-200"
              >
                Call Now
              </a>
            </div>

            {/* Mobile: Call + Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href={PHONE_HREF}
                className="bg-gold text-navy font-body font-bold text-xs uppercase tracking-widest px-4 py-2"
              >
                Call Now
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-cream p-2 hover:text-gold transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(13,27,42,0.98)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map(({ label, to }, i) => (
            <Link
              key={to}
              to={to}
              className={`font-display text-4xl font-bold tracking-wide transition-all duration-300 ${
                location.pathname === to ? 'text-gold' : 'text-cream hover:text-gold'
              }`}
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href={PHONE_HREF}
            className="mt-8 text-gold font-display font-bold text-2xl border border-gold px-10 py-4 hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {PHONE}
          </a>
        </div>
      </div>
    </>
  )
}