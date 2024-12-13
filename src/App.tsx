import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Market from './pages/Market/Market';
import Trading from './pages/Trading/Trading';
import { themes, ThemeType, ThemeMode } from './config/theme';
import { getStoredTheme, setStoredTheme } from './utils/theme';
import { syncThemeTokens } from './utils/themeUtils';
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
            <Router>
                <div className={`app-container ${themes[currentTheme].className} theme-${themeMode}`}>
                    <MainLayout
                        currentTheme={currentTheme}
                        themeMode={themeMode}
                        onThemeChange={handleThemeChange}
                        onThemeModeChange={handleThemeModeChange}
                    >
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/market" element={<Market />} />
                            <Route path="/trading" element={<Trading />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </MainLayout>
                </div>
            </Router>
        </ConfigProvider>
    );
};

export default App;
