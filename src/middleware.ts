import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
  '/matches',
  '/messages',
  '/profile-wizard'
]

// Add paths that are only accessible to non-authenticated users
const authPaths = [
  '/login',
  '/register',
  '/reset-password'
]

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('firebase-auth-token')?.value
  const { pathname } = request.nextUrl

  // If no auth token and trying to access protected path
  if (!authToken && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If has auth token and trying to access auth paths (login, register, etc)
  if (authToken && authPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
