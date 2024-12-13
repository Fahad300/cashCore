import { ThemeConfig, theme } from 'antd';

export type ThemeType = 'azure' | 'golden' | 'royal';
export type ThemeMode = 'light' | 'dark';

interface ThemeTokens extends ThemeConfig {
    token: {
        colorPrimary: string;
        colorBgContainer: string;
        colorBgLayout: string;
        colorBorder: string;
        colorText: string;
        colorPrimaryHover: string;
        colorError: string;
        fontFamily: string;
        fontSize: number;
        headerHeight: number;
        sidebarWidth: number;
        transition: string;
        borderRadius: number;
        colorTextSecondary: string;
    }
}

interface ThemeOption {
    name: string;
    config: (mode: ThemeMode) => ThemeTokens;
    className: string;
}

export const themes: Record<ThemeType, ThemeOption> = {
    azure: {
        name: 'Azure Blue',
        config: (mode: ThemeMode): ThemeTokens => ({
            token: {
                colorPrimary: '#1890ff',
                colorPrimaryHover: '#40a9ff',
                colorError: '#ff4d4f',
                colorBgContainer: mode === 'light' ? '#ffffff' : '#141414',
                colorBgLayout: mode === 'light' ? '#f0f2f5' : '#000000',
                colorBorder: mode === 'light' ? '#e9edf7' : '#303030',
                colorText: mode === 'light' ? '#000000' : '#ffffff',
                colorTextSecondary: mode === 'light' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.45)',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                fontSize: 14,
                headerHeight: 64,
                sidebarWidth: 250,
                transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
                borderRadius: 6
            },
            algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }),
        className: 'theme-azure'
    },
    golden: {
        name: 'Golden Yellow',
        config: (mode: ThemeMode) => ({
            token: {
                colorPrimary: '#faad14',
                colorBgContainer: mode === 'light' ? '#ffffff' : '#141414',
                colorBgLayout: mode === 'light' ? '#fffbe6' : '#000000',
                colorBorder: mode === 'light' ? '#e9edf7' : '#303030',
                colorText: mode === 'light' ? '#000000' : '#ffffff',
            },
            algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }),
        className: 'theme-golden'
    },
    royal: {
        name: 'Royal Green',
        config: (mode: ThemeMode) => ({
            token: {
                colorPrimary: '#52c41a',
                colorBgContainer: mode === 'light' ? '#ffffff' : '#141414',
                colorBgLayout: mode === 'light' ? '#f6ffed' : '#000000',
                colorBorder: mode === 'light' ? '#e9edf7' : '#303030',
                colorText: mode === 'light' ? '#000000' : '#ffffff',
            },
            algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }),
        className: 'theme-royal'
    }
}; 