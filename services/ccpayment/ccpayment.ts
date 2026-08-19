import axios from "@/lib/axios";
import type {
  CCPaymentCoinsResponse,
  Asset,
  AssetsResponse,
} from "@/types/ccpayment";

export const getCcPaymentCoins = async (purpose?: "deposit" | "withdraw") => {
  try {
    const query = purpose ? `?purpose=${purpose}` : "";
    const response = await axios.get<CCPaymentCoinsResponse>(
      `/ccpayment/coins${query}`
    );
    console.log("Raw API response:", response);
    return response.data;
  } catch (error) {
    console.error("Error in getCcPaymentCoins:", error);
    throw error;
  }
};

export const getAssets = async (): Promise<Asset[]> => {
  try {
    const response = await axios.get<AssetsResponse>("/ccpayment/assets");
    if (!response.data.success) {
      throw new Error("Failed to fetch assets");
    }
    return response.data.data.data.assets;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

export const getAsset = async (assetId: string) => {
  const response = await axios.post(`/ccpayment/assets/${assetId}`);
  return response.data;
};

export const withdraw = async (
  coinId: string,
  amount: number,
  address: string,
  chain: string,
  memo: string
) => {
  const response = await axios.post(`/ccpayment/withdraw`, {
    coinId,
    amount,
    address,
    chain,
    memo,
  });
  return response.data;
};

export const withdrawToTradingWallet = async (
  coinId: string,
  amount: number,
  destination: string,
  chain: string,
  memo: string
) => {
  const response = await axios.post(`/ccpayment/withdraw-to-trading-wallet`, {
    coinId,
    amount,
    destination,
    chain,
    memo,
  });
  return response.data;
};

export const getDepositAddress = async (chain: string) => {
  const response = await axios.post(`/ccpayment/deposit-address`, {
    chain,
  });
  return response.data;
};

export const getUserBalances = async () => {
  const response = await axios.get(`/user/balance`);
  return response.data;
};

export const getTransactionHistory = async () => {
  const response = await axios.get(`/user/history`);
  return { transactions: response.data.data ?? [] };
};

export const getDepositTransactions = async () => {
  const response = await axios.get(`/deposits`);
  return response.data;
};

export const getWithdrawalTransactions = async () => {
  const response = await axios.get(`/withdrawals`);
  return response.data;
};

export const getUserDepositAddress = async (chain: string, currency: string) => {
  const response = await axios.post(`/wallet/deposit-address`, { chain, currency });
  return response.data;
};
