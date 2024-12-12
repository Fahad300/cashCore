import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Input, Badge, Avatar, Space, Grid, FloatButton } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    BgColorsOutlined,
    SearchOutlined,
    BellOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    SunOutlined,
    MoonOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { themes, ThemeType, ThemeMode } from '../../config/theme.ts';
import MobileMenu from './MobileMenu.tsx';
import './header.scss';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

interface MainLayoutProps {
    children: React.ReactNode;
    currentTheme: ThemeType;
    themeMode: ThemeMode;
    onThemeChange: (theme: ThemeType) => void;
    onThemeModeChange: (mode: ThemeMode) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    currentTheme,
    themeMode,
    onThemeChange,
    onThemeModeChange
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const { token } = theme.useToken();
    const screens = useBreakpoint();

    const isMobile = !screens.lg;

    useEffect(() => {
        setCollapsed(!screens.lg);
    }, [screens.lg]);

    const menuItems = [
        {
            key: '1',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        }
    ];

    const combinedMobileMenuItems = [
        ...menuItems,
        { type: 'divider' },
        {
            key: 'theme-mode',
            icon: themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />,
            label: `Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode`,
            onClick: () => onThemeModeChange(themeMode === 'light' ? 'dark' : 'light')
        },
        {
            key: 'theme-color',
            icon: <BgColorsOutlined />,
            label: 'Theme Colors',
            children: Object.entries(themes).map(([key, theme]) => ({
                key: `theme-${key}`,
                label: theme.name,
                onClick: () => onThemeChange(key as ThemeType)
            }))
        },
        { type: 'divider' },
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile'
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings'
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout'
        }
    ];

    const themeMenu = {
        items: Object.entries(themes).map(([key, theme]) => ({
            key,
            label: theme.name,
            onClick: () => onThemeChange(key as ThemeType)
        }))
    };

    const userMenu = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: 'Profile'
            },
            {
                key: 'settings',
                icon: <SettingOutlined />,
                label: 'Settings'
            },
            {
                type: 'divider'
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout'
            }
        ],
        onClick: ({ key }: { key: string }) => console.log('User menu clicked:', key)
    };

    return (
        <Layout>
            {!isMobile && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    breakpoint="lg"
                    style={{
                        background: token.colorBgContainer,
                        borderRight: `1px solid ${token.colorBorder}`,
                        position: 'fixed',
                        height: '100vh',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div className="logoContainer" style={{ borderBottom: `1px solid ${token.colorBorder}` }}>
                        <img
                            src={themeMode === 'dark' ? (collapsed ? "/collapsed-logo.png" : "/logo-white.png") : (collapsed ? "/collapsed-logo.png" : "/logo.png")}
                            alt="Logo"
                            style={{ width: '100%', height: '40px' }}
                        />
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={menuItems}
                    />
                </Sider>
            )}

            <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 200), transition: 'all 0.2s' }}>
                <Header style={{
                    padding: '0 16px',
                    background: token.colorBgContainer,
                    borderBottom: `1px solid ${token.colorBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%'
                }}>
                    <div className="header-left">
                        {isMobile && (
                            <div className="logoContainer" style={{ borderBottom: `1px solid ${token.colorBorder}` }}>
                                <img
                                    src={themeMode === 'dark' ? "/logo-white.png" : "/logo.png"}
                                    alt="Logo"
                                    style={{ width: '100%', height: '40px' }}
                                />
                            </div>
                        )}
                        {screens.md && (
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{ fontSize: '16px', width: 64, height: 64 }}
                            />
                        )}
                        {screens.md && (
                            <Input
                                placeholder="Search..."
                                prefix={<SearchOutlined />}
                                style={{
                                    width: screens.xl ? 350 : screens.lg ? 250 : 200,
                                    marginLeft: 16
                                }}
                            />
                        )}
                    </div>

                    <div className="header-right">
                        <Space size={screens.md ? 16 : 8}>
                            {screens.sm && (
                                <Button
                                    type="text"
                                    icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
                                    onClick={() => onThemeModeChange(themeMode === 'light' ? 'dark' : 'light')}
                                    style={{ fontSize: '16px' }}
                                />
                            )}

                            {screens.sm && (
                                <Dropdown menu={themeMenu} placement="bottomRight">
                                    <Button
                                        type="text"
                                        icon={<BgColorsOutlined />}
                                        style={{ fontSize: '16px' }}
                                    />
                                </Dropdown>
                            )}

                            <Badge count={5} dot>
                                <Button
                                    type="text"
                                    icon={<BellOutlined />}
                                    style={{ fontSize: '16px' }}
                                />
                            </Badge>

                            <Dropdown menu={userMenu} placement="bottomRight">
                                <Space>
                                    <Avatar icon={<UserOutlined />} />
                                    {screens.sm && <span>John Doe</span>}
                                </Space>
                            </Dropdown>
                        </Space>
                    </div>
                </Header>
                <Content style={{
                    height: 'calc(100vh - 80px)',
                    overflow: 'auto',
                    padding: screens.md ? 20 : 10,
                    background: token.colorBgContainer
                }}>
                    {children}
                </Content>
            </Layout>

            {isMobile && (
                <>
                    <FloatButton
                        icon={<MenuOutlined />}
                        type="primary"
                        style={{
                            position: 'fixed',
                            bottom: 24,
                            left: 24,
                        }}
                        onClick={() => setMobileMenuVisible(true)}
                    />
                    <MobileMenu
                        visible={mobileMenuVisible}
                        onClose={() => setMobileMenuVisible(false)}
                        menuItems={combinedMobileMenuItems}
                        themeMode={themeMode}
                        currentTheme={currentTheme}
                        onThemeChange={onThemeChange}
                        onThemeModeChange={onThemeModeChange}
                    />
                </>
            )}
        </Layout>
    );
};

export default MainLayout; 