import React from 'react';
import { Modal, Form, Input, Select, Space, Button, InputNumber } from 'antd';
import { mockCollateral } from '../../data/mockLoanData';

interface NewLoanModalProps {
    visible: boolean;
    onClose: () => void;
}

const NewLoanModal: React.FC<NewLoanModalProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        console.log('New loan values:', values);
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Create New Loan"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="amount"
                    label="Loan Amount"
                    rules={[{ required: true, message: 'Please enter loan amount' }]}
                >
                    <Space>
                        <InputNumber
                            style={{ width: 200 }}
                            min={0}
                            placeholder="Enter amount"
                        />
                        <Select style={{ width: 120 }} defaultValue="USDT">
                            <Select.Option value="USDT">USDT</Select.Option>
                            <Select.Option value="USDC">USDC</Select.Option>
                        </Select>
                    </Space>
                </Form.Item>

                <Form.Item
                    name="collateral"
                    label="Collateral"
                    rules={[{ required: true, message: 'Please select collateral' }]}
                >
                    <Select>
                        {mockCollateral.map(asset => (
                            <Select.Option key={asset.coin} value={asset.coin}>
                                <Space>
                                    <img 
                                        src={asset.icon} 
                                        alt={asset.coin} 
                                        style={{ width: 20, height: 20 }}
                                    />
                                    {asset.coin} (Available: {asset.amount})
                                </Space>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="collateralAmount"
                    label="Collateral Amount"
                    rules={[{ required: true, message: 'Please enter collateral amount' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="Enter collateral amount"
                    />
                </Form.Item>

                <Form.Item
                    name="duration"
                    label="Loan Duration"
                    rules={[{ required: true, message: 'Please select loan duration' }]}
                >
                    <Select>
                        <Select.Option value={30}>30 Days</Select.Option>
                        <Select.Option value={90}>90 Days</Select.Option>
                        <Select.Option value={180}>180 Days</Select.Option>
                        <Select.Option value={365}>365 Days</Select.Option>
                    </Select>
                </Form.Item>

                <div style={{ textAlign: 'right', marginTop: 24 }}>
                    <Space>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create Loan
                        </Button>
                    </Space>
                </div>
            </Form>
        </Modal>
    );
};

export default NewLoanModal; 