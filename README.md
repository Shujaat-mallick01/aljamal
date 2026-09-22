# Diwan Aljamal — salon mockup template

A static, one-page salon site: Arabic-first (RTL) with an English toggle, prices shown
openly, and a booking form that opens WhatsApp with the whole request pre-written.

No framework, no build step. Deploy the folder as-is.

```
index.html          the page (structure + SEO + JSON-LD)
site.config.js      ALL brand content: names, contact, hours, colours, fonts, services,
                    packages, offers, gallery, reviews, every UI string (ar + en)
css/styles.css      one stylesheet, logical properties so RTL and LTR share the rules
js/main.js          rendering, i18n, opening-hours logic, booking → WhatsApp
assets/             images, video clips, logo, favicons, OG image
```

## Reskin it for another salon (Candles, Suzy Beauty, …)

Everything below happens in `site.config.js` and `/assets`. You should not need to touch
`index.html`, `styles.css` or `main.js`.

**1. Brand and contact**

```js
brand.name        { ar: 'اسم الصالون', en: 'Salon Name' }
brand.logo        'assets/brand/logo.png'   // or '' to fall back to a text wordmark
contact.whatsapp  '9665XXXXXXXX'            // international, digits only
contact.instagram / snapchat / mapUrl       // leave a url '' and the site prints an honest
                                            // "to be added by the salon" line instead of a dead link
contact.area      the neighbourhood line shown in the hero and the footer
```

**2. Hours** — `hours.open` / `hours.close` in 24h. A closing time smaller than the opening
time means *after midnight* (`14:00` → `02:00`), and the live status line, the slot list and
the date written into the WhatsApp message all handle the rollover. Also update
`hours.openWord` / `closeWord` / `line`, which are the words shown to visitors.

**3. Colours** — `colors` is applied to `<html>` as CSS custom properties at load:

| token | used for |
|---|---|
| `--bg` | page background |
| `--alt` | brides + booking bands |
| `--ink`, `--ink-soft` | text |
| `--cta`, `--cta-deep` | buttons (keep white text at 4.5:1 or better) |
| `--gold` | hairlines, eyebrows, the branch motif |
| `--rose` | small accents only |
| `--dark` | the offers band and footer |
| `--line` | hairline borders |

Sample the two or three tones straight from the salon's logo and keep the accent under
about 10% of the surface — that restraint is what makes it look expensive.

**4. Fonts** — set `fonts.*` here **and** swap the Google Fonts `<link>` in `index.html`
(one line in `<head>`). Arabic display is Aref Ruqaa, Arabic body IBM Plex Sans Arabic,
English display Marcellus, English body IBM Plex Sans.

**5. Services, packages, offers, reviews, gallery, marquee** — arrays in the config. Each
service is one "verse" in the menu:

```js
{ id: 'mk-soiree', price: 350, duration: { ar: '90 دقيقة', en: '90 min' },
  name: { ar: 'ميكب سهرة', en: 'Evening makeup' },
  desc: { ar: '…', en: '…' } }
```

`id` must stay unique — the booking form and the WhatsApp message key off it. Prices are
plain numbers; the currency comes from `currency`. Add or remove categories freely: the
tabs, the picker in the booking form and the estimated total all follow the config.

Bridal packages take a `duration` and their own "book this package" button, which switches
the form to bridal mode with that package already selected. `ui.marquee` is the slow band of
words that runs between the brides and the offers — keep them short, 5 to 8 of them.

**6. Images** — replace the files in `/assets`, keeping the names and updating `w`/`h` in the
config where they appear. Recommended sizes:

| file | size | note |
|---|---|---|
| `hero.webp` | 900 × 1180 | portrait, above the fold, keep it under ~60 KB |
| `bridal-hero.webp` | 1600 × 1100 | the wide brides image |
| `bridal-side.webp` | 900 × 1150 | the small overlapping one |
| `gallery/*.webp` | ~900 wide | mixed heights — the masonry wants variety |
| `video/*.mp4` | 360p, < 1.5 MB | muted loops; they only load when scrolled into view |
| `nails.webp`, `visit.webp` | — | the two quiet supporting shots |
| `og.jpg` | 1200 × 630 | social preview |
| `brand/logo.png` | ~760 wide | dark art on white; the header multiplies it onto the page |
| `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` | — | from the logo |

Grade every photo the same way — one warm, soft, slightly desaturated look — so a set of
Instagram screenshots still reads as one salon.

**7. SEO** — `seo.title`, `seo.description`, `seo.url`. Then mirror them in `index.html`:
`<title>`, the meta description, the OG/Twitter tags, `canonical`, the `hreflang` links and
the `BeautySalon` JSON-LD block (name, address, telephone, `openingHours`, `sameAs`). These
are static on purpose so crawlers and WhatsApp/Instagram previews see them without JS.

**8. The demo banner and the credit line** live in `ui.demoBanner` and `ui.footer.credit`.
Remove the banner (and the `*` price footnote) once the salon signs off on real prices.

## Motion

All movement is one system and all of it is off under `prefers-reduced-motion`:

- a single reveal pass (`[data-reveal]` + `.is-in`) driven by one throttled scroll handler,
  with a slow safety tick so content can never be left invisible;
- the hero photograph unveils once on load and the branch line draws itself once;
- the header gains its hairline and shadow after the first scroll, and the logo shrinks;
- hover and press feedback on every control, a tween on the estimated total, and the
  mobile dock that slides up with the running total once a service is chosen.

## How the booking flow works

1. Services are chosen in the menu ("add to request") or in the booking form's chips.
2. `booking type` switches to bridal: bridal packages appear, a wedding-date field shows,
   and the deposit note is added.
3. Dates are limited to today or later (Asia/Riyadh). For today, slots that have already
   passed are hidden, with a 30-minute lead.
4. Slots are generated every `booking.slotMinutes` from `hours.open` to `hours.close`.
   Slots after midnight are labelled "بعد منتصف الليل" and are written into the message with
   the *next* day's date.
5. Submitting validates in Arabic, fills a honeypot check, then opens
   `https://wa.me/<number>?text=…` with the full request for the customer to review and send.
   Nothing is stored anywhere and no back end is needed.

## Local preview

```
python -m http.server 8080     # or any static server
```

Then open `http://localhost:8080`. `?lang=en` forces English; the choice is remembered in
`localStorage` (wrapped in try/catch, so private mode is fine).

## Deploy

Drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or:

```
npx netlify-cli deploy --dir . --prod
```

`netlify.toml` sets long cache headers for `/assets` and short ones for the HTML.
