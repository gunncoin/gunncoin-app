export interface TransactionResponse {
  successful: boolean;
  message: string;
}

export interface BalanceResponse {
  balance: number;
}

export type TransactionHistoryResponse = Array<Transaction>;

export interface Transaction {
  timestamp: number;
  sender: string;
  receiver: string;
  amount: number;
  signature: string;
}
