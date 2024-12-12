import { ThemeConfig, theme } from 'antd';

export type ThemeType = 'azure' | 'golden' | 'royal';
export type ThemeMode = 'light' | 'dark';

interface ThemeOption {
    name: string;
    config: (mode: ThemeMode) => ThemeConfig;
    className: string;
}

export const themes: Record<ThemeType, ThemeOption> = {
    azure: {
        name: 'Azure Blue',
        config: (mode: ThemeMode) => ({
            token: {
                colorPrimary: '#1890ff',
                colorBgContainer: mode === 'light' ? '#ffffff' : '#141414',
                colorBgLayout: mode === 'light' ? '#f0f2f5' : '#000000',
                colorBorder: mode === 'light' ? '#e9edf7' : '#303030',
                colorText: mode === 'light' ? '#000000' : '#ffffff',
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