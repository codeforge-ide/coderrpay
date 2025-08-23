export const isCivicEnabled = () => {
  return process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === 'true';
};

export const getCivicClientId = () => {
  return process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || '92eca93c-c1eb-4c51-a3d4-794a37815095';
};

export const getWeb3WalletUrl = () => {
  return process.env.NEXT_PUBLIC_WEB3_WALLET_URL || 'https://wallet.web3lancer.website';
};