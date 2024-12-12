import React from 'react';
import { Drawer, Menu, Divider, theme } from 'antd';
import { ThemeType, ThemeMode } from '../../config/theme.ts';

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
                onClick={({ key }) => {
                    if (key !== 'theme-mode' && key !== 'theme-color') {
                        onClose();
                    }
                }}
            />
        </Drawer>
    );
};

export default MobileMenu; 