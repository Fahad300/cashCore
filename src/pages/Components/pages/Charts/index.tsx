import React, { useState } from 'react';
import { Typography, Card, Row, Col, Radio, Space } from 'antd';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
    ComposedChart, Scatter
} from 'recharts';
import CodeExample from '../../../../components/common/CodeExample';
import styles from './Charts.module.scss';

const { Title, Paragraph } = Typography;

const data = [
    { name: 'Jan', value: 400, pv: 2400, amt: 2400 },
    { name: 'Feb', value: 300, pv: 1398, amt: 2210 },
    { name: 'Mar', value: 200, pv: 9800, amt: 2290 },
    { name: 'Apr', value: 278, pv: 3908, amt: 2000 },
    { name: 'May', value: 189, pv: 4800, amt: 2181 },
    { name: 'Jun', value: 239, pv: 3800, amt: 2500 },
];

const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const lineChartCode = `import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  // ...
];

const LineChartExample = () => (
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
);`;

const areaChartCode = `import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AreaChartExample = () => (
  <AreaChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
  </AreaChart>
);`;

const barChartCode = `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartExample = () => (
  <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
);`;

const pieChartCode = `import { PieChart, Pie, Tooltip } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  // ...
];

const PieChartExample = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx={200}
      cy={200}
      labelLine={false}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    />
    <Tooltip />
  </PieChart>
);`;

// Add crypto market data
const cryptoData = [
    { time: '00:00', price: 45000, volume: 1200, marketCap: 850 },
    { time: '04:00', price: 45200, volume: 1150, marketCap: 855 },
    { time: '08:00', price: 44800, volume: 1300, marketCap: 845 },
    { time: '12:00', price: 46000, volume: 1800, marketCap: 870 },
    { time: '16:00', price: 45600, volume: 1400, marketCap: 865 },
    { time: '20:00', price: 45900, volume: 1600, marketCap: 868 },
];

const marketDistribution = [
    { name: 'Bitcoin', value: 40 },
    { name: 'Ethereum', value: 30 },
    { name: 'BNB', value: 15 },
    { name: 'Others', value: 15 },
];

const cryptoPriceChartCode = `import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CryptoPriceChart = () => (
  <AreaChart width={500} height={300} data={cryptoData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Area 
      type="monotone" 
      dataKey="price" 
      stroke="#1890ff" 
      fill="#1890ff" 
      fillOpacity={0.2} 
    />
  </AreaChart>
);`;

const cryptoVolumeChartCode = `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CryptoVolumeChart = () => (
  <BarChart width={500} height={300} data={cryptoData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="volume" fill="#52c41a" />
  </BarChart>
);`;

const marketShareCode = `import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d'];

const MarketShareChart = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={marketDistribution}
      cx={200}
      cy={200}
      labelLine={false}
      outerRadius={80}
      dataKey="value"
    >
      {marketDistribution.map((entry, index) => (
        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);`;

// Add candlestick data
const candlestickData = [
    { time: '00:00', open: 45000, close: 45200, high: 45300, low: 44900, volume: 1200 },
    { time: '04:00', open: 45200, close: 44800, high: 45400, low: 44700, volume: 1150 },
    { time: '08:00', open: 44800, close: 46000, high: 46100, low: 44800, volume: 1300 },
    { time: '12:00', open: 46000, close: 45600, high: 46200, low: 45500, volume: 1800 },
    { time: '16:00', open: 45600, close: 45900, high: 46000, low: 45400, volume: 1400 },
    { time: '20:00', open: 45900, close: 46200, high: 46300, low: 45800, volume: 1600 },
];

// Add candlestick chart code example
const candlestickChartCode = `import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CandlestickChart = () => {
  const renderCandlestick = (data) => {
    return data.map((entry, index) => {
      const color = entry.close > entry.open ? '#52c41a' : '#f5222d';
      const bodyHeight = Math.abs(entry.close - entry.open);
      const y = Math.min(entry.close, entry.open);
      
      return (
        <g key={index}>
          {/* Wick */}
          <line
            x1={index * 80 + 40}
            y1={entry.low}
            x2={index * 80 + 40}
            y2={entry.high}
            stroke={color}
            strokeWidth={1}
          />
          {/* Body */}
          <rect
            x={index * 80 + 20}
            y={y}
            width={40}
            height={bodyHeight}
            fill={color}
          />
        </g>
      );
    });
  };

  return (
    <ComposedChart width={600} height={400} data={candlestickData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      {renderCandlestick(candlestickData)}
    </ComposedChart>
  );
};`;

// Update the ScatterShapeProps interface to match Recharts' requirements
interface ScatterShapeProps {
    cx: number;
    cy: number;
    fill: string;
    opacity: number;
    payload: {
        time: string;
        open: number;
        close: number;
        high: number;
        low: number;
        volume: number;
    };
}

interface CandlestickProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    payload?: {
        time: string;
        open: number;
        close: number;
        high: number;
        low: number;
        volume: number;
    };
}

// Create a separate Candlestick component
const Candlestick: React.FC<CandlestickProps> = ({ x = 0, y = 0, payload }) => {
    if (!payload) return null;

    const color = payload.close > payload.open ? '#52c41a' : '#f5222d';
    const bodyHeight = Math.abs(payload.close - payload.open);
    const width = 20;
    
    return (
        <g>
            {/* Wick */}
            <line
                x1={x + width / 2}
                y1={payload.low}
                x2={x + width / 2}
                y2={payload.high}
                stroke={color}
                strokeWidth={1}
            />
            {/* Body */}
            <rect
                x={x}
                y={Math.min(payload.open, payload.close)}
                width={width}
                height={bodyHeight}
                fill={color}
            />
        </g>
    );
};

const Charts = () => {
    const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');

    return (
        <div className={styles.chartsPage}>
            <Title level={2}>Charts</Title>
            <Paragraph>
                Data visualization components for displaying statistics and trends.
                These charts are built using Recharts, a composable charting library built on React components.
            </Paragraph>

            <CodeExample
                title="Line Chart"
                description="A basic line chart showing value trends over time."
                code={lineChartCode}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </CodeExample>

            <CodeExample
                title="Area Chart"
                description="An area chart emphasizing value changes over time."
                code={areaChartCode}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </CodeExample>

            <CodeExample
                title="Bar Chart"
                description="A bar chart comparing values across categories."
                code={barChartCode}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CodeExample>

            <CodeExample
                title="Pie Chart"
                description="A pie chart showing proportional distribution of values."
                code={pieChartCode}
            >
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CodeExample>

            <Title level={3} style={{ marginTop: 48 }}>Crypto Market Charts</Title>
            
            <CodeExample
                title="Crypto Price Chart"
                description="An area chart showing cryptocurrency price movements over time."
                code={cryptoPriceChartCode}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={cryptoData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#1890ff" 
                            fill="#1890ff" 
                            fillOpacity={0.2}
                            name="Price (USD)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CodeExample>

            <CodeExample
                title="Trading Volume"
                description="A bar chart showing trading volume distribution over time."
                code={cryptoVolumeChartCode}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cryptoData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Bar 
                            dataKey="volume" 
                            fill="#52c41a" 
                            name="Volume"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CodeExample>

            <CodeExample
                title="Market Distribution"
                description="A pie chart showing market share distribution among different cryptocurrencies."
                code={marketShareCode}
            >
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={marketDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            dataKey="value"
                        >
                            {marketDistribution.map((entry, index) => (
                                <Cell 
                                    key={entry.name} 
                                    fill={['#1890ff', '#52c41a', '#faad14', '#f5222d'][index % 4]} 
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CodeExample>

            <CodeExample
                title="Combined Market Metrics"
                description="A multi-axis chart showing price and market cap correlation."
                code={cryptoPriceChartCode}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cryptoData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="price" 
                            stroke="#1890ff" 
                            name="Price (USD)"
                        />
                        <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="marketCap" 
                            stroke="#52c41a" 
                            name="Market Cap (B)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CodeExample>

            <Title level={3} style={{ marginTop: 48 }}>Trading Charts</Title>

            <CodeExample
                title="Candlestick Chart"
                description="A candlestick chart showing price movement patterns with open, high, low, and close values."
                code={candlestickChartCode}
            >
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={candlestickData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis 
                            yAxisId="left"
                            domain={['dataMin', 'dataMax']} 
                        />
                        <YAxis 
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 'dataMax']}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div style={{ 
                                            background: 'white', 
                                            padding: '10px',
                                            border: '1px solid #ccc'
                                        }}>
                                            <p>Time: {data.time}</p>
                                            <p>Open: ${data.open}</p>
                                            <p>High: ${data.high}</p>
                                            <p>Low: ${data.low}</p>
                                            <p>Close: ${data.close}</p>
                                            <p>Volume: {data.volume}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="volume"
                            fill="#8884d8"
                            opacity={0.3}
                            yAxisId="right"
                        />
                        <Scatter
                            data={candlestickData}
                            shape={<Candlestick />}
                            legendType="none"
                            yAxisId="left"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </CodeExample>

            <CodeExample
                title="Volume Analysis"
                description="Trading volume displayed as a bar chart below the candlestick pattern."
                code={cryptoVolumeChartCode}
            >
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={candlestickData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Bar 
                            dataKey="volume" 
                            fill="#8884d8"
                            name="Volume"
                            opacity={0.3}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CodeExample>
        </div>
    );
};

export default Charts;
