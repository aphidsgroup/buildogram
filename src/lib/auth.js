import jwt from 'jsonwebtoken';

const JWT_ISSUER = 'buildogram';
const JWT_AUDIENCE = 'buildogram-web';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 characters.');
  }
  return secret;
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getJwtSecret(), {
      algorithms: ['HS256'],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
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
  return jwt.sign(payload, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: SESSION_MAX_AGE_SECONDS,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });
}

export async function verifyTokenNode(token) {
  return verifyToken(token);
}

export function setAuthCookie(response, token) {
  response.cookies.set('buildogram_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  });
  return response;
}

export function clearAuthCookie(response) {
  response.cookies.set('buildogram_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
