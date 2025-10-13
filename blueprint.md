# CoderrPay Blueprint

## Purpose and Capabilities

CoderrPay is a comprehensive platform that connects developers, projects, and organizations to collaborate, solve bounties, and get rewarded. The application emphasizes seamless authentication, Web3 integration, and frictionless micropayments using sBTC through Turnkey's embedded wallet solution.

## Current Implementation

### Core Features
- **Multi-provider Authentication**: Civic (GitHub + Web3), Appwrite, and fallback Web3 wallet integration
- **Dashboard**: Overview of earnings, sponsorships, and hackathon participation with activity timeline
- **Bounties System**: Browse and solve development bounties
- **Projects Management**: Create and manage open-source projects
- **Organizations**: Team collaboration features
- **Grants & Hackathons**: Discover funding opportunities and competitions
- **Profile Management**: User profiles with social connections
- **Messaging**: In-app communication system

### Design & Styling
- Modern Material-UI (MUI) design system with custom theming
- Responsive layout with desktop sidebar and mobile bottom navigation
- Clean spacing and typography hierarchy
- Card-based interface with subtle shadows and gradients
- Dark/Light theme support with custom color palette
- Skeleton loading states for smooth UX

### Technical Stack
- **Framework**: Next.js 15.4.6 with App Router and React 19
- **UI**: Material-UI v7 with Emotion styling
- **State Management**: Zustand for global state
- **Authentication**: Civic Auth, Appwrite, custom Web3
- **TypeScript**: Full type safety across the application

## Current Change: Turnkey sBTC Monetization Integration

### Overview
Implementing a practical monetization solution using Turnkey's embedded wallet SDK for sBTC micropayments on the Stacks testnet. This enables users to instantly support open-source developers with a Web2-like payment experience.

### Implementation Plan

#### Phase 1: Dependencies & SDK Setup
1. Install Turnkey SDK packages (@turnkey/sdk-browser, @turnkey/sdk-server, @stacks/transactions)
2. Add environment variables for Turnkey configuration
3. Create Turnkey integration structure in `/src/integrations/turnkey`

#### Phase 2: Wallet Infrastructure
1. Create TurnkeyProvider for embedded wallet management
2. Implement wallet creation with passkey/biometric authentication
3. Add Stacks address derivation from Turnkey-managed keys
4. Build wallet UI components (balance display, address management)

#### Phase 3: sBTC Transaction Flow
1. Create server actions for sBTC transaction construction
2. Implement transaction signing via Turnkey SDK
3. Add transaction broadcasting to Stacks testnet
4. Build transaction status tracking and confirmation

#### Phase 4: Developer Support Interface
1. Create developer profile pages with "Support with sBTC" button
2. Add suggested tip amounts (0.01, 0.05, 0.1 sBTC) with custom input
3. Implement transaction confirmation modal with human-readable details
4. Add success/failure feedback with block explorer links

#### Phase 5: Integration & Polish
1. Update wallet page with Turnkey integration
2. Add sBTC balance display and transaction history
3. Integrate with existing dashboard metrics
4. Add real-time transaction notifications
5. Update README with Turnkey setup instructions

### Key Requirements
- **FR-01**: Turnkey Embedded Wallet SDK for wallet management and transaction signing
- **FR-02**: Valid sBTC transfer transactions on Stacks testnet
- **FR-03**: Seamless in-app flow without external redirects
- **FR-04**: Real-time UI feedback for all transaction states
- **FR-05**: Human-readable interface with developer names (no raw addresses)
- **FR-06**: Transaction proof via Stacks block explorer links

### Technical Considerations
- Stacks address derivation from Turnkey's secp256k1 keys
- Testnet-only operation for safety
- Passkey authentication for frictionless UX
- Error handling and recovery flows
- Transaction fee estimation and display
