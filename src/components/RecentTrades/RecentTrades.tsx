import React from 'react';
import { List, Typography } from 'antd';
import { Trade } from '../../data/mockTradingData';
import styles from './RecentTrades.module.scss';

const { Text } = Typography;

interface RecentTradesProps {
    trades: Trade[];
}

const RecentTrades: React.FC<RecentTradesProps> = ({ trades }) => {
    return (
        <List
            className={styles.recentTrades}
            dataSource={trades}
            renderItem={(trade) => (
                <List.Item className={styles.tradeItem}>
                    <Text type={trade.side === 'buy' ? 'success' : 'danger'}>
                        ${trade.price.toFixed(2)}
                    </Text>
                    <Text>{trade.amount.toFixed(4)}</Text>
                    <Text type="secondary">
                        {new Date(trade.time).toLocaleTimeString()}
                    </Text>
                </List.Item>
            )}
        />
    );
};

export default RecentTrades; 