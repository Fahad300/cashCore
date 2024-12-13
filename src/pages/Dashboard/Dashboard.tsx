import React, { useState } from 'react';
import { Row, Col, Card, Statistic, Grid, Table, Button, DatePicker, Space, Tag } from 'antd';
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ColumnsType } from 'antd/es/table';
import styles from './Dashboard.module.scss';
import { mockKpiData, mockChartData, mockExpenseCategories, mockTransactions } from '../../data/mockData';
import { KpiData } from '../../data/mockData';

const { useBreakpoint } = Grid;
const { RangePicker } = DatePicker;

interface Transaction {
  key: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

const Dashboard = () => {
  const screens = useBreakpoint();
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const renderKpiCards = () => (
    <Row gutter={[16, 16]} className={styles.kpiSection}>
      {mockKpiData.map((kpi: KpiData, index: number) => (
        <Col xs={24} sm={12} lg={8} xl={8} xxl={4} key={index}>
          <Card hoverable className={styles.statCard}>
            <Statistic
              title={kpi.title}
              value={kpi.value}
              precision={2}
              prefix={kpi.prefix}
              suffix={kpi.suffix}
              valueStyle={{ color: kpi.color }}
            />
            {kpi.trend && (
              <div className={styles.trend}>
                <span
                  style={{
                    color: kpi.trend > 0 ? '#52c41a' : '#ff4d4f'
                  }}
                >
                  {kpi.trend > 0 ? '↑' : '↓'} {Math.abs(kpi.trend)}%
                </span>
                <span className={styles.trendText}>{kpi.trendText}</span>
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );

  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', income: 4000, expenses: 2400 },
    { month: 'Feb', income: 3000, expenses: 1398 },
    { month: 'Mar', income: 2000, expenses: 9800 },
    { month: 'Apr', income: 2780, expenses: 3908 },
    { month: 'May', income: 1890, expenses: 4800 },
    { month: 'Jun', income: 2390, expenses: 3800 },
  ];

  const expenseDistribution = [
    { name: 'Rent', value: 400 },
    { name: 'Utilities', value: 300 },
    { name: 'Food', value: 300 },
    { name: 'Transport', value: 200 },
  ];

  const transactions: Transaction[] = [
    {
      key: '1',
      date: '2024-03-15',
      description: 'Salary Deposit',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      status: 'completed'
    },
    {
      key: '2',
      date: '2024-03-16',
      description: 'Salary Deposit',
      amount: 9000,
      type: 'income',
      category: 'Salary',
      status: 'completed'
    },
    {
      key: '3',
      date: '2024-03-15',
      description: 'Salary Deposit',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      status: 'completed'
    },
    {
      key: '4',
      date: '2024-03-16',
      description: 'Salary Deposit',
      amount: 9000,
      type: 'income',
      category: 'Salary',
      status: 'completed'
    },
    // Add more transactions...
  ];

  const columns: ColumnsType<Transaction> = [
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount, record) => (
        <span style={{ color: record.type === 'income' ? '#52c41a' : '#f5222d' }}>
          ${Math.abs(amount).toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: [
        { text: 'Salary', value: 'Salary' },
        { text: 'Food', value: 'Food' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === 'completed' ? 'success' : status === 'pending' ? 'warning' : 'error';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Financial Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, John Doe</p>
        </div>
        <Space>
          <RangePicker onChange={(dates) => setDateRange(dates as any)} />
          <Button type="primary" icon={<DownloadOutlined />}>
            Export Report
          </Button>
        </Space>
      </div>

      {/* KPI Cards */}
      {renderKpiCards()}

      {/* Charts Section */}
      <Row gutter={[16, 16]} className={styles.chartsSection}>
        <Col xs={24} xl={16}>
          <Card title="Revenue vs Expenses" className={styles.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#52c41a" />
                <Line type="monotone" dataKey="expenses" stroke="#f5222d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Expense Distribution" className={styles.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Transactions Table */}
      <Card title="Recent Transactions" className={styles.tableCard}>
        <Table<Transaction>
          columns={columns}
          dataSource={transactions}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default Dashboard; 