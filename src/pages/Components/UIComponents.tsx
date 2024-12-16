import React from 'react';
import { Layout, Typography, Card, Row, Col, Button, Space, Table, Tag, Input, Select, Radio, Checkbox, Switch } from 'antd';
import styles from './UIComponents.module.scss';

const { Content } = Layout;
const { Title, Text } = Typography;

const UIComponents: React.FC = () => {
    return (
        <Layout className={styles.uiComponents}>
            <Content className={styles.content}>
                <Title level={2}>UI Components</Title>

                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Card title="Buttons">
                            <Space direction="vertical" size="large">
                                <Space wrap>
                                    <Button type="primary">Primary</Button>
                                    <Button>Default</Button>
                                    <Button type="dashed">Dashed</Button>
                                    <Button type="link">Link</Button>
                                </Space>
                                <Space wrap>
                                    <Button type="primary" size="large">Large</Button>
                                    <Button type="primary">Default</Button>
                                    <Button type="primary" size="small">Small</Button>
                                </Space>
                            </Space>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card title="Form Elements">
                            <Space direction="vertical" style={{ width: '100%' }} size="large">
                                <Input placeholder="Basic input" />
                                <Input.Password placeholder="Password input" />
                                <Select
                                    defaultValue="option1"
                                    style={{ width: 200 }}
                                    options={[
                                        { value: 'option1', label: 'Option 1' },
                                        { value: 'option2', label: 'Option 2' }
                                    ]}
                                />
                                <Radio.Group defaultValue="a">
                                    <Radio value="a">Option A</Radio>
                                    <Radio value="b">Option B</Radio>
                                </Radio.Group>
                                <Checkbox>Checkbox</Checkbox>
                                <Switch defaultChecked />
                            </Space>
                        </Card>
                    </Col>

                    {/* Add more component sections */}
                </Row>
            </Content>
        </Layout>
    );
};

export default UIComponents; 