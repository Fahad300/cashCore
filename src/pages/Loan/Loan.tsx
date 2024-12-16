import React, { useState } from 'react';
import { Layout, Card, Tabs, Table, Button, Typography, Space, Tag, Progress, Statistic, Row, Col, Form, InputNumber, Select, Descriptions, Empty } from 'antd';
import {
    DollarOutlined,
    PercentageOutlined,
    ClockCircleOutlined,
    PlusOutlined
} from '@ant-design/icons';
import styles from './Loan.module.scss';
import { mockLoans, mockCollateral } from '../../data/mockLoanData';
import NewLoanModal from '../../components/LoanActions/NewLoanModal';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Loan: React.FC = () => {
    const [form] = Form.useForm();
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [selectedCollateral, setSelectedCollateral] = useState<string>('');
    const [collateralAmount, setCollateralAmount] = useState<number>(0);
    const [duration, setDuration] = useState<number>(30);

    // Calculate loan terms
    const calculateLoanTerms = () => {
        const collateralAsset = mockCollateral.find(asset => asset.coin === selectedCollateral);
        if (!collateralAsset) return null;

        const collateralValue = collateralAmount * (collateralAsset.usdValue / collateralAsset.amount);
        const ltv = (loanAmount / collateralValue) * 100;
        const interestRate = 5 + (duration / 30); // Base rate + duration premium
        const interestAmount = (loanAmount * interestRate * duration) / (100 * 365);

        return {
            collateralValue,
            ltv,
            interestRate,
            interestAmount,
            totalRepayment: loanAmount + interestAmount
        };
    };

    const loanTerms = calculateLoanTerms();

    const [newLoanModalVisible, setNewLoanModalVisible] = useState(false);

    const loanColumns = [
        {
            title: 'Loan ID',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => <Text copyable>{id}</Text>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number, record: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong>${amount.toLocaleString()}</Text>
                    <Text type="secondary">{record.coin}</Text>
                </Space>
            ),
        },
        {
            title: 'Collateral',
            dataIndex: 'collateral',
            key: 'collateral',
            render: (collateral: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{collateral.amount} {collateral.coin}</Text>
                    <Text type="secondary">${collateral.usdValue.toLocaleString()}</Text>
                </Space>
            ),
        },
        {
            title: 'Interest Rate',
            dataIndex: 'interestRate',
            key: 'interestRate',
            render: (rate: number) => (
                <Tag color="blue">{rate}% APR</Tag>
            ),
        },
        {
            title: 'Health',
            dataIndex: 'health',
            key: 'health',
            render: (health: number) => (
                <Progress
                    percent={health}
                    size="small"
                    status={health < 30 ? 'exception' : health < 50 ? 'normal' : 'success'}
                    format={(percent) => `${percent}%`}
                />
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={
                    status === 'active' ? 'green' :
                        status === 'warning' ? 'orange' :
                            'red'
                }>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button type="link">Repay</Button>
                    <Button type="link">Add Collateral</Button>
                </Space>
            ),
        },
    ];

    return (
        <Layout className={styles.loan}>
            <Content className={styles.content}>
                <Title level={2} style={{ marginTop: '0px' }}>Loan Management</Title>

                <Row gutter={24}>
                    <Col xs={24} lg={16}>
                        <Card title="Quick Loan">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={(values) => console.log(values)}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="amount"
                                            label="Loan Amount"
                                            rules={[
                                                { required: true, message: 'Please enter loan amount' },
                                                {
                                                    validator: (_, value) =>
                                                        loanTerms && loanTerms.ltv <= 80
                                                            ? Promise.resolve()
                                                            : Promise.reject('LTV ratio too high')
                                                }
                                            ]}
                                        >
                                            <Space>
                                                <InputNumber
                                                    style={{ width: 200 }}
                                                    min={0}
                                                    placeholder="Enter amount"
                                                    onChange={(value) => setLoanAmount(value || 0)}
                                                />
                                                <Select style={{ width: 120 }} defaultValue="USDT">
                                                    <Select.Option value="USDT">USDT</Select.Option>
                                                    <Select.Option value="USDC">USDC</Select.Option>
                                                </Select>
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="duration"
                                            label="Loan Duration"
                                            rules={[{ required: true }]}
                                        >
                                            <Select onChange={(value) => setDuration(value)}>
                                                <Select.Option value={30}>30 Days</Select.Option>
                                                <Select.Option value={90}>90 Days</Select.Option>
                                                <Select.Option value={180}>180 Days</Select.Option>
                                                <Select.Option value={365}>365 Days</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="collateral"
                                            label="Collateral"
                                            rules={[{ required: true }]}
                                        >
                                            <Select onChange={(value) => setSelectedCollateral(value)}>
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
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="collateralAmount"
                                            label="Collateral Amount"
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber
                                                style={{ width: '100%' }}
                                                min={0}
                                                placeholder="Enter collateral amount"
                                                onChange={(value) => setCollateralAmount(value || 0)}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Button type="primary" htmlType="submit" block>
                                    Create Loan
                                </Button>
                            </Form>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card title="Loan Terms" className={styles.termsCard}>
                            {loanTerms ? (
                                <>
                                    <Descriptions column={1} bordered>
                                        <Descriptions.Item label="Collateral Value">
                                            ${loanTerms.collateralValue.toLocaleString()}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Loan-to-Value Ratio">
                                            <Progress
                                                percent={Number(loanTerms.ltv.toFixed(2))}
                                                size="small"
                                                status={loanTerms.ltv > 80 ? 'exception' : 'normal'}
                                            />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Interest Rate">
                                            {loanTerms.interestRate.toFixed(2)}% APR
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Interest Amount">
                                            ${loanTerms.interestAmount.toFixed(2)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Total Repayment">
                                            <Text strong>${loanTerms.totalRepayment.toFixed(2)}</Text>
                                        </Descriptions.Item>
                                    </Descriptions>

                                    <div className={styles.terms}>
                                        <Title level={5}>Terms & Conditions</Title>
                                        <ul>
                                            <li>Maximum LTV ratio: 80%</li>
                                            <li>Liquidation threshold: 85% LTV</li>
                                            <li>Minimum loan duration: 30 days</li>
                                            <li>Early repayment fee: 1%</li>
                                            <li>Late payment fee: 5%</li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Empty description="Enter loan details to see terms" />
                            )}
                        </Card>
                    </Col>
                </Row>

                <Row style={{ marginTop: '20px' }} gutter={[16, 16]} className={styles.statistics}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card>
                            <Statistic
                                title="Total Borrowed"
                                value={125000}
                                prefix="$"
                                precision={2}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card>
                            <Statistic
                                title="Total Collateral"
                                value={250000}
                                prefix="$"
                                precision={2}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card>
                            <Statistic
                                title="Average Interest Rate"
                                value={5.2}
                                suffix="%"
                                precision={1}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card>
                            <Statistic
                                title="Active Loans"
                                value={3}
                            />
                        </Card>
                    </Col>
                </Row>

                <Card>
                    <Tabs defaultActiveKey="active">
                        <TabPane tab="Active Loans" key="active">
                            <Table
                                columns={loanColumns}
                                dataSource={mockLoans}
                                rowKey="id"
                            />
                        </TabPane>
                        <TabPane tab="Loan History" key="history">
                            <Table
                                columns={loanColumns}
                                dataSource={[]}
                                rowKey="id"
                            />
                        </TabPane>
                        <TabPane tab="Collateral Assets" key="collateral">
                            <Table
                                columns={[
                                    {
                                        title: 'Asset',
                                        dataIndex: 'coin',
                                        key: 'coin',
                                        render: (coin: string, record: any) => (
                                            <Space>
                                                <img
                                                    src={record.icon}
                                                    alt={coin}
                                                    style={{ width: 24, height: 24 }}
                                                />
                                                <Text>{coin}</Text>
                                            </Space>
                                        ),
                                    },
                                    {
                                        title: 'Amount',
                                        dataIndex: 'amount',
                                        key: 'amount',
                                        render: (amount: number, record: any) => (
                                            <Space direction="vertical" size={0}>
                                                <Text>{amount} {record.coin}</Text>
                                                <Text type="secondary">${record.usdValue.toLocaleString()}</Text>
                                            </Space>
                                        ),
                                    },
                                    {
                                        title: 'Collateral Factor',
                                        dataIndex: 'collateralFactor',
                                        key: 'collateralFactor',
                                        render: (factor: number) => (
                                            <Tag color="blue">{factor}%</Tag>
                                        ),
                                    },
                                    {
                                        title: 'Status',
                                        dataIndex: 'status',
                                        key: 'status',
                                        render: (status: string) => (
                                            <Tag color={status === 'locked' ? 'orange' : 'green'}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </Tag>
                                        ),
                                    },
                                ]}
                                dataSource={mockCollateral}
                                rowKey="coin"
                            />
                        </TabPane>
                    </Tabs>
                </Card>

                <NewLoanModal
                    visible={newLoanModalVisible}
                    onClose={() => setNewLoanModalVisible(false)}
                />
            </Content>
        </Layout>
    );
};

export default Loan; 