import { ThemeConfig } from 'antd';

export const syncThemeTokens = (themeConfig: ThemeConfig) => {
    const root = document.documentElement;
    const { token } = themeConfig;

    // Set CSS variables based on theme tokens
    Object.entries(token).forEach(([key, value]) => {
        // Convert camelCase to kebab-case
        const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        if (typeof value === 'number') {
            root.style.setProperty(`--${cssVar}`, `${value}px`);
        } else {
            root.style.setProperty(`--${cssVar}`, value);
        }
    });
}; 