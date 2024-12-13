import React from 'react';
import { List, Typography } from 'antd';
import { OrderBookEntry } from '../../data/mockTradingData';
import styles from './OrderBook.module.scss';

const { Text } = Typography;

interface OrderBookProps {
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
}

const OrderBook: React.FC<OrderBookProps> = ({ bids, asks }) => {
    const renderOrderRow = (order: OrderBookEntry, type: 'bid' | 'ask') => (
        <div className={styles.orderRow}>
            <Text type={type === 'bid' ? 'success' : 'danger'}>
                ${order.price.toFixed(2)}
            </Text>
            <Text>{order.amount.toFixed(4)}</Text>
            <Text>{order.total.toFixed(2)}</Text>
        </div>
    );

    return (
        <div className={styles.orderBook}>
            <div className={styles.header}>
                <Text>Price</Text>
                <Text>Amount</Text>
                <Text>Total</Text>
            </div>
            <div className={styles.asks}>
                {asks.map((ask, index) => renderOrderRow(ask, 'ask'))}
            </div>
            <div className={styles.bids}>
                {bids.map((bid, index) => renderOrderRow(bid, 'bid'))}
            </div>
        </div>
    );
};

export default OrderBook; 