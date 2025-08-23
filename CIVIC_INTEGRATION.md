# Civic Auth Integration

This project implements a modular authentication system that supports Civic Auth (for Web3 + GitHub authentication) and Appwrite (for traditional authentication), with seamless fallbacks.

## Features

### ✅ Completed Integration


- **Dual Authentication**: 
  - **Civic Enabled**: GitHub login via Civic + Web3 wallet creation
- **Unified User Management**: Civic users are synced to Appwrite for database/storage access
- **Custom JWT**: Civic authentication credentials are converted to Appwrite-compatible format

## Architecture

### Core Components

1. **`src/integrations/civic/`** - Complete Civic Auth integration
   - `components/` - CivicAuthButtons, WalletCard
   - `hooks/` - useCivicAuth hook
   - `providers/` - CivicAuthProvider wrapper
   - `types/` - TypeScript interfaces
   - `utils/` - Configuration helpers

2. **`src/integrations/appwrite/`** - Appwrite-Civic bridge
   - `civic-auth.ts` - Sync Civic users to Appwrite

3. **`src/integrations/fallback/`** - Fallback components
   - `FallbackAuthButtons.tsx` - Non-Civic auth options

4. **`src/integrations/IntegrationAuthButtons.tsx`** - Smart switcher component

### Authentication Flow

#### With Civic Enabled
1. User clicks "GitHub (Civic)" or "Web3 Wallet"
2. Civic handles authentication
3. User data is synced to Appwrite via custom auth
4. Unified user object stored in AuthContext
