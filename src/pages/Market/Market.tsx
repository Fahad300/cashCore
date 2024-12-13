import React, { useState, useMemo } from 'react';
import { Card, List, Avatar, Typography, Row, Col, Modal, Input, Statistic, Select, Button, Slider, Space, Radio, Tabs, Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, SearchOutlined, StarOutlined, StarFilled, BellOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { getHotCoins, getNewListings, getTopGainers, getTopVolume, mockCoins } from '../../data/mockMarketData';
import type { Coin, PriceHistory } from '../../data/mockMarketData';
import styles from './Market.module.scss';
import PriceAlert from '../../components/PriceAlert/PriceAlert';
import MiniChart from '../../components/MiniChart/MiniChart';


const { Text, Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

interface CoinListProps {
    title: string;
    coins: Coin[];
    onCoinClick: (coin: Coin) => void;
    searchTerm: string;
}

interface FilterOptions {
    priceRange: [number, number];
    volumeRange: [number, number];
    changeRange: [number, number];
    sortBy: 'price' | 'volume' | 'change' | 'marketCap' | 'name';
    sortOrder: 'asc' | 'desc';
}
export const updateCoinWithPairName = (coins: Coin[]) => {
    return coins.map(coin => ({
        ...coin,
        name: `${coin.name.split(' / ')[0]} / USDT`,
    }));
};
const CoinList: React.FC<CoinListProps> = ({ title, coins, onCoinClick, searchTerm }) => {
    const filteredCoins = useMemo(() => {
        return coins.filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [coins, searchTerm]);

    return (
        <Card
            title={title}
            className={styles.coinCard}
            extra={
                <Search
                    placeholder="Search coins"
                    allowClear
                    size="small"
                    style={{ width: 150 }}
                />
            }
        >
            <List
                itemLayout="horizontal"
                dataSource={filteredCoins}
                locale={{ emptyText: 'No coins found' }}
                renderItem={(coin) => (
                    <List.Item
                        className={styles.coinItem}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onCoinClick(coin)}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={coin.icon} />}
                            title={<Text strong>{coin.name}</Text>}
                            description={coin.symbol}
                        />
                        <div className={styles.coinInfo}>
                            <Text strong>${coin.price.toLocaleString()}</Text>
                            <Text
                                className={styles.change}
                                type={coin.change24h >= 0 ? 'success' : 'danger'}
                            >
                                {coin.change24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                {Math.abs(coin.change24h)}%
                            </Text>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    );
};

const CandlestickBar: React.FC<any> = (props) => {
    const {
        x,
        y,
        width,
        height,
        payload
    } = props;

    const { open, close, high, low } = payload;
    const isRising = close > open;
    const color = isRising ? '#52c41a' : '#ff4d4f';
    const bodyHeight = Math.abs(open - close);
    const bodyY = Math.min(open, close);
    const scale = height / (high - low);

    return (
        <g>
            {/* Wick */}
            <line
                x1={x + width / 2}
                y1={y + (high - high) * scale}
                x2={x + width / 2}
                y2={y + (high - low) * scale}
                stroke={color}
                strokeWidth={1}
            />
            {/* Body */}
            <rect
                x={x}
                y={y + (high - Math.max(open, close)) * scale}
                width={width}
                height={bodyHeight * scale}
                fill={color}
            />
        </g>
    );
};

const CoinDetailsModal: React.FC<{
    coin: Coin | null;
    visible: boolean;
    onClose: () => void;
}> = ({ coin, visible, onClose }) => {
    const [chartType, setChartType] = useState<'line' | 'candle'>('line');
    const [alertModalVisible, setAlertModalVisible] = useState(false);

    if (!coin) return null;

    return (
        <Modal
            title={
                <Space>
                    {`${coin.name} (${coin.symbol})`}
                    <Button
                        icon={<BellOutlined />}
                        onClick={() => setAlertModalVisible(true)}
                    >
                        Set Alert
                    </Button>
                </Space>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <div className={styles.coinDetails}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Statistic
                            title="Price"
                            value={coin.price}
                            precision={2}
                            prefix="$"
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="24h Change"
                            value={coin.change24h}
                            precision={2}
                            prefix={coin.change24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            suffix="%"
                            valueStyle={{ color: coin.change24h >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="24h Volume"
                            value={coin.volume24h}
                            precision={0}
                            prefix="$"
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Market Cap"
                            value={coin.marketCap}
                            precision={0}
                            prefix="$"
                        />
                    </Col>
                </Row>

                <div className={styles.chartControls}>
                    <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)}>
                        <Radio.Button value="line">Line</Radio.Button>
                        <Radio.Button value="candle">Candlestick</Radio.Button>
                    </Radio.Group>
                </div>

                <div className={styles.priceChart}>
                    <ResponsiveContainer width="100%" height={400}>
                        {chartType === 'line' ? (
                            <LineChart data={coin.priceHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                                />
                                <YAxis domain={['auto', 'auto']} />
                                <Tooltip
                                    labelFormatter={(label) => new Date(label).toLocaleString()}
                                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Price']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#1890ff"
                                    dot={false}
                                />
                            </LineChart>
                        ) : (
                            <ComposedChart data={coin.candleData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                                />
                                <YAxis domain={['auto', 'auto']} />
                                <YAxis yAxisId="volume" orientation="right" />
                                <Tooltip
                                    labelFormatter={(ts) => new Date(ts).toLocaleString()}
                                    formatter={(value: any, name: string) => [
                                        `$${value.toLocaleString()}`,
                                        name.charAt(0).toUpperCase() + name.slice(1)
                                    ]}
                                />
                                <Bar
                                    dataKey="close"
                                    shape={<CandlestickBar />}
                                />
                                <Bar
                                    dataKey="volume"
                                    yAxisId="volume"
                                    fill="#82ca9d"
                                    opacity={0.3}
                                />
                            </ComposedChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            <PriceAlert
                coin={coin}
                visible={alertModalVisible}
                onClose={() => setAlertModalVisible(false)}
            />
        </Modal>
    );
};

const Market: React.FC = () => {
    const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState<string[]>(() => {
        const stored = localStorage.getItem('favorite-coins');
        return stored ? JSON.parse(stored) : [];
    });
    const [filterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        priceRange: [0, 100000],
        volumeRange: [0, 1000000000],
        changeRange: [-100, 100],
        sortBy: 'price',
        sortOrder: 'desc'
    });

    const handleCoinClick = (coin: Coin) => {
        setSelectedCoin(coin);
        setModalVisible(true);
    };

    const toggleFavorite = (coinId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updatedFavorites = favorites.includes(coinId)
            ? favorites.filter(id => id !== coinId)
            : [...favorites, coinId];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorite-coins', JSON.stringify(updatedFavorites));
    };

    const filterCoins = (coins: Coin[]) => {
        return coins.filter(coin =>
            coin.price >= filters.priceRange[0] &&
            coin.price <= filters.priceRange[1] &&
            coin.volume24h >= filters.volumeRange[0] &&
            coin.volume24h <= filters.volumeRange[1] &&
            coin.change24h >= filters.changeRange[0] &&
            coin.change24h <= filters.changeRange[1]
        ).sort((a, b) => {
            const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
            switch (filters.sortBy) {
                case 'price':
                    return (a.price - b.price) * multiplier;
                case 'volume':
                    return (a.volume24h - b.volume24h) * multiplier;
                case 'change':
                    return (a.change24h - b.change24h) * multiplier;
                default:
                    return 0;
            }
        });
    };

    const handleSliderChange = (key: keyof FilterOptions) => (value: number | number[]) => {
        setFilters(prev => ({
            ...prev,
            [key]: Array.isArray(value) ? [value[0], value[1]] as [number, number] : [0, value] as [number, number]
        }));
    };

    const marketCards = [
        {
            title: "Hot Coins 🔥",
            coins: getHotCoins()
        },
        {
            title: "New Listings 🆕",
            coins: getNewListings()
        },
        {
            title: "Top Gainers 📈",
            coins: getTopGainers()
        },
        {
            title: "Top Volume 📊",
            coins: getTopVolume()
        }
    ];

    const renderMarketCards = () => (
        <Row gutter={[16, 16]} className={styles.marketCards}>
            {marketCards.map((card, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                    <CoinList
                        title={card.title}
                        coins={card.coins}
                        onCoinClick={handleCoinClick}
                        searchTerm={searchTerm}
                    />
                </Col>
            ))}
        </Row>
    );

    const renderFavorites = () => (
        <List
            className={styles.coinList}
            dataSource={mockCoins.filter(coin => favorites.includes(coin.id))}
            renderItem={(coin) => (
                <List.Item
                    className={styles.coinItem}
                    onClick={() => handleCoinClick(coin)}
                    actions={[
                        <Button
                            icon={<StarFilled />}
                            onClick={(e) => toggleFavorite(coin.id, e)}
                            className={styles.favoriteButton}
                        />
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={coin.icon} />}
                        title={<Text strong>{coin.name}</Text>}
                        description={coin.symbol}
                    />
                    <div className={styles.coinInfo}>
                        <Text strong>${coin.price.toLocaleString()}</Text>
                        <Text
                            className={styles.change}
                            type={coin.change24h >= 0 ? 'success' : 'danger'}
                        >
                            {coin.change24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            {Math.abs(coin.change24h)}%
                        </Text>
                    </div>
                </List.Item>
            )}
        />
    );

    const renderCoinItem = (coin: Coin) => (
        <List.Item
            className={styles.coinItem}
            onClick={() => handleCoinClick(coin)}
            actions={[
                <MiniChart
                    data={coin.priceHistory}
                    isPositive={coin.change24h >= 0}
                />,
                <Button
                    icon={<StarFilled />}
                    onClick={(e) => toggleFavorite(coin.id, e)}
                    className={styles.favoriteButton}
                />
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={coin.icon} />}
                title={<Text strong>{coin.name}</Text>}
                description={coin.symbol}
            />
            <div className={styles.coinInfo}>
                <Text strong>${coin.price.toLocaleString()}</Text>
                <Text
                    className={styles.change}
                    type={coin.change24h >= 0 ? 'success' : 'danger'}
                >
                    {coin.change24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {Math.abs(coin.change24h)}%
                </Text>
            </div>
        </List.Item>
    );

    const columns = [
        {
            title: 'Name',
            key: 'name',
            sorter: true,
            render: (coin: Coin) => (
                <Space>
                    <Avatar src={coin.icon} />
                    <div>
                        <Text strong>{coin.name}</Text>
                        <div><Text type="secondary">{coin.symbol}</Text></div>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Price',
            key: 'price',
            sorter: true,
            render: (coin: Coin) => (
                <Text strong>${coin.price.toLocaleString()}</Text>
            ),
        },
        {
            title: '24h Change',
            key: 'change24h',
            sorter: true,
            render: (coin: Coin) => (
                <Text
                    className={styles.change}
                    type={coin.change24h >= 0 ? 'success' : 'danger'}
                >
                    {coin.change24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {Math.abs(coin.change24h)}%
                </Text>
            ),
        },
        {
            title: '24h High/Low',
            key: 'highLow',
            render: (coin: Coin) => {
                const high = Math.max(...coin.priceHistory.map(p => p.price));
                const low = Math.min(...coin.priceHistory.map(p => p.price));
                return (
                    <div style={{ textAlign: 'right' }}>
                        <div><Text type="success">${high.toLocaleString()}</Text></div>
                        <div><Text type="danger">${low.toLocaleString()}</Text></div>
                    </div>
                );
            },
        },
        {
            title: '24h Volume',
            key: 'volume24h',
            sorter: true,
            render: (coin: Coin) => (
                <Text>${(coin.volume24h / 1000000).toFixed(2)}M</Text>
            ),
        },
        {
            title: 'Market Cap',
            key: 'marketCap',
            sorter: true,
            render: (coin: Coin) => (
                <Text>${(coin.marketCap / 1000000000).toFixed(2)}B</Text>
            ),
        },
        {
            title: 'Chart',
            key: 'chart',
            render: (coin: Coin) => (
                <MiniChart
                    data={coin.priceHistory}
                    isPositive={coin.change24h >= 0}
                />
            ),
        },
        {
            title: '',
            key: 'actions',
            render: (coin: Coin) => (
                <Button
                    icon={<StarFilled />}
                    onClick={(e) => toggleFavorite(coin.id, e)}
                    className={styles.favoriteButton}
                />
            ),
        },
    ];

    const renderCoinList = (coins: Coin[], showPagination = true) => (
        <Table
            className={styles.coinTable}
            columns={columns}
            dataSource={coins}
            rowKey="id"
            onRow={(coin) => ({
                onClick: () => handleCoinClick(coin),
                style: { cursor: 'pointer' }
            })}
            pagination={showPagination ? {
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} coins`,
            } : false}
            onChange={(pagination, filters, sorter: any) => {
                if (sorter.field) {
                    setFilters(prev => ({
                        ...prev,
                        sortBy: sorter.field as FilterOptions['sortBy'],
                        sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc'
                    }));
                }
            }}
        />
    );

    return (
        <div className={styles.market}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div>
                        <h1>Market Overview</h1>
                        <p>Top Tokens by Market Capitalization</p>
                    </div>
                    <Search
                        placeholder="Search all coins"
                        allowClear
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ width: 300 }}
                        prefix={<SearchOutlined />}
                    />
                </div>
            </div>

            {renderMarketCards()}

            <Card className={styles.marketTabs}>
                <Tabs defaultActiveKey="all">
                    <TabPane tab="Favorites" key="favorites">
                        {renderCoinList(mockCoins.filter(coin => favorites.includes(coin.id)), false)}
                    </TabPane>
                    <TabPane tab="All Coins" key="all">
                        {renderCoinList(mockCoins)}
                    </TabPane>
                    <TabPane tab="Spot/Margin Market" key="spot">
                        {renderCoinList(updateCoinWithPairName(mockCoins))}
                    </TabPane>
                    <TabPane tab="Future Market" key="future">
                        {renderCoinList(filterCoins(mockCoins.filter(coin => coin.volume24h > 10000000)))}
                    </TabPane>
                    <TabPane tab="New Listings" key="new">
                        {renderCoinList(getNewListings())}
                    </TabPane>
                    <TabPane tab="Zones" key="zones">
                        {renderCoinList(getTopVolume())}
                    </TabPane>
                </Tabs>
            </Card>

            <CoinDetailsModal
                coin={selectedCoin}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            <Modal
                title="Filter Coins"
                open={filterVisible}
                onCancel={() => setFilterVisible(false)}
                onOk={() => setFilterVisible(false)}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                        <Typography.Text>Price Range ($)</Typography.Text>
                        <Slider
                            range
                            value={filters.priceRange}
                            onChange={handleSliderChange('priceRange')}
                            max={100000}
                        />
                    </div>
                    <div>
                        <Typography.Text>Volume Range ($)</Typography.Text>
                        <Slider
                            range
                            value={filters.volumeRange}
                            onChange={handleSliderChange('volumeRange')}
                            max={1000000000}
                        />
                    </div>
                    <div>
                        <Typography.Text>Change Range (%)</Typography.Text>
                        <Slider
                            range
                            value={filters.changeRange}
                            onChange={handleSliderChange('changeRange')}
                            min={-100}
                            max={100}
                        />
                    </div>
                    <Select
                        style={{ width: '100%' }}
                        value={filters.sortBy}
                        onChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                    >
                        <Select.Option value="price">Sort by Price</Select.Option>
                        <Select.Option value="volume">Sort by Volume</Select.Option>
                        <Select.Option value="change">Sort by Change</Select.Option>
                    </Select>
                    <Select
                        style={{ width: '100%' }}
                        value={filters.sortOrder}
                        onChange={(value) => setFilters(prev => ({ ...prev, sortOrder: value }))}
                    >
                        <Select.Option value="asc">Ascending</Select.Option>
                        <Select.Option value="desc">Descending</Select.Option>
                    </Select>
                </Space>
            </Modal>
        </div>
    );
};

export default Market; 