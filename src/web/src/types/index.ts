export interface Account {
  id: number;
  accountNumber: string;
  accountHolder: string;
  balance: number;
  currency: string;
  createdAt: string;
}

export interface Transaction {
  id: number;
  accountId: number;
  type: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  referenceNumber: string | null;
}

export interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
  fromAccount: {
    id: number;
    accountNumber: string;
    balance: number;
  };
  toAccount: {
    id: number;
    accountNumber: string;
    balance: number;
  };
  referenceNumber: string;
}
