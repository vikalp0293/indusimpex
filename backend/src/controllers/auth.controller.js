// Stub controller — simple email/password auth for the admin panel, JWT-based.

exports.login = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: admin login' });
};

exports.me = async (req, res) => {
  res.status(501).json({ message: 'Not implemented: current admin user' });
};
