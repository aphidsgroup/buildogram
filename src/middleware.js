import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request) {
  const tokenCookie = request.cookies.get('buildogram_token');
  const token = tokenCookie?.value;
  let user = null;
  if (token) {
    user = verifyToken(token);
  }

  const { pathname } = request.nextUrl;
  
  const response = NextResponse.next();
  // Phase 7: Security Headers / Noindex
  if (pathname.startsWith('/ops') || pathname.startsWith('/partner') || pathname.startsWith('/client') || pathname.startsWith('/project/') || pathname.startsWith('/property-passport/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // Phase 3: Route Protection
  if (pathname.startsWith('/ops')) {
    if (!user) return NextResponse.redirect(new URL('/login', request.url));
    if (!user.role?.startsWith('ops_') && user.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (pathname.startsWith('/ops/finance') && !['super_admin', 'ops_admin', 'ops_finance'].includes(user.role)) {
      return NextResponse.redirect(new URL('/ops/dashboard', request.url));
    }
    if (pathname.startsWith('/ops/projects') && !['super_admin', 'ops_admin', 'ops_pm', 'ops_engineer'].includes(user.role)) {
      return NextResponse.redirect(new URL('/ops/dashboard', request.url));
    }
    if (pathname.startsWith('/ops/property-passports') && !['super_admin', 'ops_admin', 'ops_pm', 'ops_engineer'].includes(user.role)) {
      return NextResponse.redirect(new URL('/ops/dashboard', request.url));
    }
    if (pathname.startsWith('/ops/bqs') && !['super_admin', 'ops_admin', 'ops_engineer'].includes(user.role)) {
      return NextResponse.redirect(new URL('/ops/dashboard', request.url));
    }
    if (pathname.startsWith('/ops/content-calendar') && !['super_admin', 'ops_admin', 'ops_content'].includes(user.role)) {
      return NextResponse.redirect(new URL('/ops/dashboard', request.url));
    }
    if (pathname.startsWith('/ops/audit-logs') && !['super_admin', 'ops_admin'].includes(user.role)) {
      return NextResponse.redirect(new URL('/ops/dashboard', request.url));
    }
  }

  if (pathname.startsWith('/partner')) {
    if (!user) return NextResponse.redirect(new URL('/login', request.url));
    // Partners only
    if (!['partner_admin', 'partner_user'].includes(user.role) && !user.role?.startsWith('ops_') && user.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname.startsWith('/client')) {
    if (!user) return NextResponse.redirect(new URL('/login', request.url));
    if (user.role !== 'client_user' && !user.role?.startsWith('ops_') && user.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/ops/:path*', '/partner/:path*', '/client/:path*', '/project/:path*', '/property-passport/:path*'],
};
