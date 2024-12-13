import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { PriceHistory } from '../../data/mockMarketData';

interface MiniChartProps {
    data: PriceHistory[];
    isPositive: boolean;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, isPositive }) => {
    const color = isPositive ? '#52c41a' : '#ff4d4f';

    return (
        <div style={{ width: 120, height: 40 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        fill={color}
                        fillOpacity={0.2}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MiniChart; 