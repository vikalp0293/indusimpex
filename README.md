# Indus Impex

Lead-generation / catalog website for Indus Impex, an India-based exporter of
eco-friendly disposable tableware (areca leaf plates, expanding into cups and
other tableware). No e-commerce — the goal is qualified B2B inquiries (RFQs).

See [indus-impex-project-spec.md](./indus-impex-project-spec.md) for the full spec.

## Architecture

Three independent apps, each in its own top-level directory:

- **[`backend/`](./backend)** — Plain Node.js + Express REST API. Single source of
  truth for MySQL data, auth, and business logic. `admin/` and `website/` both
  consume it over HTTP; neither talks to MySQL directly.
- **[`admin/`](./admin)** — React + Vite SPA, auth-gated. CRUD screens for
  products, page content, and inquiries.
- **[`website/`](./website)** — Next.js (App Router) public site. Tailwind CSS +
  Framer Motion. Fetches data from `backend/`'s API for SEO-friendly rendering.

```
indusimpex/
├── backend/    Express API (port 4000 by default)
├── admin/      Admin SPA   (Vite dev server, port 5173 by default)
└── website/    Public site (Next.js, port 3000 by default)
```

## Local development

Each app has its own `package.json`, `.env.example`, and `README.md`. Run them
independently:

```bash
# backend
cd backend && cp .env.example .env && npm install && npm run dev

# admin
cd admin && cp .env.example .env && npm install && npm run dev

# website
cd website && cp .env.example .env && npm install && npm run dev
```

MySQL must be running locally with a database matching `backend/.env`'s
`DB_NAME`; see [`backend/src/models/schema.sql`](./backend/src/models/schema.sql)
for the (placeholder) table definitions.

## Production

Single VPS running MySQL, `backend/` and `website/` under PM2, and `admin/`
served as a static build via Nginx, which also reverse-proxies:
`indusimpex.com` → website, `admin.indusimpex.com` → admin,
`api.indusimpex.com` → backend.
