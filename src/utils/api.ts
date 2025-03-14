import axios, { AxiosRequestConfig } from "axios";
import { TAuthData } from "../Context";
import {
  CountriesApiResponse,
  VisaRequirementApiResponse,
  VisaTypesApiResponse,
} from "./interfaces";
import api from "./axios";
import { ApiResponse } from "../pages/PlayGround/playgrounds/ListOrders";

export const generateAuthToken = async (
  authData: TAuthData
): Promise<string> => {
  const { clientId, clientSecret, server } = authData;
  const request: AxiosRequestConfig = {
    url: `${server}/api/v1/auth/generate-token`,
    method: "POST",
    data: {
      client_id: clientId,
      client_secret: clientSecret,
    },
  };
  const response = await axios.request(request);
  return response.data.data;
};

export const searchOrders = async (
  authData: TAuthData,
  data: { pageNo: number; pageSize: number }
): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/api/v1/orders", {
    baseURL: authData.server,
    params: { page_no: data.pageNo, page_size: data.pageSize },
    headers: { Authorization: authData.token },
  });
  return response.data;
};

export const getCountries = async (
  authData: TAuthData,
  { pageNo, pageSize }: { pageNo: number; pageSize: number }
): Promise<CountriesApiResponse> => {
  const response = await api.get<CountriesApiResponse>("/api/v1/countries", {
    baseURL: authData.server,
    params: { page_no: pageNo, page_size: pageSize },
    headers: { Authorization: authData.token },
  });
  return response.data;
};

export const getCountryDetailsByCountry = async (
  authData: TAuthData,
  data: { symbol: string }
): Promise<VisaTypesApiResponse> => {
  const response = await api.get<VisaTypesApiResponse>(`/api/v1/visa_types`, {
    baseURL: authData.server,
    params: { symbol: data.symbol },
    headers: { Authorization: authData.token },
  });
  return response.data;
};

export const getVisaRequirements = async (
  authData: TAuthData,
  { visa_type_id }: { visa_type_id: string }
): Promise<VisaRequirementApiResponse> => {
  const response = await api.get<VisaRequirementApiResponse>(
    "/api/v1/visa_types/requirements",
    {
      baseURL: authData.server,
      params: { visa_type_id },
      headers: { Authorization: authData.token },
    }
  );
  return response.data;
};
