// Thin fetch wrapper for talking to backend/'s REST API from server components.
// Set NEXT_PUBLIC_API_URL in .env (see .env.example) to point at the backend.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function apiGet(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);

  if (!res.ok) {
    const error = new Error(`API request failed: ${res.status} ${path}`);
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || `Request failed: ${res.status}`);
    error.errors = data.errors;
    throw error;
  }

  return data;
}

// Images (product_images.image_path) are usually backend-relative paths
// (e.g. "/uploads/plate.jpg") served by the backend — except "/images/…",
// which is the convention for stand-in photography bundled with the
// website itself (see website/public/images and /credits) rather than
// something an admin uploaded.
export function resolveImageUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith('/images/')) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// Distinct `category` values from a product list, in first-seen order.
// Category is a free-text column (see backend/src/models/schema.sql), so
// this is how the site derives its quick-nav categories instead of a
// hardcoded list.
export function getDistinctCategories(products) {
  const seen = new Set();
  const categories = [];
  for (const product of products) {
    if (product.category && !seen.has(product.category)) {
      seen.add(product.category);
      categories.push(product.category);
    }
  }
  return categories;
}

// Fetches editable page content (backed by the `pages` table, edited via the
// admin app). Falls back to `fallback` if the page has no content yet (404)
// or the backend is unreachable, so a page is never blank while content is
// still being written. Shallow-merged over the fallback so a partially
// filled-in record doesn't blank out sections nobody has edited yet.
export async function getPageContent(key, fallback = {}) {
  try {
    const { content } = await apiGet(`/api/pages/${key}`);
    return { ...fallback, ...content };
  } catch {
    return fallback;
  }
}
