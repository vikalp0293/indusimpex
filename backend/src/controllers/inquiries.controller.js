const pool = require('../config/db');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STATUSES = ['new', 'read', 'responded'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateInquiryPayload(body) {
  const errors = [];

  if (!isNonEmptyString(body.name)) {
    errors.push('name is required and must be a non-empty string');
  } else if (body.name.length > 255) {
    errors.push('name must be at most 255 characters');
  }

  if (!isNonEmptyString(body.email)) {
    errors.push('email is required');
  } else if (!EMAIL_PATTERN.test(body.email.trim()) || body.email.length > 255) {
    errors.push('email must be a valid email address');
  }

  const maxLengths = {
    company: 255,
    phone: 50,
    quantity: 100,
    destination_country: 100,
    shipping_terms: 50,
  };
  for (const [field, max] of Object.entries(maxLengths)) {
    const value = body[field];
    if (value !== undefined && value !== null) {
      if (typeof value !== 'string') {
        errors.push(`${field} must be a string`);
      } else if (value.length > max) {
        errors.push(`${field} must be at most ${max} characters`);
      }
    }
  }

  if (body.message !== undefined && body.message !== null && typeof body.message !== 'string') {
    errors.push('message must be a string');
  }

  if (body.product_interest !== undefined && body.product_interest !== null) {
    if (!Number.isInteger(body.product_interest) || body.product_interest <= 0) {
      errors.push('product_interest must be a positive integer product id');
    }
  }

  return errors;
}

// GET /api/inquiries?status= — admin listing, newest first
exports.list = async (req, res, next) => {
  try {
    const conditions = [];
    const params = [];

    if (req.query.status !== undefined) {
      if (!STATUSES.includes(req.query.status)) {
        return res.status(400).json({ message: `status must be one of: ${STATUSES.join(', ')}` });
      }
      conditions.push('i.status = ?');
      params.push(req.query.status);
    }

    const where = conditions.length ? ` WHERE ${conditions.join(' AND ')}` : '';
    const [rows] = await pool.query(
      `SELECT i.*, p.name AS product_name, p.slug AS product_slug
       FROM inquiries i
       LEFT JOIN products p ON p.id = i.product_interest${where}
       ORDER BY i.created_at DESC, i.id DESC`,
      params
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// POST /api/inquiries — public RFQ form submission
exports.create = async (req, res, next) => {
  const errors = validateInquiryPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO inquiries (name, company, email, phone, product_interest, quantity, destination_country, shipping_terms, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.body.name.trim(),
        req.body.company || null,
        req.body.email.trim(),
        req.body.phone || null,
        req.body.product_interest || null,
        req.body.quantity || null,
        req.body.destination_country || null,
        req.body.shipping_terms || null,
        req.body.message || null,
      ]
    );

    const [rows] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: 'product_interest does not match an existing product' });
    }
    next(err);
  }
};

// PATCH /api/inquiries/:id — update status (new/read/responded)
exports.update = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'id must be a positive integer' });
  }
  if (!STATUSES.includes(req.body.status)) {
    return res.status(400).json({ message: `status must be one of: ${STATUSES.join(', ')}` });
  }

  try {
    const [result] = await pool.query('UPDATE inquiries SET status = ? WHERE id = ?', [
      req.body.status,
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    const [rows] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};
