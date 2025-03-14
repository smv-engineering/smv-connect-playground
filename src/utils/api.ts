import axios, {AxiosRequestConfig} from "axios";
import {TAuthData} from "../Context";
import {PaginationData, SymbolData} from "../types";

export const generateAuthToken = async (
  authData: TAuthData
): Promise<string> => {
  const {clientId, clientSecret, server} = authData;
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
  data: PaginationData
): Promise<unknown> => {
  const {server, token} = authData;
  const {pageNo, pageSize} = data;
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

export const getAllCountries = async (
  authData: TAuthData,
  data: PaginationData
): Promise<unknown> => {
  const {server, token} = authData;
  const {pageNo, pageSize} = data;

  const requestConfig: AxiosRequestConfig = {
    url: `${server}/api/v1/countries`,
    method: "GET",
    headers: {
      Authorization: token,
    },
    params: {
      page_no: pageNo,
      page_size: pageSize,
    },
  };

  try {
    const response = await axios.request(requestConfig);
    console.log("what is response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const getVisaTypeByCountry = async (
  authData: TAuthData,
  data: SymbolData
): Promise<unknown> => {
  const {server, token} = authData;
  const {symbol} = data;

  const requestConfig: AxiosRequestConfig = {
    url: `${server}/api/v1/visa_types`,
    method: "GET",
    headers: {
      Authorization: token,
    },
    params: {
      symbol,
    },
  };

  try {
    const response = await axios.request(requestConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};

export const getVisaRequirements = async (
  authData: TAuthData,
  visa_type_id: string
): Promise<unknown> => {
  const {server, token} = authData;

  const requestConfig: AxiosRequestConfig = {
    url: `${server}/api/v1/visa_types/requirements`,
    method: "GET",
    headers: {
      Authorization: token,
    },
    params: {
      visa_type_id, // ✅ Directly using the parameter
    },
  };

  try {
    const response = await axios.request(requestConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    throw error;
  }
};
