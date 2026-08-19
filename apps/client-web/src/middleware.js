/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - SECURE ROUTING MIDDLEWARE
 * ==============================================================================
 * This Next.js middleware runs on the Edge runtime before pages render.
 * It secures our private traveler folders (/account/) and administrator panels
 * (/admin/) by checking for our secure "access_token" session cookie.
 * If the cookie is missing, it safely redirects the traveler to the login page.
 */

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 1. Read our secure HttpOnly access token cookie
  const sessionToken = request.cookies.get("access_token")?.value;

  // 2. Define protected folders
  const isAccountPage = pathname.startsWith("/account");
  const isAdminPage = pathname.startsWith("/admin");

  // 3. Secure Redirect Locks
  if ((isAccountPage || isAdminPage) && !sessionToken) {
    // Traveler is trying to visit private zones without active login; redirect to login
    const loginUrl = new URL("/login", request.url);
    
    // Pass the original target URL as a query param so they return there after logging in
    loginUrl.searchParams.set("callbackUrl", pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  // Session is present or page is public (like homepage or destination search); proceed!
  return NextResponse.next();
}

// Configure exactly which routes this middleware intercepts
export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*"
  ]
};