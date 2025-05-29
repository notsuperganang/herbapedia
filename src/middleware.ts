// src/middleware.ts
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Izinkan request ke halaman login tanpa pengecekan token
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Jika mencoba mengakses /admin/* DAN (tidak ada token ATAU role bukan admin)
    if (pathname.startsWith('/admin') && (token?.role !== 'admin')) {
      // Redirect ke halaman login jika tidak terautentikasi atau bukan admin
      // Jika sudah login tapi bukan admin, bisa redirect ke halaman "unauthorized" atau halaman utama
      const signInUrl = new URL('/admin/login', req.url);
      signInUrl.searchParams.set('callbackUrl', req.url); // Simpan callbackUrl
      if (token && token.role !== 'admin') {
        signInUrl.searchParams.set('error', 'AccessDenied');
      }
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Cukup periksa apakah token ada. Pengecekan role dilakukan di atas.
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login', // Ini tetap penting sebagai fallback
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};