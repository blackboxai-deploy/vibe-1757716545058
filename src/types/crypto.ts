// TypeScript interfaces for SKV Global Crypto Platform

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
  image: string;
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  average_price: number;
  current_price: number;
  total_value: number;
  profit_loss: number;
  profit_loss_percentage: number;
  allocation_percentage: number;
  image: string;
}

export interface Portfolio {
  total_value: number;
  total_profit_loss: number;
  total_profit_loss_percentage: number;
  holdings: PortfolioHolding[];
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  name: string;
  amount: number;
  price: number;
  total: number;
  fee: number;
  status: 'completed' | 'pending' | 'cancelled';
  timestamp: string;
  image: string;
}

export interface WalletBalance {
  currency: string;
  symbol: string;
  balance: number;
  usd_value: number;
  image: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'buy' | 'sell';
  currency: string;
  amount: number;
  usd_value: number;
  to_from: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  fee?: number;
  transaction_hash: string;
}

export interface Wallet {
  total_balance_usd: number;
  balances: WalletBalance[];
  transactions: Transaction[];
}

export interface MarketData {
  total_market_cap: number;
  total_volume: number;
  bitcoin_dominance: number;
  ethereum_dominance: number;
  active_cryptocurrencies: number;
  market_cap_change_percentage_24h: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
  source: string;
  published_at: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface PriceHistoryPoint {
  timestamp: number;
  price: number;
  volume?: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  verified: boolean;
  created_at: string;
}

export interface TradingPair {
  base: string;
  quote: string;
  symbol: string;
  current_price: number;
  volume_24h: number;
  change_24h: number;
}

export interface Alert {
  id: string;
  type: 'price' | 'volume' | 'news';
  message: string;
  timestamp: string;
  read: boolean;
  severity: 'info' | 'warning' | 'error' | 'success';
}