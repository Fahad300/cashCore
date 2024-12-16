import React from 'react';
import { Form, Input, Button, Checkbox, Divider, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import styles from './SignUp.module.scss';

const SignUp = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Signup form submitted:', values);
        // Add signup logic here
        navigate('/auth/verify-email');
    };

    return (
        <AuthLayout title="Create Account">
            <Form
                form={form}
                name="signup"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input 
                        prefix={<UserOutlined />} 
                        placeholder="Full Name" 
                        size="large" 
                    />
                </Form.Item>

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

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Confirm Password"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        { 
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions')),
                        },
                    ]}
                >
                    <Checkbox>
                        I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                        <Link to="/privacy">Privacy Policy</Link>
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Sign Up
                    </Button>
                </Form.Item>

                <Divider>or sign up with</Divider>

                <Space className={styles.socialButtons}>
                    <Button icon={<GoogleOutlined />} size="large">
                        Google
                    </Button>
                    <Button icon={<GithubOutlined />} size="large">
                        GitHub
                    </Button>
                </Space>

                <div className={styles.loginLink}>
                    Already have an account? <Link to="/auth/login">Log in</Link>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default SignUp;