import React from 'react';
import { Typography, Card as AntCard, Avatar, Space, Button, Row, Col, Statistic } from 'antd';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    HeartOutlined,
    ShoppingOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import CodeExample from '../../../../components/common/CodeExample';
import styles from './Cards.module.scss';

const { Title, Paragraph, Text } = Typography;
const { Meta } = AntCard;

const basicCardCode = `import { Card } from 'antd';

const BasicCard = () => (
  <Card title="Basic Card" style={{ width: 300 }}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);`;

const metaCardCode = `import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const MetaCard = () => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
);`;

const statisticCardCode = `import { Card, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ShoppingOutlined } from '@ant-design/icons';

const StatisticCard = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Card>
        <Statistic
          title="Active Users"
          value={112893}
          precision={0}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card>
        <Statistic
          title="Total Sales"
          value={93.12}
          precision={2}
          prefix={<ShoppingOutlined />}
          suffix="k"
        />
      </Card>
    </Col>
  </Row>
);`;

const gridCardCode = `import { Card } from 'antd';

const GridCard = () => (
  <Card title="Card Title">
    <Card.Grid style={{ width: '33.33%' }}>Content</Card.Grid>
    <Card.Grid style={{ width: '33.33%' }}>Content</Card.Grid>
    <Card.Grid style={{ width: '33.33%' }}>Content</Card.Grid>
    <Card.Grid style={{ width: '33.33%' }}>Content</Card.Grid>
    <Card.Grid style={{ width: '33.33%' }}>Content</Card.Grid>
    <Card.Grid style={{ width: '33.33%' }}>Content</Card.Grid>
  </Card>
);`;

const Cards = () => {
    return (
        <div className={styles.cardsPage}>
            <Title level={2}>Cards</Title>
            <Paragraph>
                Cards contain content and actions about a single subject.
                They are versatile containers that can be used to display various types of content.
            </Paragraph>

            <CodeExample
                title="Basic Card"
                description="A basic card with a title and content."
                code={basicCardCode}
            >
                <AntCard title="Basic Card" style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </AntCard>
            </CodeExample>

            <CodeExample
                title="Card with Meta"
                description="A card containing a title, description, and actions."
                code={metaCardCode}
            >
                <AntCard
                    style={{ width: 300 }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title="Card title"
                        description="This is the description"
                    />
                </AntCard>
            </CodeExample>

            <CodeExample
                title="Statistic Card"
                description="Cards can be used to display statistics with icons and formatting."
                code={statisticCardCode}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <AntCard>
                            <Statistic
                                title="Active Users"
                                value={112893}
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </AntCard>
                    </Col>
                    <Col span={12}>
                        <AntCard>
                            <Statistic
                                title="Total Sales"
                                value={93.12}
                                precision={2}
                                prefix={<ShoppingOutlined />}
                                suffix="k"
                            />
                        </AntCard>
                    </Col>
                </Row>
            </CodeExample>

            <CodeExample
                title="Grid Card"
                description="Cards can be divided into a grid system."
                code={gridCardCode}
            >
                <AntCard title="Card Title">
                    <AntCard.Grid style={{ width: '33.33%' }}>Content</AntCard.Grid>
                    <AntCard.Grid style={{ width: '33.33%' }}>Content</AntCard.Grid>
                    <AntCard.Grid style={{ width: '33.33%' }}>Content</AntCard.Grid>
                    <AntCard.Grid style={{ width: '33.33%' }}>Content</AntCard.Grid>
                    <AntCard.Grid style={{ width: '33.33%' }}>Content</AntCard.Grid>
                    <AntCard.Grid style={{ width: '33.33%' }}>Content</AntCard.Grid>
                </AntCard>
            </CodeExample>
        </div>
    );
};

export default Cards;
