export interface Cryptocurrency {
  symbol: string;
  name: string;
  balance: number;
}

export interface Wallet {
  balance: number;
  crypto: Cryptocurrency[];
}

export interface GuildUser {
  id: string;
  wallet: Wallet;
}

export interface Guild {
  id: string;
  name: string;
  validChannels: string[];
  users: GuildUser[];
}
