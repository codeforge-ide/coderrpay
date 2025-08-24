import { authMiddleware } from "@civic/auth/nextjs/middleware";

export default authMiddleware();

export const config = {
  // Only protect specific routes that require authentication
  matcher: [
    '/profile/:path*',
    '/wallet/:path*', 
    '/settings/:path*',
    '/messages/:path*',
  ],
};