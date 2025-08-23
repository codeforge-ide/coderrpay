import { authMiddleware } from "@civic/auth-web3/nextjs/middleware";

const civicMiddleware = authMiddleware();

export default function middleware(request: any) {
  const isCivicEnabled = process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === 'true';
  
  if (!isCivicEnabled) {
    return;
  }
  
  return civicMiddleware(request);
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/wallet/:path*', 
    '/settings/:path*',
    '/messages/:path*',
    '/projects/:path*'
  ],
};