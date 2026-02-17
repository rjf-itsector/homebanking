import type { Account, Transaction, TransferRequest, TransferResponse } from '@/types';

const API_BASE_URL = '/api';

export const api = {
  async getAccounts(): Promise<Account[]> {
    const response = await fetch(`${API_BASE_URL}/accounts`);
    if (!response.ok) throw new Error('Failed to fetch accounts');
    return response.json();
  },

  async getAccount(id: number): Promise<Account> {
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch account');
    return response.json();
  },

  async getTransactions(accountId?: number): Promise<Transaction[]> {
    const url = accountId 
      ? `${API_BASE_URL}/transactions?accountId=${accountId}`
      : `${API_BASE_URL}/transactions`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  async transfer(request: TransferRequest): Promise<TransferResponse> {
    const response = await fetch(`${API_BASE_URL}/transactions/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Transfer failed');
    }
    
    return data;
  },
};
