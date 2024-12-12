import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import MainLayout from './layouts/MainLayout/MainLayout.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import { themes, ThemeType } from './config/theme.ts';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('azure');

  return (
    <ConfigProvider theme={themes[currentTheme].config}>
      <div className={themes[currentTheme].className}>
        <MainLayout
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        >
          <Dashboard />
        </MainLayout>
      </div>
    </ConfigProvider>
  );
};

export default App;
