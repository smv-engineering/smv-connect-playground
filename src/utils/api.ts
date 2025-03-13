import axios, { AxiosRequestConfig } from "axios";
import { TAuthData } from "../Context";

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
): Promise<unknown> => {
  const { server, token } = authData;
  const { pageNo, pageSize } = data;
  const request: AxiosRequestConfig = {
    url: `${server}/api/v1/orders/search?page_no=${pageNo}&page_size=${pageSize}`,
    method: "GET",
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.request(request);
  return response.data;
};

export const getCountries = async (
  authData: TAuthData,
  data: { pageNo: number; pageSize: number }
): Promise<unknown> => {
  const { server, token } = authData;
  const { pageNo, pageSize } = data;
  const request: AxiosRequestConfig = {
    url: `${server}/api/v1/countries?page_no=${pageNo}&page_size=${pageSize}`,
    method: "GET",
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.request(request);
  return response.data;
};

export const getCountryDetailsByCountry = async (
  authData: TAuthData,
  data: { symbol: string }
): Promise<unknown> => {
  const { server, token } = authData;
  const { symbol } = data;
  const request: AxiosRequestConfig = {
    url: `${server}/api/v1/visa_types?symbol=${symbol}`,
    method: "GET",
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.request(request);
  return response.data;
};

export const getVisaRequirements = async (
  authData: TAuthData,
  data: { visa_type_id: string }
): Promise<unknown> => {
  const { server, token } = authData;
  const { visa_type_id } = data;
  const request: AxiosRequestConfig = {
    url: `${server}/api/v1/visa_types/requirements?visa_type_id=${visa_type_id}`,
    method: "GET",
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.request(request);
  return response.data;
};
