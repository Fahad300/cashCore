import React from 'react';
import { Result, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import styles from './VerifyEmail.module.scss';

const VerifyEmail = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout title="Verify Your Email">
            <Result
                icon={<MailOutlined style={{ color: '#1890ff' }} />}
                title="Check your email"
                subTitle={
                    <div className={styles.description}>
                        <p>We've sent a verification link to:</p>
                        <p className={styles.email}>john.doe@example.com</p>
                        <p>Please click the link to verify your email address and activate your account.</p>
                    </div>
                }
                extra={[
                    <Button 
                        type="primary" 
                        key="console" 
                        size="large"
                        onClick={() => navigate('/auth/login')}
                    >
                        Return to Login
                    </Button>,
                    <Button 
                        key="resend" 
                        size="large"
                    >
                        Resend Email
                    </Button>,
                ]}
            />
        </AuthLayout>
    );
};

export default VerifyEmail; 