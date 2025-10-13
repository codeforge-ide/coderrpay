'use client';

import { useState } from 'react';
import { useTurnkey } from '../providers/TurnkeyProvider';
import { TransactionRequest, TransactionStatus } from '../types';
import { sbtcToMicroBtc, getBlockExplorerUrl } from '../lib/stacks';

interface UseTransactionResult {
  status: TransactionStatus;
  txId: string | null;
  error: string | null;
  sendSbtc: (request: TransactionRequest) => Promise<void>;
  reset: () => void;
}

export function useTransaction(): UseTransactionResult {
  const { wallet, signTransaction } = useTurnkey();
  const [status, setStatus] = useState<TransactionStatus>('idle');
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendSbtc = async (request: TransactionRequest) => {
    if (!wallet) {
      setError('No wallet connected');
      setStatus('error');
      return;
    }

    try {
      setStatus('confirming');
      setError(null);
      setTxId(null);

      // Validate recipient address
      if (!request.recipientAddress) {
        throw new Error('Recipient address is required');
      }

      // Convert amount to microBTC
      const amountMicroBtc = sbtcToMicroBtc(request.amount);

      // In production, construct actual Stacks transaction
      // For demo, simulate the transaction flow
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock transaction hex (in production, use @stacks/transactions to build)
      const mockTxHex = '0x' + Array.from({ length: 200 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      setStatus('signing');
      
      // Sign transaction with Turnkey
      await signTransaction(mockTxHex);

      setStatus('broadcasting');
      
      // Broadcast to Stacks testnet (in production, use actual broadcast)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock transaction ID
      const mockTxId = '0x' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      setTxId(mockTxId);
      setStatus('success');

      // Store transaction in localStorage for history
      const tx = {
        id: mockTxId,
        from: wallet.stacksAddress,
        to: request.recipientAddress,
        amount: request.amount,
        fee: 0.0001, // Mock fee
        status: 'pending' as const,
        timestamp: Date.now(),
        blockExplorerUrl: getBlockExplorerUrl(mockTxId),
      };

      const history = JSON.parse(localStorage.getItem('tx_history') || '[]');
      history.unshift(tx);
      localStorage.setItem('tx_history', JSON.stringify(history.slice(0, 50))); // Keep last 50

    } catch (err) {
      console.error('Transaction failed:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setTxId(null);
    setError(null);
  };

  return {
    status,
    txId,
    error,
    sendSbtc,
    reset,
  };
}
