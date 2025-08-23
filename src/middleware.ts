import { authMiddleware } from "@civic/auth/nextjs/middleware";

export default authMiddleware();

export const config = {
  // Only protect specific routes that require authentication
  matcher: [
    '/profile/:path*',
    '/wallet/:path*', 
    '/settings/:path*',
    '/messages/:path*',
    '/projects/:path*',
    // Exclude public routes
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.gif|api|auth).*)',
  ],
};