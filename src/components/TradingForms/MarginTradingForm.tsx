import React, { useState } from 'react';
import { Form, Input, Button, Radio, Typography, Tabs, Select, Slider } from 'antd';
import styles from './TradingForms.module.scss';

const { Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface MarginTradingFormProps {
    pair: string;
    currentPrice: number;
    balance: {
        base: number;
        quote: number;
    };
    leverage: number;
    onTradeExecute: (tradeDetails: {
        type: 'market' | 'limit' | 'stopLimit';
        side: 'buy' | 'sell';
        amount: number;
        price: number;
        pair: string;
    }) => void;
}

const MarginTradingForm: React.FC<MarginTradingFormProps> = ({ pair, currentPrice, balance, leverage, onTradeExecute }) => {
    const [side, setSide] = useState<'long' | 'short'>('long');
    const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
    const [selectedLeverage, setSelectedLeverage] = useState(leverage);

    return (
        <div className={styles.tradingForm}>
            <div className={styles.leverageSection}>
                <Text>Leverage: {selectedLeverage}x</Text>
                <Slider
                    min={1}
                    max={20}
                    value={selectedLeverage}
                    onChange={setSelectedLeverage}
                    marks={{
                        1: '1x',
                        5: '5x',
                        10: '10x',
                        20: '20x'
                    }}
                />
            </div>

            {/* Rest of the form similar to SpotTradingForm with leverage calculations */}
        </div>
    );
};

export default MarginTradingForm; 