import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import styles from './ForgotPassword.module.scss';

const ForgotPassword = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Reset password request:', values);
    };

    return (
        <AuthLayout title="Reset Password">
            <p className={styles.description}>
                Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <Form
                form={form}
                name="forgotPassword"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input 
                        prefix={<MailOutlined />} 
                        placeholder="Email" 
                        size="large" 
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Send Reset Link
                    </Button>
                </Form.Item>

                <div className={styles.loginLink}>
                    Remember your password? <Link to="/auth/login">Log in</Link>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default ForgotPassword; 