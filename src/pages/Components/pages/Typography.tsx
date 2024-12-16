import React from 'react';
import { Card, Typography, Row, Col, Space } from 'antd';
import styles from './Typography.module.scss';

const { Title, Paragraph, Text, Link } = Typography;

const TypographyDemo = () => {
    return (
        <div className={styles.typographyPage}>
            <Title level={2}>Typography</Title>
            <Paragraph>
                Basic text writing, including headings, body text, lists, and more.
            </Paragraph>

            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card title="Headings">
                        <Space direction="vertical">
                            <Title level={1}>h1. Heading</Title>
                            <Title level={2}>h2. Heading</Title>
                            <Title level={3}>h3. Heading</Title>
                            <Title level={4}>h4. Heading</Title>
                            <Title level={5}>h5. Heading</Title>
                        </Space>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Text and Links">
                        <Space direction="vertical">
                            <Text>Default text</Text>
                            <Text type="secondary">Secondary text</Text>
                            <Text type="success">Success text</Text>
                            <Text type="warning">Warning text</Text>
                            <Text type="danger">Danger text</Text>
                            <Text disabled>Disabled text</Text>
                            <Text mark>Marked text</Text>
                            <Text code>Code text</Text>
                            <Text keyboard>Keyboard text</Text>
                            <Text underline>Underlined text</Text>
                            <Text delete>Deleted text</Text>
                            <Text strong>Strong text</Text>
                            <Text italic>Italic text</Text>
                            <Link href="https://ant.design" target="_blank">
                                Ant Design (Link)
                            </Link>
                        </Space>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Paragraph">
                        <Paragraph>
                            A design is a plan or specification for the construction of an object or system 
                            or for the implementation of an activity or process, or the result of that plan 
                            or specification in the form of a prototype, product or process.
                        </Paragraph>
                        <Paragraph copyable>This is a copyable paragraph.</Paragraph>
                        <Paragraph editable>This is an editable paragraph.</Paragraph>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TypographyDemo; 