// Wallet model
export interface Wallet {
  id: string;
  available_balance: number;
  customer_id: string;
  __typename: "payments_wallet";
}

// Account model
export interface Account {
  id: string;
  name: string;
  account_number: string;
  wallet: Wallet;
  __typename: "payments_account";
}

// Currency model
export interface Currency {
  id: number;
  name: string;
  iso_code: string;
  num_code: number;
  __typename: "payments_currency";
}

// Asset model
export interface Asset {
  id: string;
  available_balance: number;
  currency_id: number;
  currency: Currency;
  account: Account;
  __typename: "payments_asset";
}

// API response model
export interface AssetsResponse {
  success: boolean;
  message: string;
  results: Asset[];
  meta: Record<string, any>;
}
