export interface Beneficiary {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  bank_name: string | null;
  account_name: string | null;
  account_number: string | null;
  iban: string | null;
  status: string;
  created_at: string; // ISO date string
  is_deleted: boolean;
  currency: string | null;
  __typename: string;
}

export interface BeneficiaryResponse {
  success: boolean;
  message: string;
  results: Beneficiary[];
  meta: Record<string, any>; // empty object but kept flexible
}
