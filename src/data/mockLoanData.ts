export const mockLoans = [
    {
        id: 'LOAN-001',
        amount: 50000,
        coin: 'USDT',
        collateral: {
            amount: 2.5,
            coin: 'BTC',
            usdValue: 100000
        },
        interestRate: 5.5,
        health: 85,
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-07-15'
    },
    {
        id: 'LOAN-002',
        amount: 25000,
        coin: 'USDC',
        collateral: {
            amount: 15,
            coin: 'ETH',
            usdValue: 45000
        },
        interestRate: 4.8,
        health: 45,
        status: 'warning',
        startDate: '2024-02-01',
        endDate: '2024-08-01'
    }
];

export const mockCollateral = [
    {
        coin: 'BTC',
        amount: 3.5,
        usdValue: 140000,
        collateralFactor: 80,
        status: 'locked',
        icon: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    {
        coin: 'ETH',
        amount: 25,
        usdValue: 75000,
        collateralFactor: 75,
        status: 'available',
        icon: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png'
    }
]; 