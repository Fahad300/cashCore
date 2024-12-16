import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import styles from './ResetPassword.module.scss';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Reset password:', values);
        navigate('/auth/login');
    };

    return (
        <AuthLayout title="Set New Password">
            <p className={styles.description}>
                Please enter your new password below.
            </p>

            <Form
                form={form}
                name="resetPassword"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
            >
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="New Password"
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </AuthLayout>
    );
};

export default ResetPassword; 