export interface TurnkeyWallet {
  address: string;
  stacksAddress: string;
  publicKey: string;
  walletId: string;
}

export interface TurnkeyUser {
  userId: string;
  organizationId: string;
  wallet?: TurnkeyWallet;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  txId?: string;
  blockExplorerUrl?: string;
}

export interface TransactionRequest {
  recipientAddress: string;
  amount: number;
  recipientName?: string;
}

export type TransactionStatus = 'idle' | 'confirming' | 'signing' | 'broadcasting' | 'success' | 'error';
