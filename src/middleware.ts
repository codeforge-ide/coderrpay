// Civic middleware removed due to missing nextjs export in @civic/auth-web3

export default function middleware() {
  // No Civic middleware applied
  return;
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