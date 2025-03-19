import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { TAuthData } from "../Context";
import { PaginationData, SymbolData } from "../types";
import { globalApiInstance } from "./axiosInstance";

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
  _authData: TAuthData,
  data: PaginationData
): Promise<unknown> => {
  const { pageNo, pageSize } = data;

  try {
    const response: AxiosResponse = await globalApiInstance.get(
      `orders/search?page_no=${pageNo}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const getAllCountries = async (
  data: PaginationData
): Promise<unknown> => {
  const { pageNo, pageSize } = data;
  try {
    const response: AxiosResponse = await globalApiInstance.get(
      `/countries?page_no=${pageNo}&page_size=${pageSize}`
    );
    console.log("what is response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return null;
  }
};

export const getVisaTypeByCountry = async (
  data: SymbolData
): Promise<unknown> => {
  const { symbol } = data;
  try {
    const response = await globalApiInstance.get(
      `/visa_types?symbol=${symbol}`
    );
    console.log("what is response.data???", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching country details:", error);
    return null;
  }
};

export const getVisaRequirements = async (
  visa_type_id: string
): Promise<unknown> => {
  console.log("what is visa type id?", visa_type_id);
  try {
    const response = await globalApiInstance(
      `/visa_types/requirements?visa_type_id=${visa_type_id}`
    );
    console.log("what is response.data getVisaRequirements???", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    return null;
  }
};
