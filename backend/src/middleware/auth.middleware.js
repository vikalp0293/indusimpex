// Verifies the admin JWT on protected routes. Wire into routes once auth.controller
// issues real tokens.

module.exports = function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  // TODO: verify JWT with jsonwebtoken and process.env.JWT_SECRET, attach req.user
  next();
};
