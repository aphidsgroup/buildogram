function base64UrlToBytes(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - base64.length % 4) % 4), '=');
  return Uint8Array.from(atob(padded), char => char.charCodeAt(0));
}

export async function verifyTokenEdge(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret || !token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const parsedHeader = JSON.parse(new TextDecoder().decode(base64UrlToBytes(header)));
    if (parsedHeader.alg !== 'HS256') return null;

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlToBytes(signature),
      new TextEncoder().encode(`${header}.${payload}`),
    );
    if (!valid) return null;

    const claims = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload)));
    if (claims.exp && Date.now() / 1000 >= claims.exp) return null;
    return claims;
  } catch {
    return null;
  }
}
