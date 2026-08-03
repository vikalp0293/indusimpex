# Indus Impex — Admin Panel

React + Vite SPA. Auth-gated CRUD for products, page content, and inquiries.
Talks to `backend/`'s REST API only — no direct database access.

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## Structure

- `src/pages/` — route-level pages (Login, Dashboard, Products, Pages, Inquiries)
- `src/components/` — shared components (layout, nav)
- `src/context/` — auth context (JWT stored in localStorage)
- `src/api/client.js` — fetch wrapper for the backend REST API
