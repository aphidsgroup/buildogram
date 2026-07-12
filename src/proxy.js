import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function proxy(request) {
  const token = request.cookies.get('buildogram_token')?.value;
  const user = token ? verifyToken(token) : null;
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');

  if (pathname.startsWith('/api/')) {
    const isMutation = !['GET', 'HEAD', 'OPTIONS'].includes(request.method);
    if (isMutation && token) {
      const origin = request.headers.get('origin');
      const requestOrigin = request.nextUrl.origin;
      let configuredOrigin = null;
      try { configuredOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL).origin; } catch {}
      if (!origin || (origin !== requestOrigin && origin !== configuredOrigin)) {
        return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
      }
    }
    return response;
  }

  if (!user) return NextResponse.redirect(new URL('/login', request.url));

  if (pathname.startsWith('/ops')) {
    if (!user.role?.startsWith('ops_') && user.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const scopedRoutes = [
      ['/ops/finance', ['super_admin', 'ops_admin', 'ops_finance']],
      ['/ops/projects', ['super_admin', 'ops_admin', 'ops_pm', 'ops_engineer']],
      ['/ops/property-passports', ['super_admin', 'ops_admin', 'ops_pm', 'ops_engineer']],
      ['/ops/bqs', ['super_admin', 'ops_admin', 'ops_engineer']],
      ['/ops/content-calendar', ['super_admin', 'ops_admin', 'ops_content']],
      ['/ops/audit-logs', ['super_admin', 'ops_admin']],
    ];
    const restriction = scopedRoutes.find(([prefix]) => pathname.startsWith(prefix));
    if (restriction && !restriction[1].includes(user.role)) {
      return NextResponse.redirect(new URL('/ops/dashboard', request.url));
    }
  }

  if (pathname.startsWith('/admin')) {
    const allowed = user.role === 'super_admin' || user.role?.startsWith('ops_');
    if (!allowed) return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/partner')) {
    const allowed = ['partner_admin', 'partner_user'].includes(user.role) ||
      user.role?.startsWith('ops_') || user.role === 'super_admin';
    if (!allowed) return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/client')) {
    const allowed = user.role === 'client_user' || user.role?.startsWith('ops_') || user.role === 'super_admin';
    if (!allowed) return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/supplier')) {
    const allowed = ['supplier_admin', 'supplier_user'].includes(user.role) ||
      user.role?.startsWith('ops_') || user.role === 'super_admin';
    if (!allowed) return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/ops/:path*',
    '/admin/:path*',
    '/partner/:path*',
    '/client/:path*',
    '/supplier/:path*',
    '/project/:path*',
    '/property-passport/:path*',
    '/api/:path*',
  ],
};
