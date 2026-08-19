// Types for the dashboard components

export interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  walletAddress?: string | null;
  emailVerified?: Date | null;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Investment {
  id: string;
  userId: string;
  amount: number | { toString: () => string };
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  returnRate?: number;
  duration?: number;
  endDate?: string;
  description?: string;
  receiptUrl?: string;
  currentValue?: number;
  returns?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  investmentId: string;
  amount: number;
  type: string; // "deposit" or "withdrawal"
  status: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string; // "info", "success", "warning", "error"
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  min_amount: number;
  max_amount: number;
  annual_return_rate: number;
  duration_months: number;
  risk_level: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  totalInvested: number;
  totalValue: number;
  totalReturns: number;
  pendingCount: number;
}

export interface WithdrawalFormData {
  investmentId: string;
  amount: string;
  walletAddress: string;
}
