// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, search } = req.nextUrl;

  // If the user is logged in and tries to access the login page, redirect to the dashboard
  if (pathname.startsWith("/login") && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = ""; // Avoid bringing the login query
    return NextResponse.redirect(url);
  }

  // Protected routes: If the user is not logged in, redirect to the login page
  const protectedPrefixes = ["/dashboard", "/onboarding"];
  if (protectedPrefixes.some(p => pathname.startsWith(p)) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = search; // Keep the original query
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/onboarding/:path*"],
};
