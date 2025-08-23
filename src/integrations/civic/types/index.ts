export interface CivicUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  ethereum?: {
    address: string;
    wallet: any;
  };
}

export interface CivicAuthContextType {
  user: CivicUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  createWallet: () => Promise<void>;
  walletCreationInProgress: boolean;
}

export interface CivicConfig {
  clientId: string;
  enabled: boolean;
}