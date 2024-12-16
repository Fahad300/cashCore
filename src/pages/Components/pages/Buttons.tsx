import React from 'react';
import { Card, Button, Space, Typography, Divider, Row, Col } from 'antd';
import { 
    SearchOutlined, 
    DownloadOutlined, 
    PoweroffOutlined,
    PlusOutlined
} from '@ant-design/icons';
import styles from './Buttons.module.scss';

const { Title, Paragraph } = Typography;

const Buttons = () => {
    return (
        <div className={styles.buttonsPage}>
            <Title level={2}>Buttons</Title>
            <Paragraph>
                Buttons allow users to take actions and make choices with a single tap.
            </Paragraph>

            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card title="Button Types">
                        <Space direction="vertical" size="large">
                            <Space wrap>
                                <Button type="primary">Primary</Button>
                                <Button>Default</Button>
                                <Button type="dashed">Dashed</Button>
                                <Button type="text">Text</Button>
                                <Button type="link">Link</Button>
                            </Space>
                            <Paragraph>
                                There are primary, default, dashed, text and link button types.
                            </Paragraph>
                        </Space>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Button Sizes">
                        <Space direction="vertical" size="large">
                            <Space wrap>
                                <Button type="primary" size="large">Large</Button>
                                <Button type="primary">Default</Button>
                                <Button type="primary" size="small">Small</Button>
                            </Space>
                            <Paragraph>
                                Buttons come in three sizes: large, default and small.
                            </Paragraph>
                        </Space>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Icon Buttons">
                        <Space direction="vertical" size="large">
                            <Space wrap>
                                <Button type="primary" icon={<SearchOutlined />}>
                                    Search
                                </Button>
                                <Button icon={<DownloadOutlined />}>
                                    Download
                                </Button>
                                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                                <Button type="primary" shape="round" icon={<DownloadOutlined />}>
                                    Download
                                </Button>
                            </Space>
                            <Paragraph>
                                Buttons can contain icons to help identify actions.
                            </Paragraph>
                        </Space>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Button States">
                        <Space direction="vertical" size="large">
                            <Space wrap>
                                <Button type="primary">Normal</Button>
                                <Button type="primary" loading>Loading</Button>
                                <Button type="primary" disabled>Disabled</Button>
                                <Button danger>Danger</Button>
                            </Space>
                            <Paragraph>
                                Buttons can be in different states: normal, loading, disabled, or danger.
                            </Paragraph>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Buttons; 