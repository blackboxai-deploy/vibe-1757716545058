// Mock API functions for SKV Global Crypto Platform
import { 
  CryptoCurrency, 
  Portfolio, 
  Trade, 
  Wallet, 
  MarketData, 
  NewsArticle, 
  PriceHistoryPoint, 
  OrderBook,
  TradingPair
} from '@/types/crypto';

// Mock cryptocurrency data
const mockCryptos: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    current_price: 43250.00,
    market_cap: 847500000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 908250000000,
    total_volume: 25400000000,
    high_24h: 43890.00,
    low_24h: 42100.00,
    price_change_24h: 1150.00,
    price_change_percentage_24h: 2.73,
    price_change_percentage_7d: 5.42,
    price_change_percentage_30d: 8.91,
    market_cap_change_24h: 23150000000,
    market_cap_change_percentage_24h: 2.81,
    circulating_supply: 19600000,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045.00,
    ath_change_percentage: -37.36,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: 67.81,
    atl_change_percentage: 63651.52,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2024-01-15T10:30:00.000Z',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a44c6ae1-1b97-4cf2-bd32-33485af96036.png'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    current_price: 2650.00,
    market_cap: 318500000000,
    market_cap_rank: 2,
    fully_diluted_valuation: 318500000000,
    total_volume: 15200000000,
    high_24h: 2720.00,
    low_24h: 2580.00,
    price_change_24h: 70.00,
    price_change_percentage_24h: 2.71,
    price_change_percentage_7d: 4.82,
    price_change_percentage_30d: 12.45,
    market_cap_change_24h: 8400000000,
    market_cap_change_percentage_24h: 2.71,
    circulating_supply: 120200000,
    total_supply: 120200000,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -45.67,
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: 0.43,
    atl_change_percentage: 615016.28,
    atl_date: '2015-10-20T00:00:00.000Z',
    roi: {
      times: 82.42,
      currency: 'usd',
      percentage: 8242.0
    },
    last_updated: '2024-01-15T10:30:00.000Z',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/da6fd692-cdc5-442b-996b-7fc47a0fbfb2.png'
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    current_price: 315.50,
    market_cap: 47200000000,
    market_cap_rank: 3,
    fully_diluted_valuation: 47200000000,
    total_volume: 890000000,
    high_24h: 322.10,
    low_24h: 308.70,
    price_change_24h: 6.80,
    price_change_percentage_24h: 2.20,
    price_change_percentage_7d: 3.15,
    price_change_percentage_30d: 7.83,
    market_cap_change_24h: 1020000000,
    market_cap_change_percentage_24h: 2.20,
    circulating_supply: 149500000,
    total_supply: 149500000,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -54.02,
    ath_date: '2021-05-10T07:24:17.097Z',
    atl: 0.0398,
    atl_change_percentage: 792851.26,
    atl_date: '2017-10-19T00:00:00.000Z',
    roi: null,
    last_updated: '2024-01-15T10:30:00.000Z',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ce8b43de-22b4-473b-bd05-b4ab35c005fb.png'
  }
];

// API Functions
export async function fetchCryptoList(): Promise<CryptoCurrency[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockCryptos;
}

export async function fetchCryptoById(id: string): Promise<CryptoCurrency | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCryptos.find(crypto => crypto.id === id) || null;
}

export async function fetchMarketData(): Promise<MarketData> {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    total_market_cap: 1680000000000,
    total_volume: 52800000000,
    bitcoin_dominance: 50.4,
    ethereum_dominance: 19.0,
    active_cryptocurrencies: 2847,
    market_cap_change_percentage_24h: 2.34
  };
}

export async function fetchPortfolio(): Promise<Portfolio> {
  await new Promise(resolve => setTimeout(resolve, 600));
  return {
    total_value: 125500.00,
    total_profit_loss: 8750.00,
    total_profit_loss_percentage: 7.49,
    holdings: [
      {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 1.5,
        average_price: 38500.00,
        current_price: 43250.00,
        total_value: 64875.00,
        profit_loss: 7125.00,
        profit_loss_percentage: 12.34,
        allocation_percentage: 51.7,
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/029f667d-9226-4495-922e-73a0badd4f64.png'
      },
      {
        id: 'ethereum',
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 15.0,
        average_price: 2400.00,
        current_price: 2650.00,
        total_value: 39750.00,
        profit_loss: 3750.00,
        profit_loss_percentage: 10.42,
        allocation_percentage: 31.7,
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/53855c55-5a27-4ffb-abca-fe2415ae8a50.png'
      },
      {
        id: 'binancecoin',
        symbol: 'BNB',
        name: 'BNB',
        amount: 65.0,
        average_price: 290.00,
        current_price: 315.50,
        total_value: 20507.50,
        profit_loss: 1657.50,
        profit_loss_percentage: 8.80,
        allocation_percentage: 16.3,
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ede8aa44-61f5-455a-a026-ff354432be5c.png'
      }
    ]
  };
}

export async function fetchWallet(): Promise<Wallet> {
  await new Promise(resolve => setTimeout(resolve, 700));
  return {
    total_balance_usd: 142750.00,
    balances: [
      {
        currency: 'Bitcoin',
        symbol: 'BTC',
        balance: 1.75,
        usd_value: 75687.50,
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a7a391d1-26f3-469b-b640-22eeeaa31eef.png'
      },
      {
        currency: 'Ethereum',
        symbol: 'ETH',
        balance: 18.5,
        usd_value: 49025.00,
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6f63ef8e-4ee4-4483-98d3-0d211fe80f30.png'
      },
      {
        currency: 'USD Coin',
        symbol: 'USDC',
        balance: 18037.50,
        usd_value: 18037.50,
        image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7fdb8621-28fa-4d23-ab71-938a45704e04.png'
      }
    ],
    transactions: [
      {
        id: 'tx_001',
        type: 'receive',
        currency: 'BTC',
        amount: 0.25,
        usd_value: 10812.50,
        to_from: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        status: 'completed',
        timestamp: '2024-01-15T08:30:00.000Z',
        fee: 0.0001,
        transaction_hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      },
      {
        id: 'tx_002',
        type: 'send',
        currency: 'ETH',
        amount: 2.0,
        usd_value: 5300.00,
        to_from: '0x742d35Cc6634C0532925a3b8D7389B2F7ac37b18',
        status: 'completed',
        timestamp: '2024-01-14T15:45:00.000Z',
        fee: 0.005,
        transaction_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
      }
    ]
  };
}

export async function fetchTrades(): Promise<Trade[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: 'trade_001',
      type: 'buy',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      price: 42800.00,
      total: 21400.00,
      fee: 21.40,
      status: 'completed',
      timestamp: '2024-01-15T09:15:00.000Z',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3cbd37de-e017-4268-927f-f2a554d70c85.png'
    },
    {
      id: 'trade_002',
      type: 'sell',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 3.0,
      price: 2620.00,
      total: 7860.00,
      fee: 7.86,
      status: 'completed',
      timestamp: '2024-01-14T14:20:00.000Z',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9e77fbd9-03a5-40fd-9e4e-2ce43f811711.png'
    }
  ];
}

export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  await new Promise(resolve => setTimeout(resolve, 900));
  return [
    {
      id: 'news_001',
      title: 'Bitcoin Reaches New Monthly High Amid Institutional Interest',
      summary: 'Bitcoin prices surge as major institutions continue to show growing interest in cryptocurrency investments, pushing BTC above $43,000.',
      url: '#',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7351965d-8407-4b5a-8b12-4060d57dae11.png',
      source: 'Crypto News Today',
      published_at: '2024-01-15T10:00:00.000Z',
      sentiment: 'positive'
    },
    {
      id: 'news_002',
      title: 'Ethereum Layer 2 Solutions Show Record Transaction Volume',
      summary: 'Layer 2 scaling solutions for Ethereum demonstrate unprecedented growth in transaction volume, indicating broader adoption of DeFi protocols.',
      url: '#',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aecdddd3-a0d1-433a-8e94-673482169846.png',
      source: 'Blockchain Tribune',
      published_at: '2024-01-15T08:30:00.000Z',
      sentiment: 'positive'
    },
    {
      id: 'news_003',
      title: 'Regulatory Updates Impact Global Cryptocurrency Markets',
      summary: 'New regulatory frameworks being discussed in major economies are creating both opportunities and challenges for the cryptocurrency sector.',
      url: '#',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/40a8853c-c24f-4686-a188-c219ac27727e.png',
      source: 'Financial Crypto Report',
      published_at: '2024-01-14T16:45:00.000Z',
      sentiment: 'neutral'
    }
  ];
}

export async function fetchPriceHistory(symbol: string, days: number = 7): Promise<PriceHistoryPoint[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const basePrice = mockCryptos.find(c => c.symbol === symbol)?.current_price || 40000;
  const points: PriceHistoryPoint[] = [];
  
  for (let i = days; i >= 0; i--) {
    const timestamp = Date.now() - (i * 24 * 60 * 60 * 1000);
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const price = basePrice * (1 + variation);
    points.push({
      timestamp,
      price: Math.round(price * 100) / 100
    });
  }
  
  return points;
}

export async function fetchOrderBook(symbol: string): Promise<OrderBook> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const basePrice = mockCryptos.find(c => c.symbol === symbol)?.current_price || 40000;
  
  const bids = [];
  const asks = [];
  
  // Generate realistic bid orders (below current price)
  for (let i = 0; i < 10; i++) {
    const price = basePrice - (i + 1) * (basePrice * 0.001);
    const amount = Math.random() * 2;
    bids.push({
      price: Math.round(price * 100) / 100,
      amount: Math.round(amount * 1000) / 1000,
      total: Math.round(price * amount * 100) / 100
    });
  }
  
  // Generate realistic ask orders (above current price)
  for (let i = 0; i < 10; i++) {
    const price = basePrice + (i + 1) * (basePrice * 0.001);
    const amount = Math.random() * 2;
    asks.push({
      price: Math.round(price * 100) / 100,
      amount: Math.round(amount * 1000) / 1000,
      total: Math.round(price * amount * 100) / 100
    });
  }
  
  return { bids, asks };
}

export async function fetchTradingPairs(): Promise<TradingPair[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [
    {
      base: 'BTC',
      quote: 'USD',
      symbol: 'BTCUSD',
      current_price: 43250.00,
      volume_24h: 25400000000,
      change_24h: 2.73
    },
    {
      base: 'ETH',
      quote: 'USD',
      symbol: 'ETHUSD',
      current_price: 2650.00,
      volume_24h: 15200000000,
      change_24h: 2.71
    },
    {
      base: 'BNB',
      quote: 'USD',
      symbol: 'BNBUSD',
      current_price: 315.50,
      volume_24h: 890000000,
      change_24h: 2.20
    }
  ];
}