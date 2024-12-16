import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Typography, Card, Divider } from 'antd';
import { SwapOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface AddLiquidityModalProps {
    visible: boolean;
    pool: any;
    onClose: () => void;
}

const AddLiquidityModal: React.FC<AddLiquidityModalProps> = ({ visible, pool, onClose }) => {
    const [form] = Form.useForm();
    const [token1Amount, setToken1Amount] = useState<string>('');
    const [token2Amount, setToken2Amount] = useState<string>('');

    useEffect(() => {
        if (!visible) {
            form.resetFields();
            setToken1Amount('');
            setToken2Amount('');
        }
    }, [visible, form]);

    const handleToken1Change = (value: string) => {
        setToken1Amount(value);
        if (pool) {
            const token2Value = (Number(value) * pool.token2Reserve / pool.token1Reserve).toString();
            setToken2Amount(token2Value);
            form.setFieldsValue({ token2Amount: token2Value });
        }
    };

    const handleToken2Change = (value: string) => {
        setToken2Amount(value);
        if (pool) {
            const token1Value = (Number(value) * pool.token1Reserve / pool.token2Reserve).toString();
            setToken1Amount(token1Value);
            form.setFieldsValue({ token1Amount: token1Value });
        }
    };

    if (!pool) return null;

    return (
        <Modal
            title="Add Liquidity"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={480}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    console.log('Form values:', values);
                    onClose();
                }}
            >
                <Card>
                    <Form.Item
                        name="token1Amount"
                        label={
                            <Space>
                                <img 
                                    src={pool.token1Icon} 
                                    alt={pool.token1} 
                                    style={{ width: 20, height: 20 }}
                                />
                                {pool.token1}
                            </Space>
                        }
                    >
                        <Input
                            type="number"
                            placeholder="0.0"
                            onChange={(e) => handleToken1Change(e.target.value)}
                            value={token1Amount}
                        />
                    </Form.Item>

                    <div style={{ textAlign: 'center', margin: '8px 0' }}>
                        <SwapOutlined rotate={90} />
                    </div>

                    <Form.Item
                        name="token2Amount"
                        label={
                            <Space>
                                <img 
                                    src={pool.token2Icon} 
                                    alt={pool.token2} 
                                    style={{ width: 20, height: 20 }}
                                />
                                {pool.token2}
                            </Space>
                        }
                    >
                        <Input
                            type="number"
                            placeholder="0.0"
                            onChange={(e) => handleToken2Change(e.target.value)}
                            value={token2Amount}
                        />
                    </Form.Item>
                </Card>

                <Divider />

                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text type="secondary">Pool Share:</Text>
                        <Text>
                            {token1Amount && token2Amount
                                ? ((Number(token1Amount) * pool.token1Price) / pool.tvl * 100).toFixed(2)
                                : '0.00'}%
                        </Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text type="secondary">Current Price:</Text>
                        <Text>1 {pool.token1} = {(pool.token2Reserve / pool.token1Reserve).toFixed(4)} {pool.token2}</Text>
                    </div>
                </Space>

                <Button 
                    type="primary" 
                    htmlType="submit" 
                    block 
                    style={{ marginTop: 24 }}
                    disabled={!token1Amount || !token2Amount}
                >
                    Add Liquidity
                </Button>
            </Form>
        </Modal>
    );
};

export default AddLiquidityModal; 