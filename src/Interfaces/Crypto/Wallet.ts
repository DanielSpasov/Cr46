export interface Cryptocurrency {
  symbol: string;
  name: string;
  balance: number;
}

export interface Wallet {
  userID: string;
  daily: Date;
  balance: number;
  crypto: Cryptocurrency[];
}
