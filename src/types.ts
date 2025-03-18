export type API_NAME =
  | "GENERATE_TOKEN"
  | "CREATE_ORDER"
  | "UPLOAD_BULK_DOCS"
  | "SEARCH_ORDERS"
  | "COUNTRIES"
  | "VISA_TYPES"
  | "VISA_TYPES_REQUIREMENTS";

export interface IPlaygroundConfig {
  name: string;
  id: string;
  description: string;
  photo: string;
  tags: API_NAME[];
  component: React.ReactNode;
}
