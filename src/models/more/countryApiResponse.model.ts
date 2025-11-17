export interface CountryModel {
  id: number;
  name: string;
  code: string;
  region: string;
  currency_id: number;
  __typename: string;
}

export interface CountryApiResponse {
  success: boolean;
  message: string;
  results: CountryModel[];
  meta: any;
}
