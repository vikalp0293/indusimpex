const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

// POST /api/auth/login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM admin_users WHERE email = ?', [email.trim()]);
    const user = rows[0];

    // Compare against a dummy hash when no user is found so login timing
    // doesn't reveal whether an email exists.
    const passwordHash = user ? user.password_hash : '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva';
    const passwordMatches = await bcrypt.compare(password, passwordHash);

    if (!user || !passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me — requires requireAuth
exports.me = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, created_at FROM admin_users WHERE id = ?',
      [req.user.id]
    );
    const user = rows[0];
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
