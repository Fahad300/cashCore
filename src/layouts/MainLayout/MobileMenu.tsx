import React from 'react';
import { Drawer, Menu, Divider, theme } from 'antd';
import { ThemeType, ThemeMode } from '../../config/theme';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
    visible: boolean;
    onClose: () => void;
    menuItems: any[];
    themeMode: ThemeMode;
    currentTheme: ThemeType;
    onThemeChange: (theme: ThemeType) => void;
    onThemeModeChange: (mode: ThemeMode) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    visible,
    onClose,
    menuItems,
    themeMode,
    currentTheme,
    onThemeChange,
    onThemeModeChange
}) => {
    const { token } = theme.useToken();
    const navigate = useNavigate();

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key.startsWith('/')) {
            navigate(key);
            onClose();
        } else if (key !== 'theme-mode' && key !== 'theme-color') {
            onClose();
        }
    };

    return (
        <Drawer
            title="Menu"
            placement="left"
            onClose={onClose}
            open={visible}
            width={280}
            styles={{
                body: {
                    padding: 0,
                    background: token.colorBgContainer
                }
            }}
        >
            <Menu
                mode="inline"
                items={menuItems}
                style={{ 
                    border: 'none',
                    background: 'transparent'
                }}
                onClick={handleMenuClick}
            />
        </Drawer>
    );
};

export default MobileMenu; 