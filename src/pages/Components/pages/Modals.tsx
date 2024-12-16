import React, { useState } from 'react';
import { Card, Button, Modal, Typography, Row, Col, Space, Form, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './Modals.module.scss';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const Modals = () => {
    const [basicVisible, setBasicVisible] = useState(false);
    const [customVisible, setCustomVisible] = useState(false);
    const [form] = Form.useForm();

    const showConfirm = () => {
        confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    };

    const handleCustomOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
            setCustomVisible(false);
            form.resetFields();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <div className={styles.modalsPage}>
            <Title level={2}>Modals</Title>
            <Paragraph>
                Modal dialogs for displaying content or gathering user input.
            </Paragraph>

            <Row gutter={[24, 24]}>
                <Col span={24} md={12}>
                    <Card title="Basic Modal">
                        <Space>
                            <Button type="primary" onClick={() => setBasicVisible(true)}>
                                Open Basic Modal
                            </Button>
                            <Modal
                                title="Basic Modal"
                                open={basicVisible}
                                onOk={() => setBasicVisible(false)}
                                onCancel={() => setBasicVisible(false)}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Space>
                    </Card>
                </Col>

                <Col span={24} md={12}>
                    <Card title="Confirmation Modal">
                        <Button onClick={showConfirm}>Confirm</Button>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Custom Form Modal">
                        <Button type="primary" onClick={() => setCustomVisible(true)}>
                            Open Form Modal
                        </Button>
                        <Modal
                            title="Custom Form Modal"
                            open={customVisible}
                            onOk={handleCustomOk}
                            onCancel={() => {
                                setCustomVisible(false);
                                form.resetFields();
                            }}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                name="form_in_modal"
                            >
                                <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the title!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                >
                                    <Input type="textarea" />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Modals; 