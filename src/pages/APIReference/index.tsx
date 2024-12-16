import React from 'react';
import { Typography, Card, Tabs, Table, Tag, Space } from 'antd';
import { ApiOutlined, CodeOutlined, KeyOutlined } from '@ant-design/icons';
import styles from './APIReference.module.scss';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const APIReference = () => {
    const endpointColumns = [
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            render: (method: string) => {
                const color = 
                    method === 'GET' ? 'green' :
                    method === 'POST' ? 'blue' :
                    method === 'PUT' ? 'orange' :
                    'red';
                return <Tag color={color}>{method}</Tag>;
            },
        },
        {
            title: 'Endpoint',
            dataIndex: 'endpoint',
            key: 'endpoint',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    const marketEndpoints = [
        {
            key: '1',
            method: 'GET',
            endpoint: '/api/v1/market/prices',
            description: 'Get current market prices for all cryptocurrencies',
        },
        {
            key: '2',
            method: 'GET',
            endpoint: '/api/v1/market/ticker/{symbol}',
            description: 'Get detailed ticker information for a specific cryptocurrency',
        },
    ];

    const tradingEndpoints = [
        {
            key: '1',
            method: 'POST',
            endpoint: '/api/v1/trading/orders',
            description: 'Place a new trading order',
        },
        {
            key: '2',
            method: 'GET',
            endpoint: '/api/v1/trading/orders',
            description: 'Get list of orders',
        },
    ];

    return (
        <div className={styles.apiReference}>
            <Title level={2}>API Reference</Title>
            <Paragraph>
                Complete reference documentation for the Finance Dashboard API.
            </Paragraph>

            <Card className={styles.authentication}>
                <Title level={3}>
                    <KeyOutlined /> Authentication
                </Title>
                <Paragraph>
                    All API endpoints require authentication using an API key. Include your API key in the request headers:
                </Paragraph>
                <pre className={styles.codeBlock}>
                    <code>
                        {`Authorization: Bearer your_api_key_here`}
                    </code>
                </pre>
            </Card>

            <Card>
                <Tabs defaultActiveKey="market">
                    <TabPane 
                        tab={
                            <span>
                                <ApiOutlined /> Market Data
                            </span>
                        } 
                        key="market"
                    >
                        <Table 
                            columns={endpointColumns} 
                            dataSource={marketEndpoints}
                            pagination={false}
                        />
                    </TabPane>
                    <TabPane 
                        tab={
                            <span>
                                <CodeOutlined /> Trading
                            </span>
                        } 
                        key="trading"
                    >
                        <Table 
                            columns={endpointColumns} 
                            dataSource={tradingEndpoints}
                            pagination={false}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default APIReference; 