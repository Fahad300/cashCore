import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Space, List, Tag } from 'antd';
import { BellOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Coin } from '../../data/mockMarketData';

interface PriceAlert {
    id: string;
    coinId: string;
    price: number;
    condition: 'above' | 'below';
    active: boolean;
}

interface PriceAlertProps {
    coin: Coin;
    visible: boolean;
    onClose: () => void;
}

const PriceAlert: React.FC<PriceAlertProps> = ({ coin, visible, onClose }) => {
    const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
        const stored = localStorage.getItem(`alerts-${coin.id}`);
        return stored ? JSON.parse(stored) : [];
    });

    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        const newAlert: PriceAlert = {
            id: Date.now().toString(),
            coinId: coin.id,
            price: values.price,
            condition: values.condition,
            active: true
        };

        const updatedAlerts = [...alerts, newAlert];
        setAlerts(updatedAlerts);
        localStorage.setItem(`alerts-${coin.id}`, JSON.stringify(updatedAlerts));
        form.resetFields();
    };

    const deleteAlert = (alertId: string) => {
        const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
        setAlerts(updatedAlerts);
        localStorage.setItem(`alerts-${coin.id}`, JSON.stringify(updatedAlerts));
    };

    return (
        <Modal
            title={`Set Price Alert for ${coin.name}`}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Space style={{ width: '100%' }} direction="vertical">
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" prefix="$" />
                    </Form.Item>
                    <Form.Item
                        name="condition"
                        label="Condition"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="above">Above</Select.Option>
                            <Select.Option value="below">Below</Select.Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Alert
                    </Button>
                </Space>
            </Form>

            <List
                style={{ marginTop: 24 }}
                header="Active Alerts"
                dataSource={alerts}
                renderItem={(alert) => (
                    <List.Item
                        actions={[
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => deleteAlert(alert.id)}
                            />
                        ]}
                    >
                        <Space>
                            <Tag color={alert.condition === 'above' ? 'green' : 'red'}>
                                {alert.condition === 'above' ? '↑' : '↓'}
                            </Tag>
                            ${alert.price}
                        </Space>
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default PriceAlert; 