import { TransactionDetail } from '../types/transaction';

export const mockTransactions: TransactionDetail[] = [
    {
        id: '0x1234567890abcdef1234567890abcdef12345678',
        type: 'deposit',
        coin: 'BTC',
        amount: 0.05,
        status: 'completed',
        timestamp: '2024-03-15T10:30:00',
        txHash: '0x1234567890abcdef1234567890abcdef12345678',
        from: '0xabcd...efgh',
        to: '0x9876...5432',
        network: 'Bitcoin Network'
    },
    {
        id: '0x2345678901abcdef2345678901abcdef23456789',
        type: 'withdrawal',
        coin: 'ETH',
        amount: 2.5,
        status: 'pending',
        timestamp: '2024-03-14T15:45:00',
        txHash: '0x5678901234abcdef5678901234abcdef56789012',
        from: '0x1234...5678',
        to: '0xefgh...abcd',
        network: 'Ethereum Network'
    },
    {
        id: '0x3456789012abcdef3456789012abcdef34567890',
        type: 'exchange',
        coin: 'BNB',
        amount: 10,
        status: 'completed',
        timestamp: '2024-03-14T09:20:00',
        toCoin: 'USDT',
        toAmount: 3150
    }
]; 