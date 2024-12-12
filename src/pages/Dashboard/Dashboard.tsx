import React from 'react';
import { Row, Col, Card, Statistic, Grid } from 'antd';
import {
    DollarOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    UserOutlined
} from '@ant-design/icons';
import styles from './Dashboard.module.scss';

const { useBreakpoint } = Grid;

const Dashboard = () => {
    const screens = useBreakpoint();

    const stats = [
        {
            title: 'Total Revenue',
            value: 54232,
            prefix: <DollarOutlined />,
            color: '#1890ff'
        },
        {
            title: 'Growth',
            value: 32.02,
            prefix: <ArrowUpOutlined />,
            color: '#52c41a',
            suffix: '%'
        },
        {
            title: 'Active Users',
            value: 1234,
            prefix: <UserOutlined />,
            color: '#722ed1'
        },
        {
            title: 'Expenses',
            value: 12345,
            prefix: <ArrowDownOutlined />,
            color: '#ff4d4f'
        }
    ];

    // Calculate column spans based on screen size
    const getColSpan = () => {
        if (screens.xxl) return 6;
        if (screens.xl) return 6;
        if (screens.lg) return 8;
        if (screens.md) return 12;
        return 24;
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
                <p className={styles.subtitle}>Welcome back, John Doe</p>
            </div>

            <Row gutter={[
                { xs: 8, sm: 16, md: 24 },
                { xs: 8, sm: 16, md: 24 }
            ]}>
                {stats.map((stat, index) => (
                    <Col 
                        key={index} 
                        xs={24} 
                        sm={12} 
                        lg={6}
                        className={styles.statCol}
                    >
                        <Card hoverable className={styles.statCard}>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.prefix}
                                suffix={stat.suffix}
                                valueStyle={{ color: stat.color }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row 
                gutter={[
                    { xs: 8, sm: 16, md: 24 },
                    { xs: 8, sm: 16, md: 24 }
                ]}
                className={styles.contentRow}
            >
                <Col xs={24} xl={16}>
                    <Card title="Recent Activity" className={styles.chartCard}>
                        {/* Add chart component here */}
                        <div style={{ height: 300 }} />
                    </Card>
                </Col>
                <Col xs={24} xl={8}>
                    <Card title="Quick Actions" className={styles.actionsCard}>
                        {/* Add quick actions here */}
                        <div style={{ height: 300 }} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard; 