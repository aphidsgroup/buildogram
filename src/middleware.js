import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('buildogram_token')?.value;
  const user = token ? verifyToken(token) : null;

  // Protected routes
  const protectedPrefixes = ['/client', '/ops', '/partner', '/api/client', '/api/ops', '/api/partner'];
  const isProtected = protectedPrefixes.some(p => pathname === p || pathname.startsWith(p + '/'));

  if (isProtected) {
    if (!user) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

  // Role guards
  if (pathname.startsWith('/api/ops') && !['ops_admin','ops_pm','ops_engineer'].includes(user.role)) {
    return NextResponse.json({ success: false, message: 'Forbidden: Ops role required' }, { status: 403 });
  }
  if (pathname.startsWith('/api/partner') && !['partner_contractor','partner_supplier', 'partner'].includes(user.role)) {
    return NextResponse.json({ success: false, message: 'Forbidden: Partner role required' }, { status: 403 });
  }
  if (pathname.startsWith('/api/client') && !['client'].includes(user.role)) {
    return NextResponse.json({ success: false, message: 'Forbidden: Client role required' }, { status: 403 });
  }

  if (pathname.startsWith('/ops') && !['ops_admin','ops_pm','ops_engineer'].includes(user.role)) {
    return NextResponse.redirect(new URL('/client/dashboard', request.url));
  }
  if (pathname.startsWith('/partner') && !['partner_contractor','partner_supplier', 'partner'].includes(user.role)) {
    return NextResponse.redirect(new URL('/client/dashboard', request.url));
  }
  if (pathname.startsWith('/client') && !['client'].includes(user.role)) {
    const dashMap = { ops_admin:'ops', ops_pm:'ops', ops_engineer:'ops', partner_contractor:'partner', partner_supplier:'partner', partner:'partner' };
    const prefix = dashMap[user.role] || 'client';
    return NextResponse.redirect(new URL(`/${prefix}/dashboard`, request.url));
  }
  } // <-- Added closing brace for if (isProtected)

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|fonts).*)'],
};
