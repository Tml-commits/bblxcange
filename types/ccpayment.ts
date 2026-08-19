export interface Network {
  chain: string;
  chainFullName: string;
  contract: string;
  precision: number;
  canDeposit: boolean;
  canWithdraw: boolean;
  minimumDepositAmount: string;
  minimumWithdrawAmount: string;
  maximumWithdrawAmount: string;
  isSupportMemo: boolean;
}

export interface Coin {
  coinId: number;
  symbol: string;
  coinFullName: string;
  logoUrl: string;
  status: string;
  networks: Network[];
  price: string;
}

export interface CCPaymentCoinsResponse {
  success: boolean;
  data: {
    coins: Coin[];
  };
}

export interface DepositAddressResponse {
  success: boolean;
  data: {
    address: string;
    memo: string;
    chain: string;
  };
}

export interface WithdrawalRequest {
  coinId: string;
  amount: number;
  address: string;
  chain: string;
  memo: string;
}

export interface WithdrawalResponse {
  success: boolean;
  data: {
    txId: string;
    fee: string;
    amount: string;
    address: string;
    chain: string;
    memo: string;
  };
}

export interface Asset {
  coinId: number;
  coinSymbol: string;
  available: string;
}

export interface AssetsResponse {
  success: boolean;
  data: {
    code: number;
    msg: string;
    data: {
      assets: Asset[];
    };
  };
}
