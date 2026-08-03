// One-time script to create (or reset the password of) an initial admin user.
//
// Usage:
//   node src/scripts/seedAdmin.js <email> <password>
// or set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in the environment / .env.

require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function main() {
  const email = process.argv[2] || process.env.SEED_ADMIN_EMAIL;
  const password = process.argv[3] || process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      'Usage: node src/scripts/seedAdmin.js <email> <password>\n' +
        '(or set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in the environment)'
    );
    process.exitCode = 1;
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [email.trim(), passwordHash]
  );

  console.log(`Admin user ready: ${email}`);
}

main()
  .catch((err) => {
    console.error('Failed to seed admin user:', err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
