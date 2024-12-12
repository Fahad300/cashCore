// Route structure
interface ApiRoutes {
  auth: {
    login: string;
    register: string;
    refresh: string;
  };
  transactions: {
    base: string;
    byId: string;
    summary: string;
  };
  reports: {
    generate: string;
    download: string;
  };
  users: {
    profile: string;
    preferences: string;
  };
}

const routes: ApiRoutes = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
  },
  transactions: {
    base: '/api/transactions',
    byId: '/api/transactions/:id',
    summary: '/api/transactions/summary',
  },
  reports: {
    generate: '/api/reports/generate',
    download: '/api/reports/download/:id',
  },
  users: {
    profile: '/api/users/profile',
    preferences: '/api/users/preferences',
  }
};

export default routes; 