import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import styles from './TwoFactor.module.scss';

const TwoFactor = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('2FA code submitted:', values);
        navigate('/dashboard');
    };

    return (
        <AuthLayout title="Two-Factor Authentication">
            <div className={styles.description}>
                <p>Please enter the verification code sent to your device.</p>
                <p className={styles.email}>john.doe@example.com</p>
            </div>

            <Form
                form={form}
                name="2fa"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
            >
                <Form.Item
                    name="code"
                    rules={[
                        { required: true, message: 'Please input the verification code!' },
                        { len: 6, message: 'Please enter a 6-digit code!' }
                    ]}
                >
                    <Input 
                        prefix={<LockOutlined />}
                        placeholder="Enter 6-digit code"
                        size="large"
                        maxLength={6}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Verify
                    </Button>
                </Form.Item>

                <Space className={styles.actions} direction="vertical" align="center">
                    <Button type="link">Didn't receive a code?</Button>
                    <Button type="link" onClick={() => navigate('/auth/login')}>
                        Use another method
                    </Button>
                </Space>
            </Form>
        </AuthLayout>
    );
};

export default TwoFactor; 