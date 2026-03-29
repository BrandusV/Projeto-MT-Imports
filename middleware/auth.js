const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mpimports-secret-2024';

/**
 * Extracts and verifies a JWT token from:
 * 1. Authorization header: "Bearer <token>"
 * 2. req.session.token (fallback)
 *
 * Returns the decoded payload or null.
 */
function extractUser(req) {
  let token = null;

  // Try Authorization header first
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }

  // Fall back to session token
  if (!token && req.session && req.session.token) {
    token = req.session.token;
  }

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}

/**
 * requireAuth middleware
 * Returns 401 if the request does not carry a valid token.
 */
function requireAuth(req, res, next) {
  const user = extractUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Autenticação necessária. Faça login para continuar.' });
  }
  req.user = user;
  next();
}

/**
 * optionalAuth middleware
 * Attaches req.user if a valid token is present; always calls next().
 */
function optionalAuth(req, res, next) {
  const user = extractUser(req);
  req.user = user || null;
  next();
}

module.exports = { requireAuth, optionalAuth, JWT_SECRET };
