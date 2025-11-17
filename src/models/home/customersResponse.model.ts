// Model for personal customer
export interface PersonalCustomer {
  __typename: "payments_personal_customers";
  id: string;
  title: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO date string
}

// Model for main customer
export interface Customer {
  __typename: "payments_customers";
  id: string;
  status: string;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  customer_type: string;
  mmb: number;
  mc: boolean;
  address_line1: string;
  address_line2: string;
  address_line3?: string | null;
  town: string;
  county?: string | null;
  postcode: string;
  telephone: string;
  mobile: string;
  email: string;
  country_id: number;
  banking_partner_id: string;
  frontier_branch_id: string;
  personal_customers: PersonalCustomer[];
}

// Model for API response
export interface CustomersResponse {
  success: boolean;
  message: string;
  results: Customer[];
  meta: Record<string, any>;
}
