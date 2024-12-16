import React, { useState } from 'react';
import { Card, Typography, Button, message } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './CodeExample.module.scss';

const { Title } = Typography;

interface CodeExampleProps {
    title: string;
    description?: string;
    code: string;
    language?: string;
    children?: React.ReactNode;
}

const CodeExample: React.FC<CodeExampleProps> = ({
    title,
    description,
    code,
    language = 'typescript',
    children
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            message.success('Code copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            message.error('Failed to copy code');
        }
    };

    return (
        <Card className={styles.codeExample}>
            <div className={styles.preview}>
                <Title level={4}>{title}</Title>
                {description && <p>{description}</p>}
                <div className={styles.component}>{children}</div>
            </div>
            <div className={styles.codeSection}>
                <div className={styles.codeHeader}>
                    <span>Example Code</span>
                    <Button
                        type="text"
                        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                </div>
                <pre className={styles.codeBlock}>
                    <code>{code}</code>
                </pre>
            </div>
        </Card>
    );
};

export default CodeExample;
