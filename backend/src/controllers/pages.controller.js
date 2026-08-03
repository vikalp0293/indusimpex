const pool = require('../config/db');

const KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// MariaDB's JSON type is a LONGTEXT alias, so mysql2 returns `content` as a
// raw string rather than auto-parsing it the way it does for MySQL 8's
// native JSON type. Normalize either way so callers always get an object.
function withParsedContent(row) {
  return {
    ...row,
    content: typeof row.content === 'string' ? JSON.parse(row.content) : row.content,
  };
}

// GET /api/pages/:key — public. Returns 404 if the key has no content yet,
// so callers (the website) can fall back to sensible defaults.
exports.getByKey = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT page_key, content, updated_at FROM pages WHERE page_key = ?', [
      req.params.key,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: `No content found for page "${req.params.key}"` });
    }
    res.json(withParsedContent(rows[0]));
  } catch (err) {
    next(err);
  }
};

// PUT /api/pages/:key — admin only. Upserts the content block for a page key.
exports.update = async (req, res, next) => {
  const { key } = req.params;

  if (!KEY_PATTERN.test(key)) {
    return res.status(400).json({ message: 'page key must contain only lowercase letters, numbers and hyphens' });
  }
  if (!isPlainObject(req.body.content)) {
    return res.status(400).json({ message: 'content must be a JSON object' });
  }

  try {
    await pool.query(
      `INSERT INTO pages (page_key, content) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content)`,
      [key, JSON.stringify(req.body.content)]
    );

    const [rows] = await pool.query('SELECT page_key, content, updated_at FROM pages WHERE page_key = ?', [key]);
    res.json(withParsedContent(rows[0]));
  } catch (err) {
    next(err);
  }
};
