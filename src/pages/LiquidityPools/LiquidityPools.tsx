import React, { useState } from 'react';
import { Layout, Card, Table, Button, Typography, Space, Tag, Progress, Statistic, Row, Col, Tooltip } from 'antd';
import { 
    LineChartOutlined,
    PlusOutlined,
    InfoCircleOutlined,
    DollarOutlined,
    BarChartOutlined,
    SwapOutlined
} from '@ant-design/icons';
import styles from './LiquidityPools.module.scss';
import { mockPools } from '../../data/mockLiquidityData';
import AddLiquidityModal from '../../components/LiquidityActions/AddLiquidityModal';

const { Content } = Layout;
const { Title, Text } = Typography;

const LiquidityPools: React.FC = () => {
    const [addLiquidityVisible, setAddLiquidityVisible] = useState(false);
    const [selectedPool, setSelectedPool] = useState<any>(null);

    const columns = [
        {
            title: 'Pool',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: any) => (
                <Space>
                    <div className={styles.poolIcons}>
                        <img src={record.token1Icon} alt={record.token1} />
                        <img src={record.token2Icon} alt={record.token2} />
                    </div>
                    <Text strong>{record.token1}/{record.token2}</Text>
                </Space>
            ),
        },
        {
            title: () => (
                <Space>
                    TVL
                    <Tooltip title="Total Value Locked in the pool">
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            ),
            dataIndex: 'tvl',
            key: 'tvl',
            render: (tvl: number) => (
                <Text>${tvl.toLocaleString()}</Text>
            ),
            sorter: (a: any, b: any) => a.tvl - b.tvl,
        },
        {
            title: () => (
                <Space>
                    APR
                    <Tooltip title="Annual Percentage Rate">
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            ),
            dataIndex: 'apr',
            key: 'apr',
            render: (apr: number) => (
                <Tag color="green">{apr}%</Tag>
            ),
            sorter: (a: any, b: any) => a.apr - b.apr,
        },
        {
            title: '24h Volume',
            dataIndex: 'volume24h',
            key: 'volume24h',
            render: (volume: number) => (
                <Text>${volume.toLocaleString()}</Text>
            ),
            sorter: (a: any, b: any) => a.volume24h - b.volume24h,
        },
        {
            title: 'My Share',
            dataIndex: 'userShare',
            key: 'userShare',
            render: (share: number) => (
                share > 0 ? (
                    <Space direction="vertical" size={0}>
                        <Progress 
                            percent={share} 
                            size="small" 
                            showInfo={false}
                            strokeColor="#1890ff"
                        />
                        <Text type="secondary">{share}%</Text>
                    </Space>
                ) : (
                    <Text type="secondary">-</Text>
                )
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setSelectedPool(record);
                            setAddLiquidityVisible(true);
                        }}
                    >
                        Add Liquidity
                    </Button>
                    {record.userShare > 0 && (
                        <Button type="default" icon={<SwapOutlined />}>
                            Remove
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Layout className={styles.liquidityPools}>
            <Content className={styles.content}>
                <Title level={2} style={{ marginTop: 0 }}>Liquidity Pools</Title>

                <Row gutter={[16, 16]} className={styles.statistics}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card>
                            <Statistic
                                title="Total Value Locked"
                                value={mockPools.reduce((acc, pool) => acc + pool.tvl, 0)}
                                prefix="$"
                                precision={0}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card>
                            <Statistic
                                title="24h Trading Volume"
                                value={mockPools.reduce((acc, pool) => acc + pool.volume24h, 0)}
                                prefix="$"
                                precision={0}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card>
                            <Statistic
                                title="Active Pools"
                                value={mockPools.length}
                                prefix={<BarChartOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card>
                            <Statistic
                                title="My Total Value"
                                value={mockPools.reduce((acc, pool) => acc + (pool.tvl * pool.userShare / 100), 0)}
                                prefix="$"
                                precision={2}
                            />
                        </Card>
                    </Col>
                </Row>

                <Card>
                    <Table 
                        columns={columns}
                        dataSource={mockPools}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>

                <AddLiquidityModal
                    visible={addLiquidityVisible}
                    pool={selectedPool}
                    onClose={() => {
                        setAddLiquidityVisible(false);
                        setSelectedPool(null);
                    }}
                />
            </Content>
        </Layout>
    );
};

export default LiquidityPools; 