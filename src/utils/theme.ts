import { ThemeType, ThemeMode } from '../config/theme.ts';

const THEME_COLOR_KEY = 'theme-color';
const THEME_MODE_KEY = 'theme-mode';

export const getStoredTheme = (): { themeType: ThemeType; themeMode: ThemeMode } => ({
    themeType: (localStorage.getItem(THEME_COLOR_KEY) as ThemeType) || 'azure',
    themeMode: (localStorage.getItem(THEME_MODE_KEY) as ThemeMode) || 'light'
});

export const setStoredTheme = (themeType: ThemeType, themeMode: ThemeMode): void => {
    localStorage.setItem(THEME_COLOR_KEY, themeType);
    localStorage.setItem(THEME_MODE_KEY, themeMode);
}; 