import React from 'react';
import { Form, Input, Button, Checkbox, Divider, Space } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import styles from './Login.module.scss';

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Login form submitted:', values);
        navigate('/dashboard');
    };

    return (
        <AuthLayout title="Welcome Back">
            <Form form={form} name="login" onFinish={onFinish} layout="vertical">
                <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                </Form.Item>

                <Form.Item>
                    <div className={styles.formActions}>
                        <Checkbox>Remember me</Checkbox>
                        <Link to="/auth/forgot-password">Forgot password?</Link>
                    </div>
                </Form.Item>

                <Button type="primary" htmlType="submit" block size="large">Log in</Button>

                <div className={styles.signupLink}>
                    Don't have an account? <Link to="/auth/signup">Sign up</Link>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default Login;