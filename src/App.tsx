import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Market from './pages/Market/Market';
import Trading from './pages/Trading/Trading';
import Wallet from './pages/Wallet/Wallet';
import Transactions from './pages/Transactions/Transactions';
import Loan from './pages/Loan/Loan';
import LiquidityPools from './pages/LiquidityPools/LiquidityPools';
import Components from './pages/Components';
import { themes, ThemeType, ThemeMode } from './config/theme';
import { getStoredTheme, setStoredTheme } from './utils/theme';
import { syncThemeTokens } from './utils/themeUtils';
import './styles/themes/_transitions.scss';
import Documentation from './pages/Documentation';
import APIReference from './pages/APIReference';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import TwoFactor from './pages/Auth/TwoFactor';
import VerifyEmail from './pages/Auth/VerifyEmail';

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
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          {/* Auth Routes */}
          <Route path="auth/*" element={
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="two-factor" element={<TwoFactor />} />
              <Route path="verify-email" element={<VerifyEmail />} />
            </Routes>
          } />

          {/* Protected Routes */}
          <Route path="/*" element={
            <MainLayout
              currentTheme={currentTheme}
              themeMode={themeMode}
              onThemeChange={handleThemeChange}
              onThemeModeChange={handleThemeModeChange}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="components/*" element={<Components />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="market" element={<Market />} />
                <Route path="trading" element={<Trading />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="loan" element={<Loan />} />
                <Route path="liquidity" element={<LiquidityPools />} />
                <Route path="docs" element={<Documentation />} />
                <Route path="api" element={<APIReference />} />
                <Route path="support" element={<Support />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </MainLayout>
          } />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
