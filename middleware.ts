import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login';
  
  // Get the token from cookies
  const token = request.cookies.get('auth-storage')?.value;
  let isAuthenticated = false;
  
  if (token) {
    try {
      // Parse the stored Zustand state
      const authState = JSON.parse(token);
      isAuthenticated = authState.state?.isAuthenticated || false;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  // Redirect logic
  if (isPublicPath && isAuthenticated) {
    // If user is logged in and tries to access login page, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicPath && !isAuthenticated) {
    // If user is not logged in and tries to access protected page, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure which routes should be processed by the middleware
export const config = {
  matcher: ['/dashboard/:path*', '/login']
};