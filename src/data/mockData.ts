

export interface KpiData {
    title: string;
    value: number;
    prefix: React.ReactNode;
    suffix?: string;
    color: string;
    trend?: number;
    trendText?: string;
}

export interface ChartData {
    month: string;
    income: number;
    expenses: number;
    profit: number;
    transactions: number;
}

export interface ExpenseCategory {
    name: string;
    value: number;
    color: string;
}

export interface Transaction {
    key: string;
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    status: 'completed' | 'pending' | 'failed';
    paymentMethod: string;
    reference: string;
}

export const mockKpiData: KpiData[] = [
    {
        title: 'Total Revenue',
        value: 84232.50,
        prefix: '💰',
        color: '#1890ff',
        trend: 12.5,
        trendText: 'vs last month'
    },
    {
        title: 'Total Expenses',
        value: 34789.20,
        prefix: '💸',
        color: '#ff4d4f',
        trend: -8.3,
        trendText: 'vs last month'
    },
    {
        title: 'Net Profit',
        value: 49443.30,
        prefix: '📈',
        color: '#52c41a',
        trend: 23.4,
        trendText: 'vs last month'
    },
    {
        title: 'Active Accounts',
        value: 1234,
        prefix: '👥',
        color: '#722ed1',
        trend: 4.2,
        trendText: 'new accounts'
    },
    {
        title: 'Average Transaction',
        value: 567.89,
        prefix: '💳',
        color: '#13c2c2',
        trend: 1.7,
        trendText: 'per transaction'
    },
    {
        title: 'Pending Invoices',
        value: 23,
        prefix: '📋',
        color: '#faad14',
        trend: -2,
        trendText: 'to process'
    }
];

export const mockChartData: ChartData[] = [
    { month: 'Jan', income: 4000, expenses: 2400, profit: 1600, transactions: 120 },
    { month: 'Feb', income: 3000, expenses: 1398, profit: 1602, transactions: 98 },
    { month: 'Mar', income: 2000, expenses: 9800, profit: -7800, transactions: 145 },
    { month: 'Apr', income: 2780, expenses: 3908, profit: -1128, transactions: 78 },
    { month: 'May', income: 1890, expenses: 4800, profit: -2910, transactions: 89 },
    { month: 'Jun', income: 2390, expenses: 3800, profit: -1410, transactions: 112 },
    { month: 'Jul', income: 3490, expenses: 4300, profit: -810, transactions: 134 },
    { month: 'Aug', income: 4000, expenses: 2400, profit: 1600, transactions: 156 },
    { month: 'Sep', income: 3000, expenses: 1398, profit: 1602, transactions: 165 },
    { month: 'Oct', income: 2000, expenses: 9800, profit: -7800, transactions: 132 },
    { month: 'Nov', income: 2780, expenses: 3908, profit: -1128, transactions: 145 },
    { month: 'Dec', income: 3490, expenses: 4300, profit: -810, transactions: 178 }
];

export const mockExpenseCategories: ExpenseCategory[] = [
    { name: 'Rent & Utilities', value: 1200, color: '#1890ff' },
    { name: 'Salaries', value: 2500, color: '#52c41a' },
    { name: 'Marketing', value: 800, color: '#722ed1' },
    { name: 'Equipment', value: 500, color: '#faad14' },
    { name: 'Insurance', value: 300, color: '#13c2c2' },
    { name: 'Others', value: 450, color: '#ff4d4f' }
];

export const mockTransactions: Transaction[] = [
    {
        key: '1',
        date: '2024-03-15',
        description: 'Monthly Salary Payment',
        amount: 5000,
        type: 'expense',
        category: 'Salaries',
        status: 'completed',
        paymentMethod: 'Bank Transfer',
        reference: 'SAL-2024-03-001'
    },
    {
        key: '2',
        date: '2024-03-14',
        description: 'Client Payment - Project X',
        amount: 12500,
        type: 'income',
        category: 'Services',
        status: 'completed',
        paymentMethod: 'Wire Transfer',
        reference: 'INV-2024-03-042'
    },
    // Add more transactions...
]; 