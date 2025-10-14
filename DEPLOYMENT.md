# CoderrPay Deployment Guide

## Build Status ✅

The application has been successfully built and is ready for deployment!

```
✓ Production build completed successfully
✓ All 21 routes generated
✓ Zero build errors
✓ Code quality checks passed
✓ TypeScript compilation successful
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `env.sample` to `.env` and configure the required variables:

```bash
cp env.sample .env
```

**Required Variables:**
- `NEXT_PUBLIC_APPWRITE_ENDPOINT` - Your Appwrite endpoint
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID` - Your Appwrite project ID
- `CIVIC_CLIENT_ID` - Your Civic Auth client ID
- `CIVIC_CLIENT_SECRET` - Your Civic Auth client secret
- `CIVIC_REDIRECT_URI` - Your OAuth redirect URI

**Turnkey Variables (for production sBTC):**
- `NEXT_PUBLIC_TURNKEY_API_URL` - Turnkey API endpoint
- `NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID` - Your Turnkey organization ID
- `NEXT_PUBLIC_STACKS_NETWORK` - `testnet` or `mainnet`
- `NEXT_PUBLIC_STACKS_API_URL` - Stacks blockchain API URL

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Development Mode

For development with hot-reload:
```bash
npm run dev
```

## Turnkey Integration Setup

### Demo Mode (Current)
The application currently runs in demo mode with:
- Mock wallet creation
- Simulated transaction signing
- LocalStorage for transaction history
- Sample developer profiles

### Production Mode
To enable live sBTC transactions:

1. **Get Turnkey Credentials**
   - Sign up at [Turnkey.com](https://turnkey.com)
   - Create an organization
   - Get API credentials

2. **Configure Stacks Network**
   - For testing: Use Stacks testnet
   - Get testnet sBTC from faucet
   - Configure API endpoints

3. **Update Integration Code**
   - Remove mock data in `/src/integrations/turnkey/providers/TurnkeyProvider.tsx`
   - Implement real Turnkey SDK calls in `createWallet()`
   - Update transaction signing in `/src/integrations/turnkey/hooks/useTransaction.ts`
   - Connect to Stacks API for balance queries

4. **Test Flow**
   - Create wallet with passkey
   - Fund with testnet sBTC
   - Test micropayment to developer
   - Verify transaction on block explorer

## Deployment Options

### Vercel (Recommended)
```bash
vercel
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Docker
```bash
docker build -t coderrpay .
docker run -p 3000:3000 coderrpay
```

### Other Platforms
The application is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting platform

## Feature Flags

The application includes several authentication methods:
- **Civic Auth**: GitHub OAuth + Web3 wallet
- **Appwrite**: Email/password authentication
- **Fallback Web3**: Direct wallet connection

Enable/disable in your environment configuration.

## Performance Optimization

The build includes:
- **Static Generation**: 21 pre-rendered routes
- **Code Splitting**: Automatic route-based chunking
- **Tree Shaking**: Removed unused code
- **Minification**: Production-optimized bundles

**Bundle Sizes:**
- Shared: 100 kB
- Average page: 133-169 kB
- Support page: 229 kB (includes Turnkey SDK)
- Wallet page: 233 kB (includes transaction UI)

## Testing Checklist

Before going live:
- [ ] Test wallet creation flow
- [ ] Verify authentication methods
- [ ] Test sBTC transaction on testnet
- [ ] Check mobile responsiveness
- [ ] Verify block explorer links
- [ ] Test error handling
- [ ] Check loading states
- [ ] Validate transaction history
- [ ] Test across browsers
- [ ] Performance audit with Lighthouse

## Support & Documentation

- **Blueprint**: See `blueprint.md` for complete implementation details
- **PRD**: See `prd/prd_stack.md` for product requirements
- **Turnkey Guide**: See `TURNKEY_INTEGRATION.md` for integration details
- **Civic Guide**: See `CIVIC_INTEGRATION.md` for OAuth setup

## Troubleshooting

### Build Errors
- Clear `.next` folder and rebuild
- Delete `node_modules` and reinstall
- Check Node.js version (v18+ recommended)

### Authentication Issues
- Verify environment variables
- Check OAuth redirect URIs
- Confirm API credentials

### Turnkey Integration
- Ensure testnet configuration
- Verify API endpoints
- Check passkey support in browser

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please read CONTRIBUTING.md for guidelines.

---

**Ready for the Stacks Builders Challenge! 🚀**
