import { ThemeConfig } from 'antd';
import type { AliasToken } from 'antd/es/theme/internal';

export const syncThemeTokens = (themeConfig: ThemeConfig) => {
    const root = document.documentElement;
    const { token } = themeConfig;

    if (token) {
        Object.entries(token as Partial<AliasToken>).forEach(([key, value]) => {
            const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            if (typeof value === 'number') {
                root.style.setProperty(`--${cssVar}`, `${value}px`);
            } else if (typeof value === 'string') {
                root.style.setProperty(`--${cssVar}`, value);
            }
        });
    }
}; 