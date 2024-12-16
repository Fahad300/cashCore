import React from 'react';
import { Layout, Typography, Menu, Card, Space, Table, Alert } from 'antd';
import { BookOutlined, CodeOutlined, ApiOutlined } from '@ant-design/icons';
import styles from './Documentation.module.scss';

const { Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;

const Documentation: React.FC = () => {
    return (
        <Layout className={styles.documentation}>
            <Sider
                width={250}
                className={styles.docSider}
                theme="light"
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['getting-started']}
                    items={[
                        {
                            key: 'getting-started',
                            icon: <BookOutlined />,
                            label: 'Getting Started'
                        },
                        {
                            key: 'components',
                            icon: <CodeOutlined />,
                            label: 'Components',
                            children: [
                                { key: 'installation', label: 'Installation' },
                                { key: 'usage', label: 'Usage' },
                                { key: 'customization', label: 'Customization' }
                            ]
                        },
                        {
                            key: 'api',
                            icon: <ApiOutlined />,
                            label: 'API Reference'
                        }
                    ]}
                />
            </Sider>
            <Content className={styles.docContent}>
                <Card>
                    <Title level={2}>Getting Started</Title>
                    <Paragraph>
                        Welcome to our comprehensive documentation. This guide will help you get started with our platform.
                    </Paragraph>
                    
                    <Title level={3}>Quick Start</Title>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Alert
                            message="Prerequisites"
                            description="Make sure you have Node.js and npm installed on your system."
                            type="info"
                            showIcon
                        />
                        
                        <div className={styles.codeBlock}>
                            <Text code>npm install @your-package/name</Text>
                        </div>
                        
                        {/* Add more documentation content */}
                    </Space>
                </Card>
            </Content>
        </Layout>
    );
};

export default Documentation; 