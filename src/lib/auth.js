import jwt from 'jsonwebtoken';

let missingSecretLogged = false;

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret && !missingSecretLogged) {
    console.error('[auth] JWT_SECRET is not configured; authentication is disabled.');
    missingSecretLogged = true;
  }
  return secret || null;
}

export function verifyToken(token) {
  const secret = getSecret();
  if (!secret || !token) return null;
  try {
    return jwt.verify(token, secret, { algorithms: ['HS256'] });
  } catch { return null; }
}

export function getTokenFromRequest(request) {
  const cookie = request.cookies.get('buildogram_token');
  return cookie?.value || null;
}

export function getUserFromRequest(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

// Full JWT ops used in API routes only (Node.js runtime)
export async function signToken(payload) {
  const secret = getSecret();
  if (!secret) throw new Error('Authentication is not configured');
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '7d' });
}

export async function verifyTokenNode(token) {
  return verifyToken(token);
}
