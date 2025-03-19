export type API_NAME =
  | "GENERATE_TOKEN"
  | "CREATE_ORDER"
  | "UPLOAD_BULK_DOCS"
  | "SEARCH_ORDERS"
  | "COUNTRY"
  | "VISA_TYPE"
  | "VISA_REQUIREMENTS";

export interface IPlaygroundConfig {
  name: string;
  id: string;
  description: string;
  photo: string;
  tags: API_NAME[];
  component: React.ReactNode;
}

export interface PaginationData {
  pageNo: number;
  pageSize: number;
}

export interface SymbolData {
  symbol: string;
}

export interface VisaTypeData {
  _id: string;
  visa_type_id?: string;
}

interface PricingDetail {
  amount: number;
  currency: string;
}

export interface Pricing {
  visa_fee: PricingDetail;
  vfs_fee: PricingDetail;
  service_fee: PricingDetail;
  child_visa_fee: PricingDetail;
}
export interface Country {
  _id: string;
  name: string;
  symbol: string;
  flag_symbol: string;
  currency: string;
  currency_symbol: string;
  processing_time: number;
  tags: string[];
  updated_at: string;
}

export interface CountriesResponse {
  statusCode: number;
  success: boolean;
  data: Country[];
}
export interface PricingDetails {
  amount: number;
  currency: string;
}

export interface VisaType {
  _id: string;
  visa_type: string;
  purpose: string[];
  country_symbol: string;
  apply_before: number;
  duration_permitted: number;
  entries_permitted: number;
  validity_period: number;
  processing_time: number;
  updated_at: string;
  tags: string[];
  pricing: Pricing;
}

export interface Way {
  info: string[];
  s3_path: string;
}

export interface Question {
  _id: string;
  question: string;
  short_description: string;
  long_description: string;
  correct_way: Way | null;
  wrong_way: Way | null;
}

export interface VisaInfo {
  title: string;
  tags: string[];
  questions: Question[] | null;
}

export interface VisaRequirement {
  _id: string;
  visa_type: string;
  purpose: string[];
  country_symbol: string;
  apply_before: number;
  duration_permitted: number;
  entries_permitted: number;
  validity_period: number;
  processing_time: number;
  updated_at: string;
  tags: string[];
  visa_info: VisaInfo[] | null;
  pricing: Pricing;
}

export interface VisaRequirementResponse {
  statusCode: number;
  success: boolean;
  data: VisaRequirement;
}
export interface Order {
  _id: string;
  order_id: string;
  visa_type: string;
  no_of_travelers: number;
  travel_start_date: string;
  travel_end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  expected_delivery_date: string;
  invoice_details: null;
  invoice_amount: null;
  estimate_details: null;
  estimate_amount: null;
  last_activity_at: string;
  pricing: Pricing;
}
