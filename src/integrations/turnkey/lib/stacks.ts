import { publicKeyToAddress } from '@stacks/transactions';

/**
 * Derives a Stacks address from a secp256k1 public key
 */
export function deriveStacksAddress(publicKey: string): string {
  try {
    // Remove '0x' prefix if present
    const cleanPubKey = publicKey.startsWith('0x') ? publicKey.slice(2) : publicKey;
    
    // Convert to Buffer
    const pubKeyBuffer = Buffer.from(cleanPubKey, 'hex');
    
    // Derive Stacks address
    const address = publicKeyToAddress(pubKeyBuffer);
    return address;
  } catch (error) {
    console.error('Error deriving Stacks address:', error);
    throw new Error('Failed to derive Stacks address from public key');
  }
}

/**
 * Formats a Stacks address for display (shortened)
 */
export function formatAddress(address: string, chars: number = 6): string {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Gets the block explorer URL for a transaction
 */
export function getBlockExplorerUrl(txId: string): string {
  return `https://explorer.hiro.so/txid/${txId}?chain=testnet`;
}

/**
 * Validates a Stacks address
 */
export function isValidStacksAddress(address: string): boolean {
  // Stacks testnet addresses start with ST
  // Stacks mainnet addresses start with SP
  return /^S[TP][A-Z0-9]{38,40}$/.test(address);
}

/**
 * Formats sBTC amount for display
 */
export function formatSbtcAmount(amount: number): string {
  return amount.toFixed(8);
}

/**
 * Converts sBTC to microBTC (1 BTC = 1,000,000 microBTC)
 */
export function sbtcToMicroBtc(amount: number): number {
  return Math.floor(amount * 1_000_000);
}

/**
 * Converts microBTC to sBTC
 */
export function microBtcToSbtc(microBtc: number): number {
  return microBtc / 1_000_000;
}
