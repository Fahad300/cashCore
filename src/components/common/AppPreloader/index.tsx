import React from 'react';
import { ThemeMode } from '../../../config/theme';
import styles from './AppPreloader.module.scss';

interface AppPreloaderProps {
    themeMode?: ThemeMode;
}

const AppPreloader: React.FC<AppPreloaderProps> = ({ themeMode = 'light' }) => {
    return (
        <div className={`${styles.appPreloader} ${styles[themeMode]}`}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <img 
                        src={themeMode === 'dark' ? "/logo-white.png" : "/logo.png"} 
                        alt="Logo" 
                    />
                </div>
                <div className={styles.circles}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={styles.loadingText}>
                    Loading<span>.</span><span>.</span><span>.</span>
                </div>
            </div>
        </div>
    );
};

export default AppPreloader; 