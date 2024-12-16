import React from 'react';
import { Typography, Card, Anchor, Space, Alert } from 'antd';
import { BookOutlined, RocketOutlined, ToolOutlined, QuestionOutlined } from '@ant-design/icons';
import styles from './Documentation.module.scss';

const { Title, Paragraph, Text } = Typography;
const { Link } = Anchor;

const Documentation = () => {
    return (
        <div className={styles.documentation}>
            <Title level={2}>Documentation</Title>
            <Paragraph>
                Welcome to the Finance Dashboard documentation. Here you'll find comprehensive guides and documentation to help you start working with our platform as quickly as possible.
            </Paragraph>

            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <Anchor>
                        <Link href="#getting-started" title="Getting Started" />
                        <Link href="#installation" title="Installation" />
                        <Link href="#configuration" title="Configuration" />
                        <Link href="#features" title="Features">
                            <Link href="#dashboard" title="Dashboard" />
                            <Link href="#market" title="Market" />
                            <Link href="#trading" title="Trading" />
                            <Link href="#wallet" title="Wallet" />
                        </Link>
                    </Anchor>
                </div>

                <div className={styles.mainContent}>
                    <section id="getting-started">
                        <Title level={3}>Getting Started</Title>
                        <Card>
                            <Space direction="vertical" size="large">
                                <div>
                                    <Title level={4}>
                                        <RocketOutlined /> Quick Start
                                    </Title>
                                    <Paragraph>
                                        The Finance Dashboard is a comprehensive platform for managing cryptocurrency investments, trading, and portfolio analysis.
                                    </Paragraph>
                                </div>

                                <Alert
                                    message="Prerequisites"
                                    description="Before you begin, make sure you have Node.js (version 14 or higher) and npm installed on your system."
                                    type="info"
                                    showIcon
                                />
                            </Space>
                        </Card>
                    </section>

                    <section id="installation">
                        <Title level={3}>Installation</Title>
                        <Card>
                            <Title level={4}>
                                <ToolOutlined /> Setup Instructions
                            </Title>
                            <Paragraph>
                                1. Clone the repository:
                            </Paragraph>
                            <pre className={styles.codeBlock}>
                                <code>
                                    git clone https://github.com/yourusername/finance-dashboard.git
                                </code>
                            </pre>
                            <Paragraph>
                                2. Install dependencies:
                            </Paragraph>
                            <pre className={styles.codeBlock}>
                                <code>
                                    cd finance-dashboard
                                    npm install
                                </code>
                            </pre>
                            <Paragraph>
                                3. Start the development server:
                            </Paragraph>
                            <pre className={styles.codeBlock}>
                                <code>
                                    npm start
                                </code>
                            </pre>
                        </Card>
                    </section>

                    <section id="configuration">
                        <Title level={3}>Configuration</Title>
                        <Card>
                            <Title level={4}>
                                <ToolOutlined /> Environment Setup
                            </Title>
                            <Paragraph>
                                Create a .env file in the root directory with the following variables:
                            </Paragraph>
                            <pre className={styles.codeBlock}>
                                <code>
                                    REACT_APP_API_URL=your_api_url_here
                                    REACT_APP_WS_URL=your_websocket_url_here
                                </code>
                            </pre>
                        </Card>
                    </section>

                    <section id="features">
                        <Title level={3}>Features</Title>
                        
                        <section id="dashboard">
                            <Card>
                                <Title level={4}>Dashboard</Title>
                                <Paragraph>
                                    The dashboard provides an overview of your portfolio, market trends, and key metrics.
                                </Paragraph>
                                <ul>
                                    <li>Portfolio Overview</li>
                                    <li>Market Summary</li>
                                    <li>Recent Transactions</li>
                                    <li>Price Alerts</li>
                                </ul>
                            </Card>
                        </section>

                        <section id="market">
                            <Card>
                                <Title level={4}>Market</Title>
                                <Paragraph>
                                    Track cryptocurrency prices, market caps, and trading volumes in real-time.
                                </Paragraph>
                                <ul>
                                    <li>Price Charts</li>
                                    <li>Market Analysis</li>
                                    <li>Trading Pairs</li>
                                    <li>Order Book</li>
                                </ul>
                            </Card>
                        </section>

                        {/* Add more feature sections as needed */}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Documentation; 