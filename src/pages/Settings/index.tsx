import React from 'react';
import { Typography, Card, Switch, Select, Form, Button, Space } from 'antd';
import { SettingOutlined, BellOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './Settings.module.scss';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Settings = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        console.log('Settings updated:', values);
    };

    return (
        <div className={styles.settings}>
            <Title level={2}>Settings</Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    language: 'en',
                    timezone: 'UTC',
                    emailNotifications: true,
                    pushNotifications: true,
                }}
            >
                <Card title={<><SettingOutlined /> General Settings</>}>
                    <Form.Item
                        label="Language"
                        name="language"
                    >
                        <Select>
                            <Option value="en">English</Option>
                            <Option value="es">Spanish</Option>
                            <Option value="fr">French</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Timezone"
                        name="timezone"
                    >
                        <Select>
                            <Option value="UTC">UTC</Option>
                            <Option value="EST">EST</Option>
                            <Option value="PST">PST</Option>
                        </Select>
                    </Form.Item>
                </Card>

                <Card title={<><BellOutlined /> Notifications</>} className={styles.settingCard}>
                    <Form.Item
                        label="Email Notifications"
                        name="emailNotifications"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label="Push Notifications"
                        name="pushNotifications"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Card>

                <Card title={<><EyeOutlined /> Display</>} className={styles.settingCard}>
                    <Form.Item
                        label="Compact Mode"
                        name="compactMode"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label="Show Balance"
                        name="showBalance"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Card>

                <Button type="primary" htmlType="submit">
                    Save Settings
                </Button>
            </Form>
        </div>
    );
};

export default Settings; 