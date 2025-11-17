export interface AssetTypeItem {
  id: number;
  name: string;
  description: string;
  created_at: string;
  __typename: string;
}

export interface AssetTypeApiResponse {
  success: boolean;
  message: string;
  results: AssetTypeItem[];
  meta: Record<string, any>;
}
