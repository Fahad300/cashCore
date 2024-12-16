import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Input, Badge, Avatar, Space, Grid, FloatButton } from 'antd';
import { Typography } from 'antd';
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
    MenuOutlined,
    LineChartOutlined,
    SwapOutlined,
    WalletOutlined,
    HistoryOutlined,
    MoneyCollectOutlined,
    FundOutlined,
    AppstoreOutlined,
    AreaChartOutlined,
    FormOutlined,
    BookOutlined,
    ApiOutlined,
    CustomerServiceOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    WarningOutlined,
    CloseCircleOutlined,
    UserAddOutlined,
    KeyOutlined,
    SafetyOutlined,
    MailOutlined
} from '@ant-design/icons';
import { themes, ThemeType, ThemeMode } from '../../config/theme';
import MobileMenu from './MobileMenu';
import './header.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

interface MainLayoutProps {
    children: React.ReactNode;
    currentTheme: ThemeType;
    themeMode: ThemeMode;
    onThemeChange: (theme: ThemeType) => void;
    onThemeModeChange: (mode: ThemeMode) => void;
}

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    currentTheme,
    themeMode,
    onThemeChange,
    onThemeModeChange
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const { token } = theme.useToken();
    const screens = useBreakpoint();

    const isMobile = !screens.lg;

    useEffect(() => {
        setCollapsed(!screens.lg);
    }, [screens.lg]);

    type MenuItem = Required<MenuProps>['items'][number];
    type MenuGroup = {
        type: 'group';
        label: string;
        key: string;
        children: NonNullable<MenuItem>[];
    };

    const menuItems: MenuGroup[] = [
        {
            type: 'group',
            label: 'PAGES',
            key: 'pages',
            children: [
                {
                    key: '/',
                    icon: <DashboardOutlined />,
                    label: 'Dashboard',
                    onClick: () => navigate('/')
                },
                {
                    key: '/market',
                    icon: <LineChartOutlined />,
                    label: 'Market',
                    onClick: () => navigate('/market')
                },
                {
                    key: '/trading',
                    icon: <SwapOutlined />,
                    label: 'Trading',
                    onClick: () => navigate('/trading')
                },
                {
                    key: '/wallet',
                    icon: <WalletOutlined />,
                    label: 'Wallet',
                    onClick: () => navigate('/wallet')
                },
                {
                    key: '/transactions',
                    icon: <HistoryOutlined />,
                    label: 'Transactions',
                    onClick: () => navigate('/transactions')
                },
                {
                    key: '/loan',
                    icon: <MoneyCollectOutlined />,
                    label: 'Loan',
                    onClick: () => navigate('/loan')
                },
                {
                    key: '/liquidity',
                    icon: <FundOutlined />,
                    label: 'Liquidity',
                    onClick: () => navigate('/liquidity')
                }
            ]
        },
        {
            type: 'group',
            label: 'UI ELEMENTS',
            key: 'ui-elements',
            children: [
                {
                    key: '/components',
                    icon: <AppstoreOutlined />,
                    label: 'Components',
                    children: [
                        {
                            key: '/components/buttons',
                            label: 'Buttons',
                            onClick: () => navigate('/components/buttons')
                        },
                        {
                            key: '/components/cards',
                            label: 'Cards',
                            onClick: () => navigate('/components/cards')
                        },
                        {
                            key: '/components/tables',
                            label: 'Tables',
                            onClick: () => navigate('/components/tables')
                        }
                    ]
                },
                {
                    key: '/charts',
                    icon: <AreaChartOutlined />,
                    label: 'Charts',
                    children: [
                        {
                            key: '/charts/line',
                            label: 'Line Charts',
                            onClick: () => navigate('/components/charts')
                        },
                        {
                            key: '/charts/bar',
                            label: 'Bar Charts',
                            onClick: () => navigate('/components/charts')
                        },
                        {
                            key: '/charts/candlestick',
                            label: 'Candlestick',
                            onClick: () => navigate('/components/charts')
                        }
                    ]
                },
                {
                    key: '/forms',
                    icon: <FormOutlined />,
                    label: 'Forms',
                    onClick: () => navigate('/components/forms')
                }
            ]
        },
        {
            type: 'group',
            label: 'DOCUMENTATION & SUPPORT',
            key: 'docs-support',
            children: [
                {
                    key: '/docs',
                    icon: <BookOutlined />,
                    label: 'Documentation',
                    onClick: () => navigate('/docs')
                },
                {
                    key: '/api',
                    icon: <ApiOutlined />,
                    label: 'API Reference',
                    onClick: () => navigate('/api')
                },
                {
                    key: '/support',
                    icon: <CustomerServiceOutlined />,
                    label: 'Support',
                    onClick: () => navigate('/support')
                }
            ]
        },
        {
            type: 'group',
            label: 'Authentication',
            children: [
                {
                    key: 'auth-login',
                    icon: <UserOutlined />,
                    label: 'Login',
                    onClick: () => navigate('/auth/login')
                },
                {
                    key: 'auth-signup',
                    icon: <UserAddOutlined />,
                    label: 'Sign Up',
                    onClick: () => navigate('/auth/signup')
                },
                {
                    key: 'auth-forgot',
                    icon: <KeyOutlined />,
                    label: 'Forgot Password',
                    onClick: () => navigate('/auth/forgot-password')
                },
                {
                    key: 'auth-2fa',
                    icon: <SafetyOutlined />,
                    label: 'Two Factor',
                    onClick: () => navigate('/auth/two-factor')
                },
                {
                    key: 'auth-verify',
                    icon: <MailOutlined />,
                    label: 'Verify Email',
                    onClick: () => navigate('/auth/verify-email')
                }
            ]
        }
    ] as MenuGroup[];

    const combinedMobileMenuItems: MenuItem[] = [
        {
            type: 'group',
            label: 'PAGES',
            key: 'mobile-pages',
            children: menuItems[0].children
        },
        {
            type: 'group',
            label: 'UI ELEMENTS',
            key: 'mobile-ui',
            children: menuItems[1].children
        },
        {
            type: 'group',
            label: 'DOCUMENTATION & SUPPORT',
            key: 'mobile-docs',
            children: menuItems[2].children
        },
        { type: 'divider', key: 'divider-1' },
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
            children: Object.entries(themes).map(([key, themeOption]) => ({
                key: `theme-${key}`,
                label: themeOption.name,
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

    const themeMenu: MenuProps = {
        items: Object.entries(themes).map(([key, themeOption]) => ({
            key,
            label: themeOption.name,
            onClick: () => onThemeChange(key as ThemeType)
        }))
    };

    const userMenu: MenuProps = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: 'Profile',
                onClick: () => navigate('/profile')
            },
            {
                key: 'settings',
                icon: <SettingOutlined />,
                label: 'Settings',
                onClick: () => navigate('/settings')
            },
            {
                type: 'divider'
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
                onClick: () => {
                    // Add logout logic here
                    console.log('Logout clicked');
                }
            }
        ]
    };

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'New Market Alert',
            description: 'BTC price increased by 5% in the last hour',
            time: '5 minutes ago',
            read: false,
            type: 'info'
        },
        {
            id: '2',
            title: 'Order Completed',
            description: 'Your limit order for ETH has been fulfilled',
            time: '1 hour ago',
            read: false,
            type: 'success'
        },
        // Add more notifications as needed
    ]);

    const handleNotificationClick = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const notificationMenu = {
        items: [
            {
                key: 'notifications',
                label: (
                    <div className="notification-menu">
                        <div className="notification-header">
                            <Text strong>Notifications</Text>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                            >
                                Mark all as read
                            </Button>
                        </div>
                        <div className="notification-list">
                            {notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${notification.read ? 'read' : ''}`}
                                    onClick={() => handleNotificationClick(notification.id)}
                                >
                                    <div className="notification-icon">
                                        {notification.type === 'success' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
                                        {notification.type === 'info' && <InfoCircleOutlined style={{ color: '#1890ff' }} />}
                                        {notification.type === 'warning' && <WarningOutlined style={{ color: '#faad14' }} />}
                                        {notification.type === 'error' && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                                    </div>
                                    <div className="notification-content">
                                        <Text strong>{notification.title}</Text>
                                        <Text type="secondary">{notification.description}</Text>
                                        <Text type="secondary" className="notification-time">
                                            {notification.time}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="notification-footer">
                            <Button type="link" block onClick={() => navigate('/notifications')}>
                                View All
                            </Button>
                        </div>
                    </div>
                ),
            },
        ],
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
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        zIndex: 1000,
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
                        selectedKeys={[location.pathname]}
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
                                    src={themeMode === 'dark' ? "/logo-white.png" : "/logo"}
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

                            <Badge count={notifications.filter(n => !n.read).length}>
                                <Dropdown
                                    menu={notificationMenu}
                                    placement="bottomRight"
                                    trigger={['click']}
                                    overlayClassName="notification-dropdown"
                                >
                                    <Button
                                        type="text"
                                        icon={<BellOutlined />}
                                        style={{ fontSize: '16px' }}
                                    />
                                </Dropdown>
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