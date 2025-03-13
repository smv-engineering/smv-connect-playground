export interface Country {
  _id: string;
  currency: string;
  currency_symbol: string;
  flag_symbol: string;
  name: string;
  processing_time: number;
  tags: string[];
  symbol: string;
  updated_at: string;
}

export interface CountriesApiResponse {
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
  pricing: {
    visa_fee: PricingDetails;
    vfs_fee: PricingDetails;
    service_fee: PricingDetails;
    child_visa_fee: PricingDetails;
  };
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
  validity_period: number;
  visa_type: string;
  apply_before: number;
  country_symbol: string;
  duration_permitted: number;
  entries_permitted: number;
  pricing: {
    visa_fee: PricingDetails;
    vfs_fee: PricingDetails;
    service_fee: PricingDetails;
    child_visa_fee: PricingDetails;
  };
  processing_time: number;
  purpose: string[];
  tags: string[];
  updated_at: string;
  visa_info: VisaInfo[] | null;
}

export interface VisaTypesApiResponse {
  statusCode: number;
  success: boolean;
  data: VisaType[];
}

export interface VisaRequirementApiResponse {
  statusCode: number;
  success: boolean;
  data: VisaRequirement;
}
