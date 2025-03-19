export type API_NAME =
  | "GENERATE_TOKEN"
  | "CREATE_ORDER"
  | "UPLOAD_BULK_DOCS"
  | "SEARCH_ORDERS";

export interface IPlaygroundConfig {
  name: string;
  id: string;
  description: string;
  photo: string;
  tags: API_NAME[];
  component: React.ReactNode;
}
