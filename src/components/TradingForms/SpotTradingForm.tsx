import React, { useState } from 'react';
import { Form, Input, Button, Radio, Slider, Typography, Space, Tabs, Divider } from 'antd';
import styles from './TradingForms.module.scss';

const { Text } = Typography;
const { TabPane } = Tabs;

interface SpotTradingFormProps {
    pair: string;
    currentPrice: number;
    balance: {
        base: number;
        quote: number;
    };
    onTradeExecute: (tradeDetails: {
        type: 'market' | 'limit' | 'stopLimit';
        side: 'buy' | 'sell';
        amount: number;
        price: number;
        pair: string;
    }) => void;
}

const SpotTradingForm: React.FC<SpotTradingFormProps> = ({ pair, currentPrice, balance, onTradeExecute }) => {
    const [orderType, setOrderType] = useState<'limit' | 'market' | 'stopLimit'>('limit');
    const [side, setSide] = useState<'buy' | 'sell'>('buy');
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(currentPrice);
    const [stopPrice, setStopPrice] = useState(currentPrice);
    const [total, setTotal] = useState(0);

    const [baseAsset, quoteAsset] = pair.split('/');

    const handleAmountChange = (value: number) => {
        setAmount(value);
        setTotal(value * price);
    };

    const handleTotalChange = (value: number) => {
        setTotal(value);
        setAmount(value / price);
    };

    const handleSubmit = () => {
        onTradeExecute({
            type: orderType,
            side,
            amount,
            price: orderType === 'market' ? currentPrice : price,
            pair
        });
    };

    return (
        <div className={styles.tradingForm}>
            <Tabs>
                <TabPane tab="Limit" key="limit">
                    <Form layout="vertical">
                        <div className={styles.tradeSide}>
                            <Radio.Group value={side} onChange={e => setSide(e.target.value)} buttonStyle="solid">
                                <Radio.Button value="buy" className={styles.buyButton}>Buy {baseAsset}</Radio.Button>
                                <Radio.Button value="sell" className={styles.sellButton}>Sell {baseAsset}</Radio.Button>
                            </Radio.Group>
                        </div>

                        <Form.Item label="Price">
                            <Input 
                                suffix={quoteAsset}
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </Form.Item>

                        <Form.Item label="Amount">
                            <Input 
                                suffix={baseAsset}
                                value={amount}
                                onChange={e => handleAmountChange(Number(e.target.value))}
                            />
                            <div className={styles.percentButtons}>
                                {[25, 50, 75, 100].map(percent => (
                                    <Button 
                                        key={percent}
                                        size="small"
                                        onClick={() => handleAmountChange(balance.base * (percent / 100))}
                                    >
                                        {percent}%
                                    </Button>
                                ))}
                            </div>
                        </Form.Item>

                        <Form.Item label="Total">
                            <Input 
                                suffix={quoteAsset}
                                value={total}
                                onChange={e => handleTotalChange(Number(e.target.value))}
                            />
                        </Form.Item>

                        <div className={styles.balances}>
                            <Text type="secondary">Available: {balance.base} {baseAsset}</Text>
                            <Text type="secondary">{balance.quote} {quoteAsset}</Text>
                        </div>

                        <Button 
                            type="primary" 
                            block
                            className={side === 'buy' ? styles.buyButton : styles.sellButton}
                            onClick={handleSubmit}
                        >
                            {side === 'buy' ? 'Buy' : 'Sell'} {baseAsset}
                        </Button>
                    </Form>
                </TabPane>
                <TabPane tab="Market" key="market">
                    {/* Similar form without price input */}
                </TabPane>
                <TabPane tab="Stop-Limit" key="stopLimit">
                    {/* Add stop-limit form */}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default SpotTradingForm; 