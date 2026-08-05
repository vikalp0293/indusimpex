import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import HomePageForm from '../components/HomePageForm.jsx';
import AboutPageForm from '../components/AboutPageForm.jsx';
import ExportInfoPageForm from '../components/ExportInfoPageForm.jsx';
import GalleryPageForm from '../components/GalleryPageForm.jsx';
import Button from '../components/ui/Button.jsx';

// Default shape for each page key — mirrors exactly what the corresponding
// website/app/**/page.js expects as props, so every field always has
// somewhere to render even before anything has been saved for that page.
const DEFAULTS = {
  home: {
    hero: {
      headline: '',
      subtext: '',
      primaryCtaLabel: 'View Products',
      primaryCtaHref: '/products',
      secondaryCtaLabel: 'Request a Quote',
      secondaryCtaHref: '/contact',
    },
    stats: { items: [], note: '' },
    story: { eyebrow: '', heading: '', body: '', ctaLabel: '', ctaHref: '/about' },
    mission: { heading: '', body: '', foundingYear: '' },
    trustBadges: [],
    whySource: [],
    exploreTiles: { heading: '', tiles: [] },
    newsletter: { heading: '', body: '', ctaLabel: 'Request a Quote' },
  },
  about: {
    intro: '',
    manufacturing: { heading: '', body: '' },
    certifications: [],
    sustainability: { heading: '', body: '' },
  },
  'export-info': {
    intro: '',
    shippingTerms: [],
    portsShippedFrom: '',
    leadTimes: '',
    samplePolicy: '',
    paymentTerms: '',
  },
  gallery: { intro: '', items: [] },
};

const PAGE_KEYS = [
  { key: 'home', label: 'Home', Form: HomePageForm },
  { key: 'about', label: 'About', Form: AboutPageForm },
  { key: 'export-info', label: 'Export Info', Form: ExportInfoPageForm },
  { key: 'gallery', label: 'Gallery', Form: GalleryPageForm },
];

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

// Shallow-merges saved content over the default shape one level deep, so a
// partially-filled record (or a brand new one) never leaves a form field
// reading `undefined`.
function withDefaults(defaults, content) {
  const result = structuredClone(defaults);
  for (const key of Object.keys(defaults)) {
    if (content && content[key] !== undefined) {
      result[key] =
        isPlainObject(defaults[key]) && isPlainObject(content[key])
          ? { ...defaults[key], ...content[key] }
          : content[key];
    }
  }
  return result;
}

export default function PagesPage() {
  const [activeKey, setActiveKey] = useState(PAGE_KEYS[0].key);
  const [content, setContent] = useState(DEFAULTS[PAGE_KEYS[0].key]);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      setSaved(false);
      try {
        const page = await api.get(`/api/pages/${activeKey}`);
        if (cancelled) return;
        setContent(withDefaults(DEFAULTS[activeKey], page.content));
        setUpdatedAt(page.updated_at);
      } catch (err) {
        if (cancelled) return;
        if (err.status === 404) {
          setContent(structuredClone(DEFAULTS[activeKey]));
          setUpdatedAt(null);
        } else {
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [activeKey]);

  const handleSave = async () => {
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      const page = await api.put(`/api/pages/${activeKey}`, { content });
      setContent(withDefaults(DEFAULTS[activeKey], page.content));
      setUpdatedAt(page.updated_at);
      setSaved(true);
    } catch (err) {
      setError(err.errors && err.errors.length ? err.errors.join(', ') : err.message);
    } finally {
      setSaving(false);
    }
  };

  const ActiveForm = PAGE_KEYS.find((p) => p.key === activeKey).Form;

  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm text-slate-500">
        Edit the content shown on the public website. Changes take effect immediately after
        saving — no redeploy needed.
      </p>

      <div className="mb-6 flex gap-1 border-b border-slate-200">
        {PAGE_KEYS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              // Reset content to this tab's shape synchronously (in the same
              // batch as activeKey) so the form never briefly renders with
              // the previous tab's content shape before the fetch resolves.
              setActiveKey(key);
              setContent(structuredClone(DEFAULTS[key]));
              setLoading(true);
            }}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeKey === key
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="max-w-2xl">
          {updatedAt && (
            <p className="mb-4 text-xs text-slate-400">
              Last updated: {new Date(updatedAt).toLocaleString()}
            </p>
          )}

          <ActiveForm value={content} onChange={setContent} />

          <div className="sticky bottom-0 mt-6 flex items-center gap-3 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur">
            <Button type="button" variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {saved && <p className="text-sm text-emerald-600">Saved.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
