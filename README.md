# MTL Legal LLP — website

A static, dependency-free website for MTL Legal LLP, built from the firm's brochure
(`source/MTLLegalLLP-Brochure.pdf`). No build step, no framework — open `index.html` or drop the
folder onto any static host (Netlify, Vercel, S3 + CloudFront, cPanel, GitHub Pages).

## Structure

```
index.html        Home — hero, about, why MTL Legal, practices, founders, offices
about.html        About the firm, the four commitments, reach
practices.html    Banking & Finance · Real Estate · Disputes · Corporate Advisory
team.html         Co-founders, partners and associate partners
contact.html      Five offices, enquiry form, map
robots.txt
sitemap.xml
assets/
  css/style.css   All styling (design tokens at the top of the file)
  js/main.js      Nav, scroll reveals, Bar Council disclaimer, enquiry form
  img/            hero.jpg, mtl-logo.png, mtl-logo-light.png, favicon.png
source/           Original brochure and full-resolution artwork
```

## Design

- **Navy `#182e7A`** and **grey `#8c9093`** are sampled directly from the MTL Legal mark;
  **brass `#b08a4a`** is drawn from the scales in the hero photograph.
- Cormorant Garamond for headings, Inter for body text (loaded from Google Fonts).
- All colours, spacing and fonts are CSS custom properties in `:root` — change them in one place.
- Responsive at 1024px, 900px (nav collapses to a menu) and 640px.
- Respects `prefers-reduced-motion`; skip link, focus rings and ARIA labels throughout.

## Deployment

Hosted on Netlify, connected to `github.com/Koulsami/mtl-legal-website` (public). Every push to
`main` redeploys automatically. There is no build step — `netlify.toml` sets `publish = "."`, so
the repository root *is* the site. Anything committed here becomes a public URL, which is why
`source/` is gitignored.

The repository is public on purpose. Netlify's free plan allows only one Git contributor on a
*private* repo, and commits here carry a `Co-Authored-By` trailer, which counts as a second
contributor — builds failed with "unrecognized Git contributor" until the repo was made public,
where contributors are unlimited. Keep the brochure and any client material out of the repo
(see `.gitignore`); everything committed is world-readable as well as published.

Local preview:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Before going live

0. **Remove the staging noindex.** `netlify.toml` serves `X-Robots-Tag: noindex, nofollow` on
   every page so the placeholder contact details never reach search results. Delete that one
   line (it is commented in the file) once steps 1 and 3 below are done — until then the site
   is invisible to Google by design.
1. **Contact details** — `contact.html` carries placeholders marked with a `TODO` comment:
   `contact@mtllegal.in` and `+91 22 0000 0000`. Replace both, and update the `mailto:`
   address in `assets/js/main.js`.
2. **Enquiry form** — there is no backend. `main.js` currently opens the visitor's mail client
   with the form contents pre-filled so nothing is silently lost. Point the `submit` handler at
   a real endpoint (Formspree, Netlify Forms, or your own handler) when one exists.
3. **Domain** — `https://www.mtllegal.in/` is assumed in the canonical tags, `sitemap.xml`,
   `robots.txt` and the JSON-LD block in `index.html`. Search and replace if it differs.
4. **Office hours** on `contact.html` (Mon–Fri, 10:00–19:00 IST) were not in the brochure —
   confirm or remove them.
5. **Map** — the Mumbai embed is a keyless Google Maps iframe; swap in a precise pin if wanted.
6. **Disclaimer** — the Bar Council of India interstitial appears once per browser session
   (`sessionStorage`). Have the firm approve the wording in `index.html` and the footer note.

