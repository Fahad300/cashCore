import React from 'react';
import { Typography, Card, Collapse, Button, Input, Form, Space } from 'antd';
import { 
    CustomerServiceOutlined, 
    MailOutlined, 
    QuestionCircleOutlined,
    MessageOutlined
} from '@ant-design/icons';
import styles from './Support.module.scss';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

const Support = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        console.log('Support ticket submitted:', values);
        form.resetFields();
    };

    return (
        <div className={styles.support}>
            <Title level={2}>Support Center</Title>
            <Paragraph>
                Need help? We're here to assist you with any questions or issues you may have.
            </Paragraph>

            <div className={styles.content}>
                <Card className={styles.faq}>
                    <Title level={3}>
                        <QuestionCircleOutlined /> Frequently Asked Questions
                    </Title>
                    <Collapse>
                        <Panel header="How do I get started?" key="1">
                            <Paragraph>
                                To get started, create an account and complete the verification process. 
                                Once verified, you can deposit funds and begin trading.
                            </Paragraph>
                        </Panel>
                        <Panel header="What payment methods are accepted?" key="2">
                            <Paragraph>
                                We accept various payment methods including bank transfers, credit/debit cards, 
                                and cryptocurrency deposits.
                            </Paragraph>
                        </Panel>
                        <Panel header="How long does verification take?" key="3">
                            <Paragraph>
                                The verification process typically takes 1-2 business days. 
                                For faster verification, ensure all submitted documents are clear and valid.
                            </Paragraph>
                        </Panel>
                    </Collapse>
                </Card>

                <Card className={styles.contactForm}>
                    <Title level={3}>
                        <MessageOutlined /> Contact Support
                    </Title>
                    <Form 
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="subject"
                            label="Subject"
                            rules={[{ required: true, message: 'Please enter a subject' }]}
                        >
                            <Input placeholder="What do you need help with?" />
                        </Form.Item>

                        <Form.Item
                            name="message"
                            label="Message"
                            rules={[{ required: true, message: 'Please enter your message' }]}
                        >
                            <TextArea 
                                rows={4}
                                placeholder="Describe your issue in detail"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit Ticket
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card className={styles.contactInfo}>
                    <Space direction="vertical" size="large">
                        <div>
                            <Title level={4}>
                                <CustomerServiceOutlined /> Live Chat
                            </Title>
                            <Paragraph>
                                Available 24/7 for premium members
                            </Paragraph>
                            <Button type="primary">Start Chat</Button>
                        </div>

                        <div>
                            <Title level={4}>
                                <MailOutlined /> Email Support
                            </Title>
                            <Paragraph>
                                support@financedashboard.com
                            </Paragraph>
                            <Text type="secondary">
                                Response time: within 24 hours
                            </Text>
                        </div>
                    </Space>
                </Card>
            </div>
        </div>
    );
};

export default Support; 