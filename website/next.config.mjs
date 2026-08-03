import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project — a stray lockfile in a parent
  // directory otherwise makes Next.js guess (and warn) about the wrong root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
