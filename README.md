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
contact.html      Five offices, enquiry form (Netlify Forms), map
thank-you.html    Confirmation page the enquiry form redirects to
robots.txt
sitemap.xml
assets/
  css/style.css   All styling (design tokens at the top of the file)
  js/main.js      Nav, scroll reveals, Bar Council disclaimer
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

## Outstanding — live site, still needs attention

The site is live at https://mtl-legal.netlify.app/ and the staging `noindex` has been removed.
Two items below are **blocking** and need action in the Netlify dashboard or DNS; the rest are
confirmations.

1. **BLOCKING — turn on Netlify form detection.** The enquiry form markup is correct and
   deployed, but a live `POST` to the site returns **404**, so submissions are lost. Netlify
   registers forms only when form detection is enabled for the site, and only at deploy time:
   enable it in the dashboard under **Forms**, then **trigger a redeploy** — enabling it alone
   will not scan the existing build. Verify with:

   ```bash
   curl -s -o /dev/null -w '%{http_code}\n' -X POST \
     -d 'form-name=enquiry&name=Test&email=t@example.com&message=test' \
     https://mtl-legal.netlify.app/
   # 404 = still not registered, 200/3xx = working
   ```

   Then set **Site configuration → Notifications → Form submission notifications → Email**.
   Netlify does not email you by default; without it, enquiries sit unseen in the dashboard.
   Free tier covers 100 submissions per month.

2. **Domain — `mtllegal.in` is the primary domain.** DNS is configured at GoDaddy:
   `A @ -> 75.2.60.5` (Netlify's apex load balancer) and `CNAME www -> mtl-legal.netlify.app`.
   Netlify redirects `www` to the apex. Every canonical tag, `sitemap.xml`, `robots.txt`,
   the Open Graph tags and the JSON-LD name `https://mtllegal.in/` to match — if you ever
   switch the primary domain to `www` in Netlify, these must all be switched back or the
   canonicals will point at a redirect.

   Canonicals use extensionless paths (`/about`, not `/about.html`) because Netlify's
   pretty-URL post-processing rewrites every internal link that way; both forms resolve.

   GoDaddy's Domain Forwarding must stay **off**. It generates locked `A` records that cannot
   be deleted from the DNS table and silently override everything above.

3. **Contact details are still placeholders, and are now public.** `contact@mtllegal.in` and
   `+91 22 0000 0000` in `contact.html` were invented during the build — the brochure contains
   neither. Deliberately left in place for now. Replace them in `contact.html` (and the
   `LegalService` JSON-LD in `index.html` if you add them there).

4. **Office hours** on `contact.html` (Mon–Fri, 10:00–19:00 IST) were not in the brochure —
   confirm or remove them.

5. **Map** — an OpenStreetMap embed, keyless and frameable. The marker sits on the Kala Ghoda
   street geocode rather than the exact building; the heading names the locality for that
   reason. The keyless Google Maps embed no longer works: it 404s and sends
   `X-Frame-Options: SAMEORIGIN`. Using Google needs a paid Maps Embed API key.

6. **Disclaimer** — the Bar Council of India interstitial appears once per browser session
   (`sessionStorage`). Have the firm approve its wording in `index.html` and the footer note.

7. **"Powered by Netlify" badge** appears on every page. It is injected server-side, not in
   this HTML, so it cannot be removed from code — it is a Netlify plan/settings matter.
