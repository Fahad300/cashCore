import { ThemeConfig } from 'antd';

export type ThemeType = 'azure' | 'golden' | 'royal';

interface ThemeOption {
    name: string;
    config: ThemeConfig;
    className: string;
}

export const themes: Record<ThemeType, ThemeOption> = {
    azure: {
        name: 'Azure Blue',
        config: {
            token: {
                colorPrimary: '#1890ff',
                colorBgContainer: '#ffffff',
                colorBgLayout: '#f0f2f5',
                colorBorder: '#e9edf7',
            },
        },
        className: 'theme-azure'
    },
    golden: {
        name: 'Golden Yellow',
        config: {
            token: {
                colorPrimary: '#faad14',
                colorBgContainer: '#ffffff',
                colorBgLayout: '#fffbe6',
                colorBorder: '#e9edf7',
            },
        },
        className: 'theme-golden'
    },
    royal: {
        name: 'Royal Green',
        config: {
            token: {
                colorPrimary: '#52c41a',
                colorBgContainer: '#ffffff',
                colorBgLayout: '#f6ffed',
                colorBorder: '#e9edf7',
            },
        },
        className: 'theme-royal'
    }
}; 