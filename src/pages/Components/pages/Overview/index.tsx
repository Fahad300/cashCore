import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {
    BorderOutlined,
    FormOutlined,
    TableOutlined,
    CreditCardOutlined,
    AreaChartOutlined,
    WindowsOutlined,
    NotificationOutlined,
    FontSizeOutlined
} from '@ant-design/icons';
import styles from './Overview.module.scss';

const { Title, Paragraph } = Typography;

const components = [
    {
        title: 'Buttons',
        icon: <BorderOutlined />,
        description: 'Various button styles and types including primary, default, dashed, text, and link buttons.',
        path: '/components/buttons',
        examples: ['Primary Button', 'Icon Button', 'Button Group']
    },
    {
        title: 'Forms',
        icon: <FormOutlined />,
        description: 'Form elements such as input fields, checkboxes, radio buttons, and more.',
        path: '/components/forms',
        examples: ['Basic Form', 'Advanced Form', 'Form Validation']
    },
    {
        title: 'Tables',
        icon: <TableOutlined />,
        description: 'Customizable table components for displaying data.',
        path: '/components/tables',
        examples: ['Basic Table', 'Sortable Table', 'Editable Table']
    },
    {
        title: 'Cards',
        icon: <CreditCardOutlined />,
        description: 'Card components for displaying information in a concise manner.',
        path: '/components/cards',
        examples: ['Basic Card', 'Hoverable Card', 'Card with Actions']
    },
    {
        title: 'Charts',
        icon: <AreaChartOutlined />,
        description: 'Various chart types for visualizing data.',
        path: '/components/charts',
        examples: ['Line Chart', 'Bar Chart', 'Pie Chart']
    },
    {
        title: 'Modals',
        icon: <WindowsOutlined />,
        description: 'Modal components for displaying information or prompting user actions.',
        path: '/components/modals',
        examples: ['Basic Modal', 'Modal with Footer', 'Modal with Custom Content']
    },
    {
        title: 'Notifications',
        icon: <NotificationOutlined />,
        description: 'Notification components for alerting users of important information.',
        path: '/components/notifications',
        examples: ['Basic Notification', 'Banner Notification', 'Notification with Icon']
    },
    {
        title: 'Typography',
        icon: <FontSizeOutlined />,
        description: 'Typography components for styling text content.',
        path: '/components/typography',
        examples: ['Headings', 'Paragraphs', 'Text Alignment']
    }
];

const Overview: React.FC = () => {
    return (
        <div className={styles.overview}>
            <Title level={2}>UI Components</Title>
            <Paragraph className={styles.description}>
                Explore our collection of UI components designed for building modern web applications. 
                Each component is customizable and follows best practices for accessibility and usability.
            </Paragraph>

            <Row gutter={[24, 24]}>
                {components.map(component => (
                    <Col xs={24} sm={12} lg={8} key={component.path}>
                        <Link to={component.path}>
                            <Card hoverable className={styles.componentCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.icon}>{component.icon}</div>
                                    <Title level={4}>{component.title}</Title>
                                </div>
                                <Paragraph className={styles.description}>
                                    {component.description}
                                </Paragraph>
                                <div className={styles.examples}>
                                    <div className={styles.examplesTitle}>Examples:</div>
                                    <ul>
                                        {component.examples.map((example, index) => (
                                            <li key={index}>{example}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Overview;
