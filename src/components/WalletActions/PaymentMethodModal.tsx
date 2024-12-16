import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Space, Divider } from 'antd';
import { CreditCardOutlined, BankOutlined } from '@ant-design/icons';
import styles from './WalletActions.module.scss';

interface PaymentMethodModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ visible, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const [methodType, setMethodType] = useState<'card' | 'bank'>('card');

    const formatCardNumber = (value: string) => {
        return value
            .replace(/\s/g, '')
            .match(/.{1,4}/g)
            ?.join(' ')
            .substr(0, 19) || '';
    };

    const validateCardNumber = (_: any, value: string) => {
        const cardNumber = value.replace(/\s/g, '');
        if (!cardNumber) {
            return Promise.reject('Please enter card number');
        }
        if (!/^\d{16}$/.test(cardNumber)) {
            return Promise.reject('Please enter valid card number');
        }
        return Promise.resolve();
    };

    const validateExpiryDate = (_: any, value: string) => {
        if (!value) {
            return Promise.reject('Please enter expiry date');
        }
        if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
            return Promise.reject('Please enter valid expiry date (MM/YY)');
        }
        const [month, year] = value.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        if (expiry < new Date()) {
            return Promise.reject('Card has expired');
        }
        return Promise.resolve();
    };

    return (
        <Modal
            title="Add Payment Method"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={480}
        >
            <div className={styles.methodSelector}>
                <Space size="large">
                    <Button
                        type={methodType === 'card' ? 'primary' : 'default'}
                        icon={<CreditCardOutlined />}
                        onClick={() => setMethodType('card')}
                    >
                        Credit/Debit Card
                    </Button>
                    <Button
                        type={methodType === 'bank' ? 'primary' : 'default'}
                        icon={<BankOutlined />}
                        onClick={() => setMethodType('bank')}
                    >
                        Bank Account
                    </Button>
                </Space>
            </div>

            <Divider />

            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
            >
                {methodType === 'card' ? (
                    <>
                        <Form.Item
                            name="cardNumber"
                            label="Card Number"
                            rules={[{ validator: validateCardNumber }]}
                            getValueFromEvent={e => formatCardNumber(e.target.value)}
                        >
                            <Input 
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                            />
                        </Form.Item>

                        <Space style={{ width: '100%', gap: 16 }}>
                            <Form.Item
                                name="expiryDate"
                                label="Expiry Date"
                                rules={[{ validator: validateExpiryDate }]}
                                style={{ width: '50%' }}
                            >
                                <Input 
                                    placeholder="MM/YY"
                                    maxLength={5}
                                />
                            </Form.Item>

                            <Form.Item
                                name="cvv"
                                label="CVV"
                                rules={[{ 
                                    required: true,
                                    pattern: /^\d{3,4}$/,
                                    message: 'Please enter valid CVV'
                                }]}
                                style={{ width: '50%' }}
                            >
                                <Input 
                                    placeholder="123"
                                    maxLength={4}
                                    type="password"
                                />
                            </Form.Item>
                        </Space>
                    </>
                ) : (
                    <>
                        <Form.Item
                            name="accountName"
                            label="Account Holder Name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="John Doe" />
                        </Form.Item>

                        <Form.Item
                            name="routingNumber"
                            label="Routing Number"
                            rules={[{ 
                                required: true,
                                pattern: /^\d{9}$/,
                                message: 'Please enter valid routing number'
                            }]}
                        >
                            <Input placeholder="123456789" maxLength={9} />
                        </Form.Item>

                        <Form.Item
                            name="accountNumber"
                            label="Account Number"
                            rules={[{ 
                                required: true,
                                pattern: /^\d{8,17}$/,
                                message: 'Please enter valid account number'
                            }]}
                        >
                            <Input placeholder="12345678" maxLength={17} />
                        </Form.Item>
                    </>
                )}

                <Button type="primary" htmlType="submit" block>
                    Add Payment Method
                </Button>
            </Form>
        </Modal>
    );
};

export default PaymentMethodModal; 