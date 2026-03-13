import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-gold flex items-center justify-center rotate-45">
                <span className="text-gold font-display font-black text-xs -rotate-45">RP</span>
              </div>
              <div>
                <p className="font-display font-bold text-cream text-sm uppercase tracking-wider">Rohan C. Palmer</p>
                <p className="text-gold text-[10px] tracking-widest uppercase">Attorney at Law</p>
              </div>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs font-body">
              Fighting for justice with integrity and relentless dedication. Your fight is our fight.
            </p>
            <p className="text-gold/60 text-xs mt-6 font-body">
              © {new Date().getFullYear()} Rohan C. Palmer, P.A. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold text-xs uppercase tracking-widest font-body font-bold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[['Home', '/'], ['Results', '/results'], ['Services', '/services'], ['Contact', '/contact']].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-cream/60 hover:text-gold text-sm font-body transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-xs uppercase tracking-widest font-body font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-cream/60 text-sm font-body">
              <li><a href="tel:8005550199" className="hover:text-gold transition-colors">(800) 555-0199</a></li>
              <li><a href="mailto:info@jamesblackwood.com" className="hover:text-gold transition-colors">info@RP.com</a></li>
              <li className="text-cream/40 leading-relaxed">
                123 Justice Boulevard<br />Suite 1000<br />Atlanta, GA 30303
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-start gap-4">
          <p className="text-cream/30 text-xs font-body">
            Attorney Advertising. Prior results do not guarantee a similar outcome.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms', 'Disclaimer'].map(label => (
              <Link key={label} to="#" className="text-cream/30 hover:text-gold/60 text-xs font-body transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}