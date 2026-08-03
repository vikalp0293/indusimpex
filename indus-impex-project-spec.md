# Indus Impex — Website Project Specification

## 1. Business Context

- **Business name:** Indus Impex
- **Domain:** indusimpex.com
- **Location:** India
- **Industry:** Export business — eco-friendly disposable tableware
- **Products:** Areca leaf plates (HSN codes 46021990, 46021919, Chapter 46 — articles of vegetable plaiting materials), expanding into disposable cups and other eco-friendly tableware
- **Target audience:** Both domestic and international B2B buyers/importers
- **Positioning:** Category-first (eco-friendly disposable tableware manufacturer & exporter), not single-product. Sustainability story matters — areca leaf = naturally fallen leaf, no trees cut, biodegradable.

This is a **lead-generation / catalog site**, not an e-commerce store. No online checkout, no payment processing. The goal is to get qualified B2B inquiries (RFQs) from buyers.

---

## 2. Tech Stack

Three-part architecture, each in its own top-level directory of the repo:

- **`backend/`** — Plain Node.js + Express (JavaScript, not TypeScript). REST API handling all MySQL queries, auth, and business logic. Single source of truth that both `admin/` and `website/` consume — no direct DB access from either frontend.
- **`admin/`** — Admin panel (lightweight React + Vite SPA, or simple server-rendered pages). Auth-gated. CRUD screens for products, page content, and inquiries. Talks to `backend/` via its REST API.
- **`website/`** — Next.js (App Router) public-facing site. Fetches data from `backend/`'s API rather than querying MySQL directly. Handles all public pages, animations (Framer Motion), and SEO.
- **Styling/Animation:** Tailwind CSS + Framer Motion for scroll/entrance animations (in `website/`)
- **Database:** MySQL
- **Image hosting:** Local storage only for now — uploaded images stored on the VPS filesystem, no cloud storage service
- **Version control:** GitHub repo required (needed for Claude Code cloud/background sessions)

### Hosting

Single VPS (e.g., DigitalOcean, Hostinger VPS, Linode) running everything:
- MySQL
- `backend/` Express app, managed via PM2
- `website/` Next.js app, managed via PM2
- `admin/` served as a static build via Nginx (or PM2 if server-rendered)
- Nginx as reverse proxy routing: `indusimpex.com` → website, `admin.indusimpex.com` → admin panel, `api.indusimpex.com` → backend

### Why this architecture (context for Claude Code, not a task)
Previously started building on WordPress + Kadence + WooCommerce (in catalog mode), but switched away because:
- Content in WordPress lives in a database Claude Code can't directly read/write, blocking full AI-assisted development
- The site owner (Vikalp) is a full-stack Node.js/React developer with a PHP/traditional-hosting background — a plain Express backend + single VPS matches his mental model more than a serverless/Next.js-API-routes approach
- Separating backend/admin/website keeps each concern clean and means the backend API could later serve a mobile app or other clients too
- A self-built admin with a simple, self-designed MySQL schema is easy for Claude Code to query and modify directly via SQL

---

## 3. Site Structure / Pages

1. **Home**
   - Hero: category-first positioning headline (e.g., "Eco-Friendly Disposable Tableware, Made in India, Exported Worldwide"), subtext, two CTAs (e.g., "View Products" / "Request a Quote")
   - Category/quick-nav section (e.g., Plates / Cups / Cutlery / All)
   - Featured Products grid (pulls from products table, NOT hardcoded)
   - Stats/credibility section (e.g., years in business, countries served, product types — real numbers once available)
   - Mission/story section — sustainability narrative, "Handcrafted/Made in India since [year]"
   - Trust badges section (certifications, guarantees, etc.)
   - Testimonials section (once available; can be a "Why Source From Us" section pre-launch)
   - Newsletter/contact capture footer section

2. **Products** (`/products`)
   - Grid of all products, pulled dynamically from the database
   - Each product: name, image(s), size/shape variants, material specs, HSN code, MOQ notes
   - NO prices, NO "Add to Cart" — instead an "Request a Quote" / "Inquire Now" button per product, linking to the RFQ form (pre-filled with product name if possible)

3. **Product Detail** (`/products/[slug]`)
   - Full spec sheet per product: dimensions, material, packaging options, HSN code, MOQ
   - Image gallery
   - "Request a Quote" CTA

4. **About** (`/about`)
   - Company background, manufacturing capability
   - Certifications (FSSAI, ISO, export licenses like IEC/RCMC — placeholder until real ones are available)
   - Sustainability story

5. **Export Info** (`/export-info`)
   - FOB/CIF terms explanation
   - Ports shipped from
   - Sample policy
   - Lead times
   - Payment terms (LC, TT, etc.)
   - This page is a key differentiator — most competitor sites skip it

6. **Gallery** (`/gallery`)
   - Real photos of production unit, packaging process, product samples (placeholder images until real photos are supplied)

7. **Contact / RFQ** (`/contact`)
   - Primary form fields: Name, Company, Email, Phone, Product Interest (dropdown from products table), Quantity, Destination Country, Shipping Terms preference, Message
   - Submissions saved to an `inquiries` table, viewable in admin

8. **Admin** (standalone `admin/` app, e.g. admin.indusimpex.com, auth-protected)
   - Login (simple email/password to start)
   - Products: list, create, edit, delete (with image upload)
   - Pages: edit homepage sections, About, Export Info content (structure TBD based on how dynamic these need to be — could be simple hardcoded React components edited via Claude Code initially, with DB-backed editing added later if non-technical staff need to update them)
   - Inquiries: list of RFQ submissions, mark as read/responded
   - All data operations go through `backend/`'s REST API, not direct DB access from the admin app

---

## 4. Design Direction

Based on shared reference screenshots (Kadence "Wooden Craft" starter template), adapted for this business:

- **Overall feel:** Modern, professional, credibility-focused — NOT an artisan/boutique-shop aesthetic. Should read as an established B2B exporter, not a handmade Etsy-style shop.
- **Color palette:** Green or teal-based (eco/sustainability signal), not the wood-brown tones of the original reference template
- **Typography:** Clean, modern sans-serif — avoid decorative script/serif combos that read as "artisan shop"
- **Animation:** Scroll-based entrance animations (fade-up, slide-in) on sections as the user scrolls, via Framer Motion. Should feel modern and polished, not gimmicky.
- **Layout patterns to carry over from the reference:**
  - Hero with dark overlay image + bold headline + two CTA buttons
  - Circular icon quick-nav row below hero
  - Product grid with image, name, and a single action button (adapted: "Request Quote" instead of "Add to Cart", no price)
  - Stats/counter section with large numbers + labels
  - Full-width dark section for mission/story statement
  - Alternating image+text sections
  - Trust badge row (circular badge icons)
  - Testimonial cards
  - Newsletter signup band before footer

## 5. Responsiveness

The site must be fully responsive across mobile, tablet, and desktop breakpoints. All sections (hero, product grid, stats, testimonials) need to reflow cleanly on small screens — test at minimum at 375px (mobile), 768px (tablet), and 1440px (desktop) widths.

---

## 6. Explicit Non-Goals

- No shopping cart or checkout flow
- No payment gateway integration
- No WooCommerce/WordPress — this is a clean break from the earlier WordPress attempt
- No third-party CMS (Tina, Contentful, Sanity, etc.) — admin is custom-built

---

## 7. Open Items / Placeholder Content

The following are not yet finalized and should use clearly-marked placeholder content until real data is provided:
- Actual product photography (using placeholder/stock images for now)
- Real certifications (FSSAI, ISO, IEC/RCMC — confirm which the business actually holds)
- Real stats (years in business, countries served, export volume)
- Testimonials (none yet — use a "Why Source From Us" section instead)
- Logo (a version exists — see uploaded screenshots — should be used as-is unless a redesign is requested separately)
