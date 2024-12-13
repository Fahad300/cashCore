import React, { useState, useEffect } from 'react';
import { Layout, Card, Tabs, Select, Space, Typography, Button, Radio } from 'antd';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    AreaChart, 
    Area,
    ComposedChart,
    Bar
} from 'recharts';
import { Stock } from '@ant-design/charts';
import { mockCoins } from '../../data/mockMarketData';
import { tradingPairs, generateOrderBook, generateRecentTrades } from '../../data/mockTradingData';
import styles from './Trading.module.scss';
import OrderBook from '../../components/OrderBook/OrderBook';
import RecentTrades from '../../components/RecentTrades/RecentTrades';
import SpotTradingForm from '../../components/TradingForms/SpotTradingForm';
import MarginTradingForm from '../../components/TradingForms/MarginTradingForm';
import FutureTradingForm from '../../components/TradingForms/FutureTradingForm';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;
const { Text } = Typography;

interface TradingPair {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    price: number;
    change24h: number;
    volume24h: number;
    high24h: number;
    low24h: number;
    candleData: Array<{
        timestamp: number;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
    }>;
}

interface CandleData {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

// Add type for balance
interface Balance {
    base: number;
    quote: number;
}

// Add type for mock balances with index signature
interface MockBalances {
    [key: string]: Balance;
}

// Update mock balances with type
const mockBalances: MockBalances = {
    'BTC/USDT': {
        base: 0.5,    // BTC
        quote: 25000  // USDT
    },
    'ETH/USDT': {
        base: 5,      // ETH
        quote: 25000  // USDT
    },
    'BNB/USDT': {
        base: 50,     // BNB
        quote: 25000  // USDT
    },
    'SOL/USDT': {
        base: 100,    // SOL
        quote: 25000  // USDT
    },
    'ADA/USDT': {
        base: 5000,
        quote: 25000
    },
    'XRP/USDT': {
        base: 10000,
        quote: 25000
    },
    'DOT/USDT': {
        base: 200,
        quote: 25000
    },
    'DOGE/USDT': {
        base: 50000,
        quote: 25000
    },
    'AVAX/USDT': {
        base: 150,
        quote: 25000
    },
    'MATIC/USDT': {
        base: 3000,
        quote: 25000
    }
};

const Trading: React.FC = () => {
    const [selectedPair, setSelectedPair] = useState<TradingPair>(tradingPairs[0]);
    const [timeframe, setTimeframe] = useState('1h');
    const [chartType, setChartType] = useState<'original' | 'tradingView' | 'depth'>('original');
    const [realtimeData, setRealtimeData] = useState(selectedPair.candleData);
    const [orderBook, setOrderBook] = useState(generateOrderBook(selectedPair.price));
    const [recentTrades, setRecentTrades] = useState(generateRecentTrades(selectedPair.price));
    const [balance, setBalance] = useState<Balance>(mockBalances[selectedPair.symbol]);

    // Update balance when pair changes
    useEffect(() => {
        setBalance(mockBalances[selectedPair.symbol] || { base: 0, quote: 0 });
    }, [selectedPair]);

    // Simulate real-time data updates
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const lastCandle = realtimeData[realtimeData.length - 1];
            const priceChange = (Math.random() - 0.5) * lastCandle.close * 0.002;
            
            const newCandle = {
                timestamp: now,
                open: lastCandle.close,
                close: lastCandle.close + priceChange,
                high: Math.max(lastCandle.close, lastCandle.close + priceChange),
                low: Math.min(lastCandle.close, lastCandle.close + priceChange),
                volume: lastCandle.volume * (1 + (Math.random() - 0.5) * 0.1)
            };

            setRealtimeData(prev => [...prev.slice(-99), newCandle]);
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedPair]);

    const renderChart = () => {
        switch (chartType) {
            case 'original':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={realtimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="timestamp"
                                tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                            />
                            <YAxis domain={['auto', 'auto']} />
                            <Tooltip
                                labelFormatter={(ts) => new Date(ts).toLocaleString()}
                                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Price']}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="close" 
                                stroke="#8884d8"
                                dot={false}
                                isAnimationActive={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );

            case 'tradingView':
                return (
                    <Stock
                        style={{ height: 400 }}
                        data={realtimeData}
                        xField="timestamp"
                        yField={['open', 'close', 'high', 'low']}
                        meta={{
                            timestamp: {
                                type: 'time',
                                mask: 'HH:mm:ss'
                            },
                            volume: {
                                alias: 'Volume'
                            }
                        }}
                        tooltip={{
                            crosshairs: {
                                line: {
                                    style: {
                                        stroke: '#666',
                                        lineDash: [4, 4]
                                    }
                                }
                            },
                            fields: ['open', 'close', 'high', 'low', 'volume'],
                            formatter: (datum: CandleData) => ({
                                name: new Date(datum.timestamp).toLocaleString(),
                                value: `
                                    Open: $${datum.open.toFixed(2)}
                                    High: $${datum.high.toFixed(2)}
                                    Low: $${datum.low.toFixed(2)}
                                    Close: $${datum.close.toFixed(2)}
                                    Volume: ${datum.volume.toFixed(2)}
                                `
                            })
                        }}
                        fallingFill="#ef5350"
                        risingFill="#26a69a"
                        interactions={[{ type: 'tooltip' }, { type: 'crosshairs' }]}
                        defaultState={{
                            zoomPane: { zoom: 0.5 },
                        }}
                    />
                );

            case 'depth':
                const { bids, asks } = generateOrderBook(selectedPair.price);
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={[...bids, ...asks]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="price" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                );
        }
    };

    const handleTradeExecution = (tradeDetails: {
        type: 'market' | 'limit' | 'stopLimit';
        side: 'buy' | 'sell';
        amount: number;
        price: number;
        pair: string;
    }) => {
        const { side, amount, price } = tradeDetails;
        const total = amount * price;

        setBalance(prevBalance => {
            if (side === 'buy') {
                return {
                    base: prevBalance.base + amount,
                    quote: prevBalance.quote - total
                };
            } else {
                return {
                    base: prevBalance.base - amount,
                    quote: prevBalance.quote + total
                };
            }
        });
    };

    return (
        <Layout className={styles.trading}>
            <Content className={styles.mainContent}>
                <div className={styles.header}>
                    <div>
                        <h1 style={{ margin: 0 }}>Trading Overview</h1>
                    </div>
                    <div className={styles.balanceDisplay}>
                        <Space size="large">
                            <div>
                                <Text type="secondary">Available Balance</Text>
                                <div>
                                    <Text strong>{balance.base.toFixed(8)} {selectedPair.symbol.split('/')[0]}</Text>
                                </div>
                                <div>
                                    <Text strong>{balance.quote.toFixed(2)} {selectedPair.symbol.split('/')[1]}</Text>
                                </div>
                            </div>
                            <div>
                                <Text type="secondary">Estimated Value</Text>
                                <div>
                                    <Text strong>
                                        ${((balance.base * selectedPair.price) + balance.quote).toLocaleString()}
                                    </Text>
                                </div>
                            </div>
                        </Space>
                    </div>
                </div>
                <div className={styles.chartSection}>
                    <div className={styles.header}>
                        <Space>
                            <Select
                                value={selectedPair.symbol}
                                onChange={(value) => setSelectedPair(tradingPairs.find(p => p.symbol === value)!)}
                                style={{ width: 150 }}
                            >
                                {tradingPairs.map(pair => (
                                    <Select.Option key={pair.symbol} value={pair.symbol}>
                                        {pair.symbol}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Text strong>${selectedPair.price.toLocaleString()}</Text>
                            <Text type={selectedPair.change24h >= 0 ? 'success' : 'danger'}>
                                {selectedPair.change24h}%
                            </Text>
                        </Space>
                        <Space>
                            <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)}>
                                <Radio.Button value="original">Original</Radio.Button>
                                <Radio.Button value="tradingView">Trading View</Radio.Button>
                                <Radio.Button value="depth">Depth</Radio.Button>
                            </Radio.Group>
                            <Button.Group>
                                <Button type={timeframe === '1m' ? 'primary' : 'default'} onClick={() => setTimeframe('1m')}>1m</Button>
                                <Button type={timeframe === '5m' ? 'primary' : 'default'} onClick={() => setTimeframe('5m')}>5m</Button>
                                <Button type={timeframe === '15m' ? 'primary' : 'default'} onClick={() => setTimeframe('15m')}>15m</Button>
                                <Button type={timeframe === '1h' ? 'primary' : 'default'} onClick={() => setTimeframe('1h')}>1H</Button>
                                <Button type={timeframe === '4h' ? 'primary' : 'default'} onClick={() => setTimeframe('4h')}>4H</Button>
                                <Button type={timeframe === '1d' ? 'primary' : 'default'} onClick={() => setTimeframe('1d')}>1D</Button>
                            </Button.Group>
                        </Space>
                    </div>
                    <div className={styles.chart}>
                        {renderChart()}
                    </div>
                </div>
                <div className={styles.orderSection}>
                    <Tabs defaultActiveKey="spot">
                        <TabPane tab="Spot" key="spot">
                            <Card title="Spot Trading">
                                <SpotTradingForm 
                                    pair={selectedPair.symbol}
                                    currentPrice={selectedPair.price}
                                    balance={balance}
                                    onTradeExecute={handleTradeExecution}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="Margin" key="margin">
                            <Card title="Margin Trading">
                                <MarginTradingForm
                                    pair={selectedPair.symbol}
                                    currentPrice={selectedPair.price}
                                    balance={balance}
                                    leverage={5}
                                    onTradeExecute={handleTradeExecution}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="Future" key="future">
                            <Card title="Future Trading">
                                <FutureTradingForm
                                    pair={selectedPair.symbol}
                                    currentPrice={selectedPair.price}
                                    balance={balance}
                                    maxLeverage={100}
                                    onTradeExecute={handleTradeExecution}
                                />
                            </Card>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
            <Sider width={300} className={styles.sider}>
                <Card title="Order Book">
                    <OrderBook bids={orderBook.bids} asks={orderBook.asks} />
                </Card>
                <Card title="Recent Trades">
                    <RecentTrades trades={recentTrades} />
                </Card>
            </Sider>
        </Layout>
    );
};

export default Trading; 