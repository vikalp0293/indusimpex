// Small hand-drawn line-icon set used across placeholder graphics, category
// nav, and trust/feature sections. Deliberately simple (stroke-based,
// currentColor) so they read as a consistent illustration system rather
// than photography standing in for photography we don't have yet.

export function PlateIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="11" />
      <circle cx="24" cy="24" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CupIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M12 16h20l-2 20a3 3 0 0 1-3 2.6H17a3 3 0 0 1-3-2.6L12 16Z" />
      <path d="M32 19h2.5A4.5 4.5 0 0 1 39 23.5v0A4.5 4.5 0 0 1 34.5 28H31" />
      <path d="M17 10c1-1.5 1-2.5 0-4M24 10c1-1.5 1-2.5 0-4M31 10c1-1.5 1-2.5 0-4" strokeLinecap="round" />
    </svg>
  );
}

export function CutleryIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M15 6v14a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3V6M15 6v9M21 6v9M18 23v19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 6c-3 0-5 4-5 9s2 8 5 8v19" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BowlIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M8 22h32a16 12 0 0 1-32 0Z" />
      <path d="M14 22c0-5 4.5-9 10-9s10 4 10 9" strokeLinecap="round" />
    </svg>
  );
}

export function LeafIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M10 38C10 20 22 8 40 8c0 18-12 30-30 30Z" />
      <path d="M12 36C20 26 28 18 38 10" strokeLinecap="round" />
    </svg>
  );
}

export function FactoryIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M6 40V22l10 6V22l10 6V14l12 8v18Z" strokeLinejoin="round" />
      <path d="M6 40h36M32 22V9h4v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="24" cy="24" r="17" />
      <path d="M7 24h34M24 7c5 5 7.5 11 7.5 17S29 39 24 41c-5-2-7.5-11-7.5-17S19 12 24 7Z" />
    </svg>
  );
}

export function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M24 6l15 5v11c0 10-6.5 17.5-15 20-8.5-2.5-15-10-15-20V11Z" strokeLinejoin="round" />
      <path d="M17 24l5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PackageIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M6 15 24 6l18 9-18 9-18-9Z" strokeLinejoin="round" />
      <path d="M6 15v18l18 9V24M42 15v18l-18 9" strokeLinejoin="round" />
      <path d="M15 10.5 33 19.5" strokeLinecap="round" />
    </svg>
  );
}

export function HandshakeIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M4 22l8-7 8 4 4-3 8 1 12 9-5 6-4-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 19l9 8a3 3 0 0 0 4-4l-7-7M20 21l7 6a3 3 0 0 0 4-4M28 19l5 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 22l6 14 5-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CameraIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M6 16h7l3-4h16l3 4h7v22H6Z" strokeLinejoin="round" />
      <circle cx="24" cy="27" r="7" />
    </svg>
  );
}

// Picks an icon key by matching common category keywords; falls back to
// "leaf" for anything else so new/unknown categories never render blank.
export function iconKeyForCategory(category) {
  const value = (category || "").toLowerCase();
  if (value.includes("plate")) return "plate";
  if (value.includes("cup") || value.includes("glass")) return "cup";
  if (value.includes("cutlery") || value.includes("fork") || value.includes("spoon")) return "cutlery";
  if (value.includes("bowl")) return "bowl";
  return "leaf";
}

// Best-effort icon pick for "why source from us" style feature blurbs,
// matched by keyword in the title so admin-edited copy still gets a
// sensible icon without a dedicated icon field to maintain.
export function iconKeyForFeature(title) {
  const value = (title || "").toLowerCase();
  if (value.includes("sustain") || value.includes("eco") || value.includes("leaf")) return "leaf";
  if (value.includes("export") || value.includes("global") || value.includes("world") || value.includes("ship"))
    return "globe";
  if (value.includes("manufactur") || value.includes("direct") || value.includes("factory") || value.includes("production"))
    return "factory";
  if (value.includes("quality") || value.includes("trust") || value.includes("guarant") || value.includes("cert"))
    return "shield";
  if (
    value.includes("partner") ||
    value.includes("relationship") ||
    value.includes("service") ||
    value.includes("quote")
  )
    return "handshake";
  if (value.includes("gallery") || value.includes("photo")) return "camera";
  return "package";
}

// Best-effort icon pick for gallery captions (free-text, admin-edited).
export function iconKeyForGalleryItem(label) {
  const value = (label || "").toLowerCase();
  if (value.includes("plate")) return "plate";
  if (value.includes("cup") || value.includes("glass")) return "cup";
  if (value.includes("bowl")) return "bowl";
  if (value.includes("cutlery") || value.includes("fork") || value.includes("spoon")) return "cutlery";
  if (value.includes("quality") || value.includes("inspect")) return "shield";
  if (value.includes("pack")) return "package";
  if (value.includes("team")) return "handshake";
  if (value.includes("production") || value.includes("unit") || value.includes("press") || value.includes("manufactur"))
    return "factory";
  return "camera";
}

export const ICONS = {
  plate: PlateIcon,
  cup: CupIcon,
  cutlery: CutleryIcon,
  bowl: BowlIcon,
  leaf: LeafIcon,
  factory: FactoryIcon,
  globe: GlobeIcon,
  shield: ShieldIcon,
  package: PackageIcon,
  handshake: HandshakeIcon,
  camera: CameraIcon,
};
