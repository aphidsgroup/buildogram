// Edge-compatible JWT auth (used by middleware)
// For API routes, use the full 'jsonwebtoken' via verifyTokenNode

const SECRET = process.env.JWT_SECRET || 'buildogram_super_secret_jwt_key_2024_chennai_caas_platform';

function base64UrlDecode(str) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
  return atob(padded);
}

export function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
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
  const { default: jwt } = await import('jsonwebtoken');
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export async function verifyTokenNode(token) {
  try {
    const { default: jwt } = await import('jsonwebtoken');
    return jwt.verify(token, SECRET);
  } catch { return null; }
}
