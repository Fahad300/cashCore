import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Typography, Space } from 'antd';
import styles from './WalletActions.module.scss';

const { Text } = Typography;

interface WithdrawModalProps {
    visible: boolean;
    onClose: () => void;
    selectedCoin: {
        coin: string;
        icon: string;
        available: number;
        network: string[];
    } | null;
    onWithdraw: (values: any) => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ 
    visible, 
    onClose, 
    selectedCoin,
    onWithdraw 
}) => {
    const [form] = Form.useForm();
    const [amount, setAmount] = useState<number>(0);

    if (!selectedCoin) return null;

    const handleSubmit = (values: any) => {
        onWithdraw(values);
        onClose();
    };

    return (
        <Modal
            title={`Withdraw ${selectedCoin.coin}`}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className={styles.withdrawForm}
            >
                <div className={styles.availableBalance}>
                    <Text type="secondary">Available Balance:</Text>
                    <Text strong>{selectedCoin.available} {selectedCoin.coin}</Text>
                </div>

                <Form.Item
                    name="network"
                    label="Network"
                    rules={[{ required: true, message: 'Please select a network' }]}
                >
                    <Select>
                        {selectedCoin.network.map(net => (
                            <Select.Option key={net} value={net}>{net}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Withdrawal Address"
                    rules={[{ required: true, message: 'Please enter withdrawal address' }]}
                >
                    <Input placeholder="Enter address" />
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please enter amount' }]}
                >
                    <Input
                        type="number"
                        suffix={selectedCoin.coin}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </Form.Item>

                <div className={styles.percentButtons}>
                    {[25, 50, 75, 100].map(percent => (
                        <Button
                            key={percent}
                            size="small"
                            onClick={() => {
                                const value = (selectedCoin.available * percent) / 100;
                                setAmount(value);
                                form.setFieldsValue({ amount: value });
                            }}
                        >
                            {percent}%
                        </Button>
                    ))}
                </div>

                <Button type="primary" htmlType="submit" block>
                    Withdraw
                </Button>
            </Form>
        </Modal>
    );
};

export default WithdrawModal; 