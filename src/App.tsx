import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import MainLayout from './layouts/MainLayout/MainLayout.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import { themes, ThemeType, ThemeMode } from './config/theme.ts';
import { getStoredTheme, setStoredTheme } from './utils/theme.ts';
import { syncThemeTokens } from './utils/themeUtils.ts';
import './styles/themes/_transitions.scss';

const App = () => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>(getStoredTheme().themeType);
    const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredTheme().themeMode);

    const handleThemeChange = (newTheme: ThemeType) => {
        setCurrentTheme(newTheme);
        setStoredTheme(newTheme, themeMode);
    };

    const handleThemeModeChange = (newMode: ThemeMode) => {
        setThemeMode(newMode);
        setStoredTheme(currentTheme, newMode);
    };

    useEffect(() => {
        // Sync theme tokens whenever theme changes
        const currentThemeConfig = themes[currentTheme].config(themeMode);
        syncThemeTokens(currentThemeConfig);
        document.body.className = `${themes[currentTheme].className} theme-${themeMode}`;
    }, [currentTheme, themeMode]);

    return (
        <ConfigProvider theme={themes[currentTheme].config(themeMode)}>
            <div className={`app-container ${themes[currentTheme].className} theme-${themeMode}`}>
                <MainLayout
                    currentTheme={currentTheme}
                    themeMode={themeMode}
                    onThemeChange={handleThemeChange}
                    onThemeModeChange={handleThemeModeChange}
                >
                    <Dashboard />
                </MainLayout>
            </div>
        </ConfigProvider>
    );
};

export default App;
