// Core state interfaces
interface UserPreferences {
  theme: 'light' | 'dark';
  currency: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
}

interface User {
  id: string;
  role: 'admin' | 'user';
  preferences: UserPreferences;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  description?: string;
  tags?: string[];
  userId: string;
}

interface DashboardState {
  user: User | null;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

export type { User, Transaction, DashboardState, UserPreferences }; 