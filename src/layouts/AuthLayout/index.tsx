import React, { useEffect, useState } from 'react';
import { Layout, Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SecurityScanOutlined, SafetyCertificateOutlined, DollarCircleOutlined, HighlightTwoTone } from '@ant-design/icons';
import { useLottie } from 'lottie-react';
import styles from './AuthLayout.module.scss';

const { Content } = Layout;

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
    const navigate = useNavigate();
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch("https://lottie.host/3d726327-e54c-43eb-8136-03efedbbf29f/GSXcIdBpmI.json")
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.error('Error loading animation:', error));
    }, []);

    const options = {
        animationData,
        loop: true,
        autoplay: true,
        HighlightTwoTone: true,
    };

    const { View } = useLottie(options);

    const features = [
        {
            icon: <SecurityScanOutlined className={styles.featureIcon} />,
            title: 'Secure Trading',
            description: 'Advanced encryption and security protocols'
        },
        {
            icon: <SafetyCertificateOutlined className={styles.featureIcon} />,
            title: 'Licensed & Regulated',
            description: 'Fully compliant with financial regulations'
        }
    ];

    return (
        <Layout className={styles.authLayout}>
            <Content className={styles.content}>
                <div className={styles.leftSection}>
                    <div className={styles.brandSection}>
                        <div className={styles.mainImage}>
                            {animationData && View}
                        </div>
                        <p className={styles.tagline}>Your complete crypto trading solution</p>

                        <div className={styles.features}>
                            {features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    {feature.icon}
                                    <div className={styles.featureText}>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <h4>10M+</h4>
                                <p>Active Users</p>
                            </div>
                            <div className={styles.statItem}>
                                <h4>$50B+</h4>
                                <p>Trading Volume</p>
                            </div>
                            <div className={styles.statItem}>
                                <h4>100+</h4>
                                <p>Countries</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.rightContent}>
                        <div className={styles.logoSection}>
                            <img
                                src={"/logo-white.png"}
                                alt="Logo"
                                className={styles.logo}
                            />
                        </div>
                        <Card className={styles.authCard}>
                            <h2>{title}</h2>
                            {children}
                        </Card>
                        <div className={styles.footer}>
                            <p>© 2024 Finance Dashboard. All rights reserved.</p>
                            <div className={styles.links}>
                                <a href="#">Privacy Policy</a>
                                <span>•</span>
                                <a href="#">Terms of Service</a>
                                <span>•</span>
                                <a href="#">Help Center</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default AuthLayout;
