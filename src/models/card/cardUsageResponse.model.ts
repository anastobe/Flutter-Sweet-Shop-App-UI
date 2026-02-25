// Model for individual usage rule
export interface CardUsage {
  applied_from: string; // e.g., "card_overridden" or "global"
  can_be_overridden_at_card?: boolean; // optional, not all usages have it
  description: string;
  enabled?: boolean; // optional, not all usages have it
  name: string;
}

// Model for results object
export interface CardUsageResult {
  trace_id: string;
  usages: CardUsage[];
}

// Model for API response
export interface CardUsageResponse {
  success: boolean;
  message: string;
  results: CardUsageResult;
  meta: Record<string, any>;
}

export interface CardPublicKey {
  key: string;
}

export interface CardPublicKeyResponse {
  success: boolean;
  message: string;
  results: CardPublicKey;
  meta: Record<string, any>;
}
