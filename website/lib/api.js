// Thin fetch wrapper for talking to backend/'s REST API from server components.
// Set NEXT_PUBLIC_API_URL in .env (see .env.example) to point at the backend.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function apiGet(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${path}`);
  }

  return res.json();
}
