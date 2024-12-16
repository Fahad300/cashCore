export interface TransactionDetail {
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

export interface TransactionSearchFilters {
    transactionId?: string;
    type?: ('deposit' | 'withdrawal' | 'exchange')[];
    status?: ('completed' | 'pending' | 'failed')[];
    coin?: string[];
    dateRange?: [Date, Date];
    amount?: {
        min?: number;
        max?: number;
    };
} 