import React from 'react';
import { Card, Button, notification, Typography, Row, Col, Space } from 'antd';
import { 
    CheckCircleOutlined, 
    InfoCircleOutlined, 
    WarningOutlined, 
    CloseCircleOutlined 
} from '@ant-design/icons';
import styles from './Notifications.module.scss';

const { Title, Paragraph } = Typography;

const Notifications = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: 'success' | 'info' | 'warning' | 'error') => {
        const config = {
            message: 'Notification Title',
            description: 'This is the content of the notification.',
            icon: {
                success: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                info: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
                warning: <WarningOutlined style={{ color: '#faad14' }} />,
                error: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            }[type]
        };

        api[type](config);
    };

    return (
        <div className={styles.notificationsPage}>
            {contextHolder}
            <Title level={2}>Notifications</Title>
            <Paragraph>
                Display global messages to users.
            </Paragraph>

            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card title="Notification Types">
                        <Space>
                            <Button type="primary" onClick={() => openNotification('success')}>
                                Success
                            </Button>
                            <Button onClick={() => openNotification('info')}>
                                Info
                            </Button>
                            <Button onClick={() => openNotification('warning')}>
                                Warning
                            </Button>
                            <Button danger onClick={() => openNotification('error')}>
                                Error
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Notifications; 