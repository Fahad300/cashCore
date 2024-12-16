import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppstoreOutlined,
    BorderOutlined,
    FormOutlined,
    TableOutlined,
    CreditCardOutlined,
    AreaChartOutlined,
    WindowsOutlined,
    NotificationOutlined,
    FontSizeOutlined
} from '@ant-design/icons';
import styles from './ComponentLayout.module.scss';

const { Sider, Content } = Layout;

const ComponentLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: '',
            icon: <AppstoreOutlined />,
            label: 'Overview',
            onClick: () => navigate('/components')
        },
        {
            key: 'buttons',
            icon: <BorderOutlined />,
            label: 'Buttons',
            onClick: () => navigate('/components/buttons')
        },
        {
            key: 'forms',
            icon: <FormOutlined />,
            label: 'Forms',
            onClick: () => navigate('/components/forms')
        },
        {
            key: 'tables',
            icon: <TableOutlined />,
            label: 'Tables',
            onClick: () => navigate('/components/tables')
        },
        {
            key: 'cards',
            icon: <CreditCardOutlined />,
            label: 'Cards',
            onClick: () => navigate('/components/cards')
        },
        {
            key: 'charts',
            icon: <AreaChartOutlined />,
            label: 'Charts',
            onClick: () => navigate('/components/charts')
        },
        {
            key: 'modals',
            icon: <WindowsOutlined />,
            label: 'Modals',
            onClick: () => navigate('/components/modals')
        },
        {
            key: 'notifications',
            icon: <NotificationOutlined />,
            label: 'Notifications',
            onClick: () => navigate('/components/notifications')
        },
        {
            key: 'typography',
            icon: <FontSizeOutlined />,
            label: 'Typography',
            onClick: () => navigate('/components/typography')
        }
    ];

    const getSelectedKey = () => {
        const path = location.pathname.split('/');
        return path[path.length - 1] || '';
    };

    return (
        <Layout className={styles.componentLayout}>
            <Sider width={250} theme="light" className={styles.componentSider}
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    zIndex: 1000,
                }}
            >
                <Menu
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    items={menuItems}

                />
            </Sider>
            <Content className={styles.componentContent}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default ComponentLayout; 