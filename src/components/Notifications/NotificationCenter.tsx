import React from 'react';
import { List, Badge, Empty, Tabs, Typography, Tag, Button } from 'antd';
import { BellOutlined, CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import styles from './NotificationCenter.module.scss';
import { mockNotifications } from '../../data/mockNotificationData';

const { Text } = Typography;
const { TabPane } = Tabs;

const NotificationCenter: React.FC = () => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
            case 'error': return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
            case 'warning': return <WarningOutlined style={{ color: '#faad14' }} />;
            default: return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
        }
    };

    const getTimeAgo = (timestamp: string) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diff = now.getTime() - past.getTime();
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 60) return `${minutes}m ago`;
        if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
        return `${Math.floor(minutes / 1440)}d ago`;
    };

    return (
        <div className={styles.notificationCenter}>
            <Tabs defaultActiveKey="all">
                <TabPane 
                    tab={<Badge count={mockNotifications.length} size="small">All</Badge>} 
                    key="all"
                >
                    <List
                        dataSource={mockNotifications}
                        renderItem={item => (
                            <List.Item className={styles.notificationItem}>
                                <List.Item.Meta
                                    avatar={getIcon(item.type)}
                                    title={
                                        <div className={styles.notificationTitle}>
                                            <Text strong>{item.title}</Text>
                                            <Tag color={item.read ? 'default' : 'blue'}>
                                                {item.read ? 'Read' : 'New'}
                                            </Tag>
                                        </div>
                                    }
                                    description={
                                        <div className={styles.notificationContent}>
                                            <Text>{item.message}</Text>
                                            <Text type="secondary">{getTimeAgo(item.timestamp)}</Text>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                        locale={{
                            emptyText: <Empty description="No notifications" />
                        }}
                    />
                    <div className={styles.actions}>
                        <Button type="link">Mark all as read</Button>
                        <Button type="link">Clear all</Button>
                    </div>
                </TabPane>
                <TabPane tab="Unread" key="unread">
                    {/* Similar list with unread notifications */}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default NotificationCenter; 