import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

const PAGE_KEYS = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'export-info', label: 'Export Info' },
  { key: 'gallery', label: 'Gallery' },
];

export default function PagesPage() {
  const [activeKey, setActiveKey] = useState(PAGE_KEYS[0].key);
  const [draft, setDraft] = useState('{}');
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
        setDraft(JSON.stringify(page.content, null, 2));
        setUpdatedAt(page.updated_at);
      } catch (err) {
        if (cancelled) return;
        if (err.status === 404) {
          // No content saved for this page yet — start from an empty object.
          setDraft('{}');
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

    let parsed;
    try {
      parsed = JSON.parse(draft);
    } catch {
      setError('Content is not valid JSON — fix the syntax and try again.');
      return;
    }

    setSaving(true);
    try {
      const page = await api.put(`/api/pages/${activeKey}`, { content: parsed });
      setDraft(JSON.stringify(page.content, null, 2));
      setUpdatedAt(page.updated_at);
      setSaved(true);
    } catch (err) {
      setError(err.errors && err.errors.length ? err.errors.join(', ') : err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>Pages</h1>
      <p style={{ color: '#666' }}>
        Edit the JSON content served to the public website for each page. Changes take effect
        immediately — no redeploy needed.
      </p>

      <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        {PAGE_KEYS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveKey(key)}
            style={{ fontWeight: activeKey === key ? 'bold' : 'normal' }}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          {updatedAt && (
            <p style={{ color: '#666', fontSize: 13 }}>
              Last updated: {new Date(updatedAt).toLocaleString()}
            </p>
          )}
          <textarea
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setSaved(false);
            }}
            rows={24}
            spellCheck={false}
            style={{
              width: '100%',
              maxWidth: 720,
              fontFamily: 'monospace',
              fontSize: 13,
              display: 'block',
            }}
          />
          {error && <p style={{ color: 'crimson' }}>{error}</p>}
          {saved && <p style={{ color: 'seagreen' }}>Saved.</p>}
          <button type="button" onClick={handleSave} disabled={saving} style={{ marginTop: 8 }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </>
      )}
    </div>
  );
}
