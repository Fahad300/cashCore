import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Dropdown } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    BgColorsOutlined
} from '@ant-design/icons';
import { themes, ThemeType } from '../../config/theme.ts';
import styles from './header.scss';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
    children: React.ReactNode;
    currentTheme: ThemeType;
    onThemeChange: (theme: ThemeType) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    currentTheme,
    onThemeChange
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const { token } = theme.useToken();

    const themeMenu = {
        items: Object.entries(themes).map(([key, theme]) => ({
            key,
            label: theme.name,
        })),
        onClick: ({ key }: { key: string }) => onThemeChange(key as ThemeType),
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.logo}>
                    <img src="/logo512.png" alt="Logo" className={styles.logo} />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <DashboardOutlined />,
                            label: 'Dashboard',
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: token.colorBgContainer, borderBottom: `1px solid ${token.colorBorder}` }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Dropdown menu={themeMenu} placement="bottomRight">
                        <Button
                            type="text"
                            icon={<BgColorsOutlined />}
                            style={{
                                fontSize: '16px',
                                float: 'right',
                                margin: '16px 24px'
                            }}
                        />
                    </Dropdown>
                </Header>
                <Content style={{ height: 'calc(100vh - 80px)', overflow: 'auto', padding: 20, background: token.colorBgContainer }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout; 