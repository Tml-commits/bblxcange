export interface User {
  _id: string;
  name?: string;
  email: string;
  phonenumber?: string | null;
  phoneVerified: boolean;
  emailVerified: boolean;
  kycVerification: boolean;
  isAdmin: boolean;
  role?: string;
  firstDeposit: boolean;
  refCode: string;
  referralCode?: string;
  referBy: string;
  referralCount: number;
  referrals: Referral[];
  balance: number;
  exchangeBalance: number;
  tradeBalance: number;
  createdAt: string;
  updatedAt: string;
  country?: string;
  vipLastUpdated?: string | null;
  vipTier?: VipTier;
  vipLevel?: number;
  uid?: string;
  __v: number;
}

export interface VipTier {
  _id: string;
  vipName: string;
  vipLevel: number;
}

export interface Referral {
  _id: string;
  email: string;
  createdAt?: string;
  firstDeposit?: boolean;
}
