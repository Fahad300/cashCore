import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Space, Button } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import styles from './TransactionSearch.module.scss';

const { RangePicker } = DatePicker;

interface TransactionSearchProps {
    visible: boolean;
    onClose: () => void;
    onSearch: (values: any) => void;
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({ visible, onClose, onSearch }) => {
    const [form] = Form.useForm();

    const handleSearch = (values: any) => {
        onSearch(values);
        onClose();
    };

    const handleReset = () => {
        form.resetFields();
    };

    return (
        <Modal
            title="Advanced Search"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSearch}
                className={styles.searchForm}
            >
                <Form.Item name="transactionId" label="Transaction ID">
                    <Input placeholder="Enter transaction ID" />
                </Form.Item>

                <Form.Item name="type" label="Transaction Type">
                    <Select
                        mode="multiple"
                        placeholder="Select transaction types"
                        allowClear
                    >
                        <Select.Option value="deposit">Deposit</Select.Option>
                        <Select.Option value="withdrawal">Withdrawal</Select.Option>
                        <Select.Option value="exchange">Exchange</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="status" label="Status">
                    <Select
                        mode="multiple"
                        placeholder="Select status"
                        allowClear
                    >
                        <Select.Option value="completed">Completed</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="failed">Failed</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="coin" label="Coin">
                    <Select
                        mode="multiple"
                        placeholder="Select coins"
                        allowClear
                    >
                        <Select.Option value="BTC">Bitcoin (BTC)</Select.Option>
                        <Select.Option value="ETH">Ethereum (ETH)</Select.Option>
                        <Select.Option value="USDT">Tether (USDT)</Select.Option>
                        {/* Add more coins */}
                    </Select>
                </Form.Item>

                <Form.Item name="dateRange" label="Date Range">
                    <RangePicker 
                        showTime 
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item name="amount" label="Amount Range">
                    <Space>
                        <Input type="number" placeholder="Min" />
                        <Input type="number" placeholder="Max" />
                    </Space>
                </Form.Item>

                <div className={styles.formActions}>
                    <Button onClick={handleReset} icon={<ClearOutlined />}>
                        Reset
                    </Button>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                        Search
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default TransactionSearch; 