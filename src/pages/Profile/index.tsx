import React from 'react';
import { Typography, Card, Tabs, Form, Input, Button, Upload, Avatar, Space } from 'antd';
import { UserOutlined, UploadOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import styles from './Profile.module.scss';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        console.log('Form submitted:', values);
    };

    return (
        <div className={styles.profile}>
            <Title level={2}>Profile Settings</Title>

            <Card className={styles.profileCard}>
                <Tabs defaultActiveKey="general">
                    <TabPane 
                        tab={<span><UserOutlined /> General</span>} 
                        key="general"
                    >
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={handleSubmit}
                            initialValues={{
                                name: 'John Doe',
                                email: 'john@example.com',
                            }}
                        >
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                <div className={styles.avatarUpload}>
                                    <Avatar size={100} icon={<UserOutlined />} />
                                    <Upload>
                                        <Button icon={<UploadOutlined />}>Change Avatar</Button>
                                    </Upload>
                                </div>

                                <Form.Item
                                    label="Full Name"
                                    name="name"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, type: 'email' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Button type="primary" htmlType="submit">
                                    Save Changes
                                </Button>
                            </Space>
                        </Form>
                    </TabPane>

                    <TabPane 
                        tab={<span><LockOutlined /> Security</span>} 
                        key="security"
                    >
                        <Form layout="vertical">
                            <Form.Item
                                label="Current Password"
                                name="currentPassword"
                                rules={[{ required: true }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="New Password"
                                name="newPassword"
                                rules={[{ required: true }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[{ required: true }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Button type="primary">
                                Update Password
                            </Button>
                        </Form>
                    </TabPane>

                    <TabPane 
                        tab={<span><SafetyCertificateOutlined /> 2FA</span>} 
                        key="2fa"
                    >
                        {/* Add 2FA setup content */}
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default Profile; 