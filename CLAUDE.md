# GN128 Solutions — marketing site revamp

> Context handover, last updated **2026-07-13**.
> Credentials in `.credentials.local` (gitignored — do NOT commit).

## What this is

A revamp of the **GN128 Solutions** marketing site (AI automation agency), rebuilt from a Figma
design. Original site was pulled from cPanel; the revamp is a **static HTML/CSS/JS site** (no
framework, no build step) with a dark purple/blue theme.

- **Original live site:** https://gn128.com
- **Staging deploy:** http://tst128.online  ⚠️ **badly out of date — see "Pending" below**
- **Design:** Figma (AI Business Automation) + inspiration from formiqa.webflow.io

## Local dev

```bash
cd ~/Desktop/gn128 && python3 -m http.server 8000
# → http://localhost:8000
```
A local server is **required** (not `file://`).

## Architecture

Plain static site. **Single stylesheet, single JS entry** shared by every page.

```
index.html          Landing page
services.html       Services (silk video hero + Popular Solutions)
solutions.html      Solutions sub-page (audience cards, 3-up) — reached from Services quicklinks
projects.html       Projects grid + category filters + pagination
project.html        DYNAMIC project detail — reads ?project=<slug>
contact.html        Contact form + info (live date/time clock)
faq.html            FAQ accordion (native <details>, exclusive via name="faq")
testimonials.html   "Voices of Success" + reverse-sliding marquees
book.html           Book a Call — Calendly inline embed
assets/css/style.css
assets/js/main.js       reveals, sticky header, marquee cloning, filters, contact form, clock
assets/js/menu.js       mobile overlay menu (Osmo-style wipe, GSAP loaded on demand)
assets/js/project.js    PROJECTS data object + renderer for project.html
assets/img/  assets/video/
```

### Key conventions
- **Design tokens** are CSS custom properties in `:root` (`--bg`, `--primary`, `--gradient`,
  `--header-h`, etc.). Use them; don't hardcode colours.
- **BEM-ish** class naming (`.card`, `.svc-hero__title`, `.site-menu__panel`).
- **`.reveal` + `data-reveal`** = scroll-in animation via IntersectionObserver (in `main.js`).
- **Cards** (`.card`) have a purple gradient border + hover zoom (`scale(1.035)`).
- Legacy pages from the old site (`about.html`, `blog.html`, `contact-legacy.html`, `css/`,
  `img/`, `lib/`) are the **old Bootstrap site** — not part of the revamp.

### Dynamic project detail
`project.html` is a template. All content lives in the `PROJECTS` object in `assets/js/project.js`,
keyed by slug (`crm128`, `marketboost`, `dkonect-mobile`, `fincorp-cloud`, `retalify`,
`dkonect-data`). Cards link to `project.html?project=<slug>`.
**To add a project: add one entry to that object.** No new HTML file.

### Mobile menu (important history)
The original mobile menu used `position:fixed; inset:74px 0 auto 0; transform:translateY(-120%)`,
which **did not move fully off-screen** and left a visible line/sliver at the top. It was
**replaced** with an Osmo-style full-screen overlay (`assets/js/menu.js`) that builds its DOM in
JS and slides panels in from the right via GSAP. On mobile the inline `.nav` is `display:none`;
the hamburger (`#nav-toggle`) opens the overlay. Header `z-index:110` sits above the menu (100)
so the ✕ stays clickable.

## Pending / next steps

1. **🚨 REDEPLOY.** `tst128.online` only ever received the *first* upload. Everything since —
   Contact, Projects, Solutions, FAQ, Testimonials, Book-a-Call, the dynamic project page, the new
   mobile menu, and all mobile fixes — is **local only**. The user has been testing the stale live
   site and (understandably) thinking fixes didn't work.
   Deploy = FTP upload to `tst128.online` `/public_html` (see `.credentials.local`).
2. **Calendly** — `book.html` embeds `https://calendly.com/babawale-emmanuel10/30min`. Verify it
   renders live. (The OAuth client id/secret the user generated are **not needed** for an embed.)
3. **Contact form** is client-side only — it validates and shows a success message but **sends no
   email**. Needs a backend (`send_email.php`) or a service (Formspree) to actually deliver.
4. **Page transition was removed.** A pixel transition and then a panel-wipe transition were both
   built and then **explicitly deleted at the user's request**. Do not re-add unless asked.

## Verified

- **Mobile responsiveness is correct** at a true 390px viewport (hero, nodes constellation, cards).
  Note: **headless Chrome cannot render below ~500px** — to test real phone widths, load the page
  in a **390px-wide iframe** and screenshot that, otherwise you get false "overflow" artifacts.
- No horizontal overflow (`scrollWidth === clientWidth === 390`).

## Related project

`~/Desktop/9jaball` — a **separate** PHP/MySQL admin app (Life Skills Programme). Unrelated code,
same user. See `~/Desktop/9jaball/CLAUDE.md`.
