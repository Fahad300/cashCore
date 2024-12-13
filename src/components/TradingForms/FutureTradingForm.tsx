import React, { useState } from 'react';
import { Form, Input, Button, Radio, Typography, Tabs, Select, Slider, Switch } from 'antd';
import styles from './TradingForms.module.scss';

const { Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface FutureTradingFormProps {
    pair: string;
    currentPrice: number;
    balance: {
        base: number;
        quote: number;
    };
    maxLeverage: number;
    onTradeExecute: (tradeDetails: {
        type: 'market' | 'limit' | 'stopLimit';
        side: 'buy' | 'sell';
        amount: number;
        price: number;
        pair: string;
    }) => void;
}

const FutureTradingForm: React.FC<FutureTradingFormProps> = ({ pair, currentPrice, balance, maxLeverage, onTradeExecute }) => {
    const [positionMode, setPositionMode] = useState<'isolated' | 'cross'>('isolated');
    const [side, setSide] = useState<'long' | 'short'>('long');
    const [leverage, setLeverage] = useState(10);
    const [reduceOnly, setReduceOnly] = useState(false);

    return (
        <div className={styles.tradingForm}>
            <div className={styles.positionMode}>
                <Radio.Group value={positionMode} onChange={e => setPositionMode(e.target.value)}>
                    <Radio.Button value="isolated">Isolated</Radio.Button>
                    <Radio.Button value="cross">Cross</Radio.Button>
                </Radio.Group>
            </div>

            <div className={styles.leverageSection}>
                <Text>Leverage: {leverage}x</Text>
                <Slider
                    min={1}
                    max={maxLeverage}
                    value={leverage}
                    onChange={setLeverage}
                    marks={{
                        1: '1x',
                        20: '20x',
                        50: '50x',
                        100: '100x'
                    }}
                />
            </div>

            <Form layout="vertical">
                {/* Similar form fields as SpotTradingForm */}
                <div className={styles.advancedOptions}>
                    <Switch 
                        checked={reduceOnly}
                        onChange={setReduceOnly}
                    /> Reduce Only
                </div>
            </Form>
        </div>
    );
};

export default FutureTradingForm; 