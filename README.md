# Rohan Palmer — Law Firm Website

### Run dev server

npx vite --host 127.0.0.1     

## File Structure

```
project-root/
├── index.html                     (existing — no changes needed)
├── vite.config.ts                 (existing — no changes needed)
├── tsconfig.json                  (existing — no changes needed)
├── package.json                   ← ADD react-router-dom (see below)
├── tailwind.config.js             ← REPLACE with provided file
│
└── src/
    ├── index.css                  ← REPLACE with provided file
    ├── main.tsx                   ← REPLACE with provided file
    ├── App.tsx                    ← REPLACE with provided file
    │
    ├── components/
    │   ├── Navbar.tsx             ← NEW
    │   ├── Footer.tsx             ← NEW
    │   └── Layout.tsx             ← NEW
    │
    └── pages/
        ├── Home.tsx               ← NEW (full home page)
        ├── Results.tsx            ← NEW (placeholder)
        ├── Services.tsx           ← NEW (placeholder)
        └── Contact.tsx            ← NEW (full contact page)
```


## Design System

**Colors:**
- `#C9A84C` — Gold (primary accent)
- `#0D1B2A` — Deep Navy (background)
- `#152336` — Navy Light (cards)
- `#1A2D42` — Navy Mid (sections)
- `#F5F0E8` — Cream (text)

**Fonts (loaded via Google Fonts in index.css):**
- `Playfair Display` — Headlines, display text
- `DM Sans` — Body, UI, labels

**Key classes:**
- `.gold-underline` — Adds gold underline accent
- `.section-divider` — 60px gold rule
- `.card-lift` — Hover lift animation
- `.text-gradient` — Gold gradient text
- `.grain` — Subtle film grain overlay

---
## Next Steps

1. **Attorney Photo**: Replace the placeholder in `Home.tsx` hero with a real `<img>` tag
2. **Logo**: Update the `JB` monogram in `Navbar.tsx` with an SVG logo file
3. **Phone Number**: Update `PHONE` and `PHONE_HREF` constants in `Navbar.tsx` and `Home.tsx`
4. **Form Backend**: Wire up the contact forms to a service (Formspree, EmailJS, etc.)
5. **Results Page**: Populate with real case results
6. **Services Page**: Build out with full practice area detail pages
7. **SEO**: Add meta tags, Open Graph, and structured data

---