import React, { useState } from 'react';
import { Layout, Card, Table, Tag, Space, Button, Typography, Modal, Descriptions, Timeline, Tooltip } from 'antd';
import { 
    CheckCircleOutlined, 
    ClockCircleOutlined, 
    ExclamationCircleOutlined,
    SearchOutlined,
    LinkOutlined,
    CopyOutlined,
    DownloadOutlined,
    FilterOutlined
} from '@ant-design/icons';
import styles from './Transactions.module.scss';
import { mockTransactions } from '../../data/mockTransactionData';
import { ColumnType } from 'antd/es/table';
import TransactionSearch from '../../components/TransactionSearch/TransactionSearch';
import * as XLSX from 'xlsx';

const { Content } = Layout;
const { Text, Title } = Typography;

interface TransactionDetail {
    id: string;
    type: 'deposit' | 'withdrawal' | 'exchange';
    coin: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    timestamp: string;
    txHash?: string;
    from?: string;
    to?: string;
    network?: string;
    toCoin?: string;
    toAmount?: number;
}

const Transactions: React.FC = () => {
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [filters, setFilters] = useState<any>(null);

    const handleViewDetails = (record: TransactionDetail) => {
        setSelectedTransaction(record);
        setDetailModalVisible(true);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const handleExport = (transactions: TransactionDetail | TransactionDetail[] = mockTransactions) => {
        const dataToExport = Array.isArray(transactions) ? transactions : [transactions];
        
        const exportData = dataToExport.map(tx => ({
            'Transaction ID': tx.id,
            'Type': tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
            'Date & Time': new Date(tx.timestamp).toLocaleString(),
            'Coin': tx.coin,
            'Amount': tx.amount,
            'Status': tx.status.charAt(0).toUpperCase() + tx.status.slice(1),
            'Network': tx.network || '-',
            'From': tx.from || '-',
            'To': tx.to || '-',
            'Hash': tx.txHash || '-'
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
        XLSX.writeFile(wb, `transactions_${new Date().toISOString()}.xlsx`);
    };

    const handleExportClick = () => {
        handleExport();
    };

    const handleExportSingleTransaction = () => {
        if (selectedTransaction) {
            handleExport(selectedTransaction);
        }
    };

    const handleSearch = (values: any) => {
        setFilters(values);
        // Implement filtering logic here
    };

    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => (
                <Text copyable>{id.slice(0, 8)}...{id.slice(-8)}</Text>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: TransactionDetail['type']) => (
                <Tag color={type === 'deposit' ? 'green' : type === 'withdrawal' ? 'blue' : 'purple'}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Tag>
            ),
            filters: [
                { text: 'Deposit', value: 'deposit' },
                { text: 'Withdrawal', value: 'withdrawal' },
                { text: 'Exchange', value: 'exchange' },
            ],
            onFilter: (value: any, record: TransactionDetail) => record.type === value,
        },
        {
            title: 'Date & Time',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp: string) => (
                <Text>{new Date(timestamp).toLocaleString()}</Text>
            ),
            sorter: (a: TransactionDetail, b: TransactionDetail) => 
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        },
        {
            title: 'Amount',
            key: 'amount',
            render: (_, record: TransactionDetail) => (
                <Space direction="vertical" size={0}>
                    <Text>{record.amount} {record.coin}</Text>
                    {record.toCoin && (
                        <Text type="secondary">→ {record.toAmount} {record.toCoin}</Text>
                    )}
                </Space>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: TransactionDetail['status']) => {
                const statusConfig = {
                    completed: { icon: <CheckCircleOutlined />, color: 'success' },
                    pending: { icon: <ClockCircleOutlined />, color: 'warning' },
                    failed: { icon: <ExclamationCircleOutlined />, color: 'error' }
                };
                const config = statusConfig[status];
                return (
                    <Tag icon={config.icon} color={config.color}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Tag>
                );
            },
            filters: [
                { text: 'Completed', value: 'completed' },
                { text: 'Pending', value: 'pending' },
                { text: 'Failed', value: 'failed' },
            ],
            onFilter: (value: any, record: TransactionDetail) => record.status === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: TransactionDetail) => (
                <Space>
                    <Button 
                        type="link" 
                        onClick={() => handleViewDetails(record)}
                    >
                        View Details
                    </Button>
                </Space>
            ),
        },
    ] as ColumnType<TransactionDetail>[];

    return (
        <Layout className={styles.transactions}>
            <Content className={styles.content}>
                <Card>
                    <div className={styles.header}>
                        <div>
                            <Title level={2}>Transaction History</Title>
                            {filters && (
                                <Space className={styles.activeFilters}>
                                    <FilterOutlined />
                                    <Text type="secondary">Active filters</Text>
                                    <Button 
                                        type="link" 
                                        size="small"
                                        onClick={() => setFilters(null)}
                                    >
                                        Clear all
                                    </Button>
                                </Space>
                            )}
                        </div>
                        <Space>
                            <Button 
                                icon={<SearchOutlined />}
                                onClick={() => setSearchModalVisible(true)}
                            >
                                Advanced Search
                            </Button>
                            <Button 
                                icon={<DownloadOutlined />}
                                onClick={handleExportClick}
                            >
                                Export
                            </Button>
                        </Space>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={mockTransactions}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                    />
                </Card>

                <Modal
                    title="Transaction Details"
                    open={detailModalVisible}
                    onCancel={() => setDetailModalVisible(false)}
                    footer={[
                        <Button 
                            key="export" 
                            icon={<DownloadOutlined />} 
                            onClick={handleExportSingleTransaction}
                        >
                            Export Details
                        </Button>,
                        <Button key="close" onClick={() => setDetailModalVisible(false)}>
                            Close
                        </Button>
                    ]}
                    width={700}
                >
                    {selectedTransaction && (
                        <div className={styles.transactionDetail}>
                            <Descriptions column={2} bordered>
                                <Descriptions.Item label="Transaction ID" span={2}>
                                    <Space>
                                        <Text>{selectedTransaction.id}</Text>
                                        <Button 
                                            type="text" 
                                            icon={<CopyOutlined />} 
                                            onClick={() => handleCopy(selectedTransaction.id)}
                                        />
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Type">
                                    <Tag color={selectedTransaction.type === 'deposit' ? 'green' : 'blue'}>
                                        {selectedTransaction.type.charAt(0).toUpperCase() + selectedTransaction.type.slice(1)}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Status">
                                    <Tag color={
                                        selectedTransaction.status === 'completed' ? 'success' :
                                        selectedTransaction.status === 'pending' ? 'warning' : 'error'
                                    }>
                                        {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Amount" span={2}>
                                    <Space direction="vertical">
                                        <Text strong>{selectedTransaction.amount} {selectedTransaction.coin}</Text>
                                        {selectedTransaction.toCoin && (
                                            <Text type="secondary">
                                                → {selectedTransaction.toAmount} {selectedTransaction.toCoin}
                                            </Text>
                                        )}
                                    </Space>
                                </Descriptions.Item>
                                {selectedTransaction.txHash && (
                                    <Descriptions.Item label="Transaction Hash" span={2}>
                                        <Space>
                                            <Text>{selectedTransaction.txHash}</Text>
                                            <Button 
                                                type="text" 
                                                icon={<CopyOutlined />} 
                                                onClick={() => handleCopy(selectedTransaction.txHash!)}
                                            />
                                            <Tooltip title="View on Explorer">
                                                <Button 
                                                    type="text" 
                                                    icon={<LinkOutlined />}
                                                    onClick={() => window.open(`https://explorer.example.com/tx/${selectedTransaction.txHash}`, '_blank')}
                                                />
                                            </Tooltip>
                                        </Space>
                                    </Descriptions.Item>
                                )}
                            </Descriptions>

                            {selectedTransaction.type !== 'exchange' && (
                                <>
                                    <Title level={4} style={{ marginTop: 24 }}>Network Details</Title>
                                    <Descriptions column={2} bordered>
                                        <Descriptions.Item label="Network" span={2}>
                                            {selectedTransaction.network}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="From Address">
                                            <Space>
                                                <Text>{selectedTransaction.from}</Text>
                                                <Button 
                                                    type="text" 
                                                    icon={<CopyOutlined />} 
                                                    onClick={() => handleCopy(selectedTransaction.from!)}
                                                />
                                            </Space>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="To Address">
                                            <Space>
                                                <Text>{selectedTransaction.to}</Text>
                                                <Button 
                                                    type="text" 
                                                    icon={<CopyOutlined />} 
                                                    onClick={() => handleCopy(selectedTransaction.to!)}
                                                />
                                            </Space>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </>
                            )}

                            <Title level={4} style={{ marginTop: 24 }}>Fee Details</Title>
                            <Descriptions column={2} bordered>
                                <Descriptions.Item label="Network Fee">
                                    0.0001 {selectedTransaction.coin}
                                </Descriptions.Item>
                                <Descriptions.Item label="Platform Fee">
                                    0.1%
                                </Descriptions.Item>
                                <Descriptions.Item label="Total Fee" span={2}>
                                    <Text type="warning">
                                        ≈ ${((selectedTransaction.amount * 0.001) + 0.0001 * 40000).toFixed(2)}
                                    </Text>
                                </Descriptions.Item>
                            </Descriptions>

                            <div className={styles.timeline}>
                                <Title level={4}>Transaction Timeline</Title>
                                <Timeline>
                                    <Timeline.Item color="green">
                                        Transaction Initiated
                                        <br />
                                        <Text type="secondary">
                                            {new Date(selectedTransaction.timestamp).toLocaleString()}
                                        </Text>
                                    </Timeline.Item>
                                    {selectedTransaction.status === 'completed' && (
                                        <Timeline.Item color="green">
                                            Transaction Completed
                                            <br />
                                            <Text type="secondary">
                                                {new Date(selectedTransaction.timestamp).toLocaleString()}
                                            </Text>
                                        </Timeline.Item>
                                    )}
                                    {selectedTransaction.status === 'pending' && (
                                        <Timeline.Item color="blue">
                                            Processing
                                            <br />
                                            <Text type="secondary">Estimated completion: 10-30 minutes</Text>
                                        </Timeline.Item>
                                    )}
                                    {selectedTransaction.status === 'failed' && (
                                        <Timeline.Item color="red">
                                            Transaction Failed
                                            <br />
                                            <Text type="secondary">
                                                {new Date(selectedTransaction.timestamp).toLocaleString()}
                                            </Text>
                                        </Timeline.Item>
                                    )}
                                </Timeline>
                            </div>
                        </div>
                    )}
                </Modal>

                <TransactionSearch
                    visible={searchModalVisible}
                    onClose={() => setSearchModalVisible(false)}
                    onSearch={handleSearch}
                />
            </Content>
        </Layout>
    );
};

export default Transactions; 