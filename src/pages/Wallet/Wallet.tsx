import React, { useState } from 'react';
import { Layout, Card, Tabs, Table, Button, Typography, Space, Tag, Tooltip, Form, Input, Select, Radio, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, SwapOutlined, PlusOutlined, CreditCardOutlined, BankOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './Wallet.module.scss';
import { mockBalances } from '../../data/mockWalletData';
import DepositModal from '../../components/WalletActions/DepositModal';
import WithdrawModal from '../../components/WalletActions/WithdrawModal';
import PaymentMethodModal from '../../components/WalletActions/PaymentMethodModal';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

interface AssetBalance {
    coin: string;
    total: number;
    available: number;
    inOrder: number;
    btcValue: number;
    usdtValue: number;
    icon: string;
}

const mockPaymentMethods = [
    {
        id: 1,
        type: 'card',
        name: 'Visa ending in 4242',
        icon: <CreditCardOutlined />,
        expiryDate: '12/24'
    },
    {
        id: 2,
        type: 'bank',
        name: 'Bank Account (ACH)',
        icon: <BankOutlined />,
        accountEnding: '6789'
    }
];

const mockTransactions = [
    {
        id: 1,
        type: 'deposit',
        coin: 'BTC',
        amount: 0.05,
        status: 'completed',
        timestamp: new Date('2024-03-15T10:30:00'),
        txHash: '0x1234...5678',
        from: '0xabcd...efgh',
        to: '0x9876...5432',
        network: 'Bitcoin Network'
    },
    {
        id: 2,
        type: 'withdrawal',
        coin: 'ETH',
        amount: 2.5,
        status: 'pending',
        timestamp: new Date('2024-03-14T15:45:00'),
        txHash: '0x5678...1234',
        from: '0x1234...5678',
        to: '0xefgh...abcd',
        network: 'Ethereum Network'
    },
    {
        id: 3,
        type: 'exchange',
        coin: 'BNB',
        amount: 10,
        toCoin: 'USDT',
        toAmount: 3150,
        status: 'completed',
        timestamp: new Date('2024-03-14T09:20:00')
    },
    // Add more transactions as needed
];

const Wallet: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState('spot');
    const [depositModalVisible, setDepositModalVisible] = useState(false);
    const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState<any>(null);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);

    const columns = [
        {
            title: 'Coin',
            dataIndex: 'coin',
            key: 'coin',
            render: (text: string, record: AssetBalance) => (
                <Space>
                    <img
                        src={record.icon}
                        alt={text}
                        style={{ width: 24, height: 24 }}
                    />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (value: number, record: AssetBalance) => (
                <Text>{value.toFixed(8)} {record.coin}</Text>
            ),
        },
        {
            title: 'Available',
            dataIndex: 'available',
            key: 'available',
            render: (value: number, record: AssetBalance) => (
                <Text>{value.toFixed(8)} {record.coin}</Text>
            ),
        },
        {
            title: 'In Order',
            dataIndex: 'inOrder',
            key: 'inOrder',
            render: (value: number, record: AssetBalance) => (
                <Text>{value.toFixed(8)} {record.coin}</Text>
            ),
        },
        {
            title: 'BTC Value',
            dataIndex: 'btcValue',
            key: 'btcValue',
            render: (value: number) => (
                <Text>{value.toFixed(8)} BTC</Text>
            ),
        },
        {
            title: 'USDT Value',
            dataIndex: 'usdtValue',
            key: 'usdtValue',
            render: (value: number) => (
                <Text>${value.toLocaleString()}</Text>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: AssetBalance) => (
                <Space>
                    <Tooltip title="Deposit">
                        <Button
                            type="text"
                            icon={<ArrowDownOutlined />}
                            size="small"
                        />
                    </Tooltip>
                    <Tooltip title="Withdraw">
                        <Button
                            type="text"
                            icon={<ArrowUpOutlined />}
                            size="small"
                        />
                    </Tooltip>
                    <Tooltip title="Trade">
                        <Button
                            type="text"
                            icon={<SwapOutlined />}
                            size="small"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const totalValue = mockBalances.reduce((sum, asset) => sum + asset.usdtValue, 0);

    const handleDeposit = (coin: string) => {
        const coinData = mockBalances.find(b => b.coin === coin);
        setSelectedCoin({
            ...coinData,
            address: '0x1234567890abcdef1234567890abcdef12345678',
            network: ['ETH', 'BSC', 'Polygon']
        });
        setDepositModalVisible(true);
    };

    const handleWithdraw = (coin: string) => {
        const coinData = mockBalances.find(b => b.coin === coin);
        setSelectedCoin({
            ...coinData,
            network: ['ETH', 'BSC', 'Polygon']
        });
        setWithdrawModalVisible(true);
    };

    const handlePaymentMethodSubmit = (values: any) => {
        console.log('Payment method:', values);
        setPaymentModalVisible(false);
    };

    return (
        <Layout className={styles.wallet}>
            <Content className={styles.content}>
                <div className={styles.header}>
                    <div>
                        <Title level={2}>Wallet Overview</Title>
                        <div className={styles.balanceCards}>
                            <Card className={styles.balanceCard}>
                                <Text type="secondary">Total Balance</Text>
                                <Title level={3}>${totalValue.toLocaleString()}</Title>
                                <Text type="secondary">≈ {(totalValue / mockBalances[0].usdtValue).toFixed(8)} BTC</Text>
                                <div className={styles.assetList}>
                                    <Text type="secondary">Portfolio Distribution</Text>
                                    <Progress 
                                        percent={75} 
                                        success={{ percent: 30 }} 
                                        size="small" 
                                        showInfo={false}
                                        style={{ marginTop: 8 }}
                                    />
                                </div>
                            </Card>
                            <Card className={styles.balanceCard}>
                                <Text type="secondary">Crypto Assets</Text>
                                <Title level={3}>
                                    ${mockBalances.reduce((sum, asset) =>
                                        asset.coin !== 'USDT' ? sum + asset.usdtValue : sum, 0
                                    ).toLocaleString()}
                                </Title>
                                <Text type="secondary">Top Holdings</Text>
                                <div className={styles.assetList}>
                                    {mockBalances.slice(0, 3).map(asset => (
                                        <div key={asset.coin} className={styles.assetRow}>
                                            <img src={asset.icon} alt={asset.coin} />
                                            <div style={{ flex: 1 }}>
                                                <Text strong>{asset.coin}</Text>
                                                <br />
                                                <Text type="secondary">{asset.total.toFixed(4)}</Text>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <Text>${asset.usdtValue.toLocaleString()}</Text>
                                                <br />
                                                <Text type="secondary" style={{ color: '#52c41a' }}>+2.45%</Text>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card className={styles.balanceCard}>
                                <Text type="secondary">Fiat Balance</Text>
                                <Title level={3}>
                                    ${mockBalances.find(asset => asset.coin === 'USDT')?.usdtValue.toLocaleString() || '0'}
                                </Title>
                                <Text type="secondary">Available for Trading</Text>
                                <div className={styles.assetList}>
                                    <div className={styles.assetRow}>
                                        <img src={mockBalances.find(asset => asset.coin === 'USDT')?.icon} alt="USDT" />
                                        <div style={{ flex: 1 }}>
                                            <Text strong>USDT</Text>
                                            <br />
                                            <Text type="secondary">Tether USD</Text>
                                        </div>
                                        <Button type="primary" size="small">
                                            Buy Crypto
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <Space>
                        <Button type="primary" icon={<ArrowDownOutlined />} onClick={() => handleDeposit(mockBalances[0].coin)}>
                            Deposit
                        </Button>
                        <Button icon={<ArrowUpOutlined />} onClick={() => handleWithdraw(mockBalances[0].coin)}>
                            Withdraw
                        </Button>
                    </Space>
                </div>

                <Card
                    title="Payment Methods"
                    className={styles.paymentMethodsCard}
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setPaymentModalVisible(true)}
                        >
                            Add Payment Method
                        </Button>
                    }
                >
                    <div className={styles.paymentMethods}>
                        {mockPaymentMethods.map(method => (
                            <Card key={method.id} className={styles.methodCard}>
                                <Space align="start">
                                    <div className={styles.methodIcon}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <Text strong>{method.name}</Text>
                                        <br />
                                        <Text type="secondary">
                                            {method.type === 'card'
                                                ? `Expires ${method.expiryDate}`
                                                : `Account ending in ${method.accountEnding}`
                                            }
                                        </Text>
                                    </div>
                                </Space>
                                <div className={styles.methodActions}>
                                    <Button type="text" size="small">Edit</Button>
                                    <Button type="text" size="small" danger>Remove</Button>
                                </div>
                            </Card>
                        ))}
                        <Card
                            className={`${styles.methodCard} ${styles.addCard}`}
                            onClick={() => setPaymentModalVisible(true)}
                        >
                            <Button
                                type="dashed"
                                icon={<PlusOutlined />}
                                block
                            >
                                Add New Payment Method
                            </Button>
                        </Card>
                    </div>
                </Card>

                <div className={styles.exchangeSection} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Space direction="vertical" size={24} style={{ width: '48%' }}>
                        <Card title="Exchange" className={styles.exchangeCard}>
                            <div className={styles.exchangeForm}>
                                <div className={styles.exchangeInput}>
                                    <Form.Item label="From">
                                        <Input.Group compact>
                                            <Select
                                                style={{ width: '40%' }}
                                                defaultValue={mockBalances[0].coin}
                                            >
                                                {mockBalances.map(asset => (
                                                    <Select.Option key={asset.coin} value={asset.coin}>
                                                        <Space>
                                                            <img src={asset.icon} alt={asset.coin} width={20} height={20} />
                                                            {asset.coin}
                                                        </Space>
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                            <Input
                                                style={{ width: '60%' }}
                                                placeholder="Amount"
                                                suffix={
                                                    <Text type="secondary">
                                                        Available: {mockBalances[0].available}
                                                    </Text>
                                                }
                                            />
                                        </Input.Group>
                                    </Form.Item>
                                </div>
                                <Button
                                    type="text"
                                    icon={<SwapOutlined />}
                                    className={styles.exchangeButton}
                                />
                                <div className={styles.exchangeInput}>
                                    <Form.Item label="To">
                                        <Input.Group compact>
                                            <Select
                                                style={{ width: '40%' }}
                                                defaultValue="USDT"
                                            >
                                                {mockBalances.map(asset => (
                                                    <Select.Option key={asset.coin} value={asset.coin}>
                                                        <Space>
                                                            <img src={asset.icon} alt={asset.coin} width={20} height={20} />
                                                            {asset.coin}
                                                        </Space>
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                            <Input
                                                style={{ width: '60%' }}
                                                placeholder="Amount"
                                                disabled
                                            />
                                        </Input.Group>
                                    </Form.Item>
                                </div>
                                <Button type="primary" block>
                                    Exchange
                                </Button>
                            </div>
                        </Card>
                    </Space>
                    <Space direction="vertical" size={24} style={{ width: '48%' }}>
                        <Card title="How to Exchange" className={styles.videoCard}>
                            <div className={styles.videoContent}>
                                <div className={styles.videoWrapper}>
                                    <iframe
                                        src="https://www.youtube.com/embed/your-video-id"
                                        title="How to Exchange Crypto"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <div className={styles.videoInfo}>
                                    <Title level={4}>Quick Guide to Crypto Exchange</Title>
                                    <Text type="secondary">
                                        Learn how to easily exchange your cryptocurrencies at the best rates.
                                        Follow our step-by-step guide to make your first exchange.
                                    </Text>
                                    <Space className={styles.videoTags}>
                                        <Tag color="blue">Beginner Friendly</Tag>
                                        <Tag color="green">Step by Step</Tag>
                                        <Tag color="purple">Best Practices</Tag>
                                    </Space>
                                </div>
                            </div>
                        </Card>
                    </Space>
                </div>

                <Card>
                    <Tabs activeKey={selectedTab} onChange={setSelectedTab}>
                        <TabPane tab="Spot Wallet" key="spot">
                            <Table
                                columns={columns}
                                dataSource={mockBalances}
                                rowKey="coin"
                                pagination={false}
                            />
                        </TabPane>
                        <TabPane tab="Margin Wallet" key="margin">
                            <Table
                                columns={columns}
                                dataSource={mockBalances}
                                rowKey="coin"
                                pagination={false}
                            />
                        </TabPane>
                        <TabPane tab="Futures Wallet" key="futures">
                            <Table
                                columns={columns}
                                dataSource={mockBalances}
                                rowKey="coin"
                                pagination={false}
                            />
                        </TabPane>
                    </Tabs>
                </Card>

                <DepositModal
                    visible={depositModalVisible}
                    onClose={() => setDepositModalVisible(false)}
                    selectedCoin={selectedCoin}
                />
                <WithdrawModal
                    visible={withdrawModalVisible}
                    onClose={() => setWithdrawModalVisible(false)}
                    selectedCoin={selectedCoin}
                    onWithdraw={console.log}
                />
                <PaymentMethodModal
                    visible={paymentModalVisible}
                    onClose={() => setPaymentModalVisible(false)}
                    onSubmit={handlePaymentMethodSubmit}
                />

                <Card
                    title="Transaction History"
                    className={styles.transactionCard}
                    style={{ marginTop: '20px' }}
                    extra={
                        <Radio.Group defaultValue="all">
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="deposit">Deposits</Radio.Button>
                            <Radio.Button value="withdrawal">Withdrawals</Radio.Button>
                            <Radio.Button value="exchange">Exchange</Radio.Button>
                        </Radio.Group>
                    }
                >
                    <Table
                        dataSource={mockTransactions}
                        columns={[
                            {
                                title: 'Type',
                                dataIndex: 'type',
                                key: 'type',
                                render: (type: string) => (
                                    <Tag color={type === 'deposit' ? 'green' : type === 'withdrawal' ? 'blue' : 'purple'}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Tag>
                                ),
                            },
                            {
                                title: 'Date & Time',
                                dataIndex: 'timestamp',
                                key: 'timestamp',
                                render: (timestamp: Date) => (
                                    <Text>{timestamp.toLocaleString()}</Text>
                                ),
                            },
                            {
                                title: 'Amount',
                                key: 'amount',
                                render: (record: any) => (
                                    <Space direction="vertical" size={0}>
                                        <Text>{record.amount} {record.coin}</Text>
                                        {record.toCoin && (
                                            <Text type="secondary">→ {record.toAmount} {record.toCoin}</Text>
                                        )}
                                    </Space>
                                ),
                            },
                            {
                                title: 'Status',
                                dataIndex: 'status',
                                key: 'status',
                                render: (status: string) => {
                                    const statusConfig = {
                                        completed: { icon: <CheckCircleOutlined />, color: 'success' },
                                        pending: { icon: <ClockCircleOutlined />, color: 'warning' },
                                        failed: { icon: <ExclamationCircleOutlined />, color: 'error' }
                                    };
                                    const config = statusConfig[status as keyof typeof statusConfig];
                                    return (
                                        <Tag icon={config.icon} color={config.color}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </Tag>
                                    );
                                },
                            },
                            {
                                title: 'Network',
                                dataIndex: 'network',
                                key: 'network',
                                render: (network: string) => network && <Text type="secondary">{network}</Text>,
                            },
                            {
                                title: 'Action',
                                key: 'action',
                                render: (record: any) => (
                                    <Space>
                                        {record.txHash && (
                                            <Tooltip title="View on Explorer">
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    onClick={() => window.open(`https://explorer.example.com/tx/${record.txHash}`, '_blank')}
                                                >
                                                    View
                                                </Button>
                                            </Tooltip>
                                        )}
                                        <Button type="link" size="small">Details</Button>
                                    </Space>
                                ),
                            },
                        ]}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                    />
                </Card>
            </Content>
        </Layout>
    );
};

export default Wallet; 