export interface PriceHistory {
    timestamp: number;
    price: number;
    volume: number;
}

export interface CandleData {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface Coin {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    isHot?: boolean;
    isNew?: boolean;
    priceHistory: PriceHistory[];
    candleData: CandleData[];
}

const generatePriceHistory = (basePrice: number): PriceHistory[] => {
    const now = Date.now();
    const history: PriceHistory[] = [];
    for (let i = 0; i < 24; i++) {
        history.push({
            timestamp: now - (23 - i) * 3600000,
            price: basePrice * (1 + (Math.random() - 0.5) * 0.1),
            volume: Math.random() * 1000000
        });
    }
    return history;
};

const generateCandleData = (basePrice: number): CandleData[] => {
    const now = Date.now();
    const data: CandleData[] = [];
    for (let i = 0; i < 24; i++) {
        const volatility = basePrice * 0.02;
        const open = basePrice * (1 + (Math.random() - 0.5) * 0.1);
        const close = open * (1 + (Math.random() - 0.5) * 0.05);
        const high = Math.max(open, close) + Math.random() * volatility;
        const low = Math.min(open, close) - Math.random() * volatility;

        data.push({
            timestamp: now - (23 - i) * 3600000,
            open,
            high,
            low,
            close,
            volume: Math.random() * 1000000
        });
    }
    return data;
};

export const mockCoins: Coin[] = [
    {
        id: 'bitcoin',
        icon: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 45123.45,
        change24h: 2.34,
        volume24h: 28945678901,
        marketCap: 876543210987,
        isHot: true,
        priceHistory: generatePriceHistory(45123.45),
        candleData: generateCandleData(45123.45),
    },
    {
        id: 'ethereum',
        icon: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
        name: 'Ethereum',
        symbol: 'ETH',
        price: 2456.78,
        change24h: -1.23,
        volume24h: 15678901234,
        marketCap: 234567890123,
        isHot: true,
        priceHistory: generatePriceHistory(2456.78),
        candleData: generateCandleData(2456.78),
    },
    {
        id: 'binancecoin',
        icon: 'https://assets.coingecko.com/coins/images/825/thumb/binance-coin-logo.png',
        name: 'Binance Coin',
        symbol: 'BNB',
        price: 312.45,
        change24h: 5.67,
        volume24h: 9876543210,
        marketCap: 56789012345,
        isHot: true,
        priceHistory: generatePriceHistory(312.45),
        candleData: generateCandleData(312.45),
    },
    {
        id: 'solana',
        icon: 'https://assets.coingecko.com/coins/images/4128/thumb/solana.png',
        name: 'Solana',
        symbol: 'SOL',
        price: 123.45,
        change24h: 8.90,
        volume24h: 7654321098,
        marketCap: 45678901234,
        isNew: true,
        priceHistory: generatePriceHistory(123.45),
        candleData: generateCandleData(123.45),
    },
    {
        id: 'cardano',
        icon: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png',
        name: 'Cardano',
        symbol: 'ADA',
        price: 0.45,
        change24h: -3.21,
        volume24h: 5432109876,
        marketCap: 34567890123,
        isHot: true,
        priceHistory: generatePriceHistory(0.45),
        candleData: generateCandleData(0.45),
    },
    {
        id: 'polkadot',
        icon: 'https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png',
        name: 'Polkadot',
        symbol: 'DOT',
        price: 34.67,
        change24h: 1.78,
        volume24h: 6789101112,
        marketCap: 123456789012,
        isNew: true,
        priceHistory: generatePriceHistory(34.67),
        candleData: generateCandleData(34.67),
    },
    {
        id: 'dogecoin',
        icon: 'https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png',
        name: 'Dogecoin',
        symbol: 'DOGE',
        price: 0.34,
        change24h: 4.56,
        volume24h: 3456789012,
        marketCap: 23456789012,
        isHot: true,
        isNew: true,
        priceHistory: generatePriceHistory(0.34),
        candleData: generateCandleData(0.34),
    },
    {
        id: 'litecoin',
        icon: 'https://assets.coingecko.com/coins/images/2/thumb/litecoin.png',
        name: 'Litecoin',
        symbol: 'LTC',
        price: 156.78,
        change24h: -2.67,
        volume24h: 2345678901,
        marketCap: 123456789012,
        isHot: false,
        isNew: true,
        priceHistory: generatePriceHistory(156.78),
        candleData: generateCandleData(156.78),
    },
    {
        id: 'uniswap',
        icon: 'https://assets.coingecko.com/coins/images/12539/thumb/uniswap.png',
        name: 'Uniswap',
        symbol: 'UNI',
        price: 29.45,
        change24h: 3.12,
        volume24h: 3456789012,
        marketCap: 34567890123,
        isHot: true,
        priceHistory: generatePriceHistory(29.45),
        candleData: generateCandleData(29.45),
    },
    {
        id: 'avalanche',
        icon: 'https://assets.coingecko.com/coins/images/12597/thumb/avalanche.png',
        name: 'Avalanche',
        symbol: 'AVAX',
        price: 112.67,
        change24h: 6.45,
        volume24h: 9876543210,
        marketCap: 87654321098,
        isHot: true,
        priceHistory: generatePriceHistory(112.67),
        candleData: generateCandleData(112.67),
    },
    {
        id: 'chainlink',
        icon: 'https://assets.coingecko.com/coins/images/877/thumb/chainlink.png',
        name: 'Chainlink',
        symbol: 'LINK',
        price: 32.45,
        change24h: -1.45,
        volume24h: 1234567890,
        marketCap: 9876543210,
        isHot: false,
        priceHistory: generatePriceHistory(32.45),
        candleData: generateCandleData(32.45),
    },
    {
        id: 'shiba-inu',
        icon: 'https://assets.coingecko.com/coins/images/11939/thumb/shiba.png',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        price: 0.000008,
        change24h: 10.56,
        volume24h: 1234567890,
        marketCap: 876543210,
        isHot: true,
        priceHistory: generatePriceHistory(0.000008),
        candleData: generateCandleData(0.000008),
    },
    {
        id: 'usd-coin',
        icon: 'https://assets.coingecko.com/coins/images/6319/thumb/usd-coin.png',
        name: 'USD Coin',
        symbol: 'USDC',
        price: 1.00,
        change24h: 0.05,
        volume24h: 5000000000,
        marketCap: 50000000000,
        isHot: true,
        priceHistory: generatePriceHistory(1.00),
        candleData: generateCandleData(1.00),
    },
    {
        id: 'tether',
        icon: 'https://assets.coingecko.com/coins/images/325/thumb/tether.png',
        name: 'Tether',
        symbol: 'USDT',
        price: 1.00,
        change24h: -0.03,
        volume24h: 32000000000,
        marketCap: 320000000000,
        isHot: false,
        priceHistory: generatePriceHistory(1.00),
        candleData: generateCandleData(1.00),
    },
    {
        id: 'monero',
        icon: 'https://assets.coingecko.com/coins/images/69/thumb/monero.png',
        name: 'Monero',
        symbol: 'XMR',
        price: 153.67,
        change24h: -1.34,
        volume24h: 2345678901,
        marketCap: 8765432109,
        isHot: false,
        priceHistory: generatePriceHistory(153.67),
        candleData: generateCandleData(153.67),
    },
    {
        id: 'ethereum-classic',
        icon: 'https://assets.coingecko.com/coins/images/453/thumb/ethereum-classic.png',
        name: 'Ethereum Classic',
        symbol: 'ETC',
        price: 35.67,
        change24h: -2.56,
        volume24h: 1234567890,
        marketCap: 9876543210,
        isHot: false,
        priceHistory: generatePriceHistory(35.67),
        candleData: generateCandleData(35.67),
    },
    {
        id: 'stellar',
        icon: 'https://assets.coingecko.com/coins/images/434/thumb/stellar.png',
        name: 'Stellar',
        symbol: 'XLM',
        price: 0.42,
        change24h: 3.78,
        volume24h: 987654321,
        marketCap: 5432109876,
        isHot: true,
        priceHistory: generatePriceHistory(0.42),
        candleData: generateCandleData(0.42),
    },
    {
        id: 'vechain',
        icon: 'https://assets.coingecko.com/coins/images/1093/thumb/vechain.png',
        name: 'VeChain',
        symbol: 'VET',
        price: 0.16,
        change24h: 1.45,
        volume24h: 1234567890,
        marketCap: 2345678901,
        isHot: true,
        priceHistory: generatePriceHistory(0.16),
        candleData: generateCandleData(0.16),
    },
    {
        id: 'neo',
        icon: 'https://assets.coingecko.com/coins/images/137/thumb/neo.png',
        name: 'NEO',
        symbol: 'NEO',
        price: 25.67,
        change24h: 2.45,
        volume24h: 567890123,
        marketCap: 1234567890,
        isHot: true,
        priceHistory: generatePriceHistory(25.67),
        candleData: generateCandleData(25.67),
    },
    // Add more coins...
];

export const getHotCoins = () => mockCoins.filter(coin => coin.isHot).slice(0, 5);
export const getNewListings = () => mockCoins.filter(coin => coin.isNew).slice(0, 5);
export const getTopGainers = () => [...mockCoins].sort((a, b) => b.change24h - a.change24h).slice(0, 5);
export const getTopVolume = () => [...mockCoins].sort((a, b) => b.volume24h - a.volume24h).slice(0, 5);
