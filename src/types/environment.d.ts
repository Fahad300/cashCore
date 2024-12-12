// Environment configuration
export interface Environment {
  API_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
  DATABASE_URL: string;
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  PORT?: number;
  CORS_ORIGIN?: string;
  LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error';
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
} 