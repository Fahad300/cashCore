import { generateCandleData } from './mockMarketData';

export interface TradingPair {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    price: number;
    change24h: number;
    volume24h: number;
    high24h: number;
    low24h: number;
    candleData: any[];
}

export const tradingPairs: TradingPair[] = [
    {
        symbol: 'BTC/USDT',
        baseAsset: 'BTC',
        quoteAsset: 'USDT',
        price: 45123.45,
        change24h: 2.34,
        volume24h: 28945678901,
        high24h: 46000.00,
        low24h: 44500.00,
        candleData: generateCandleData(45123.45),
    },
    {
        symbol: 'ETH/USDT',
        baseAsset: 'ETH',
        quoteAsset: 'USDT',
        price: 2456.78,
        change24h: -1.23,
        volume24h: 15678901234,
        high24h: 2500.00,
        low24h: 2400.00,
        candleData: generateCandleData(2456.78),
    },
    // Add more trading pairs...
];

export interface OrderBookEntry {
    price: number;
    amount: number;
    total: number;
}

export const generateOrderBook = (basePrice: number): { bids: OrderBookEntry[], asks: OrderBookEntry[] } => {
    const bids: OrderBookEntry[] = [];
    const asks: OrderBookEntry[] = [];

    for (let i = 0; i < 20; i++) {
        const bidPrice = basePrice * (1 - (i + 1) * 0.001);
        const askPrice = basePrice * (1 + (i + 1) * 0.001);
        const amount = Math.random() * 2;

        bids.push({
            price: bidPrice,
            amount,
            total: bidPrice * amount,
        });

        asks.push({
            price: askPrice,
            amount,
            total: askPrice * amount,
        });
    }

    return { bids, asks };
};

export interface Trade {
    id: string;
    price: number;
    amount: number;
    time: number;
    side: 'buy' | 'sell';
}

export const generateRecentTrades = (basePrice: number): Trade[] => {
    const trades: Trade[] = [];
    const now = Date.now();

    for (let i = 0; i < 50; i++) {
        trades.push({
            id: `trade-${i}`,
            price: basePrice * (1 + (Math.random() - 0.5) * 0.002),
            amount: Math.random() * 2,
            time: now - i * 60000,
            side: Math.random() > 0.5 ? 'buy' : 'sell',
        });
    }

    return trades;
}; 