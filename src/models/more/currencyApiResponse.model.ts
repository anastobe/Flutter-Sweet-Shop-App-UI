export interface CurrencyItem {
  id: number;
  iso_code: string;
  num_code: number;
  __typename: string;
}

export interface CurrencyApiResponse {
  success: boolean;
  message: string;
  results: CurrencyItem[];
  meta: Record<string, any>;
}
