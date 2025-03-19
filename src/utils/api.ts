import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { TAuthData } from "../Context";
import { PaginationData, SymbolData } from "../types";

function getAxiosInstance(authData: TAuthData): AxiosInstance {
  return axios.create({
    baseURL: `${authData.server}/api/v1`,
    headers: {
      Authorization: authData.token,
    },
  });
}

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
  data: PaginationData
): Promise<unknown> => {
  const axiosInstance = getAxiosInstance(authData);
  const { pageNo, pageSize } = data;

  try {
    const response: AxiosResponse = await axiosInstance.get(
      `orders/search?page_no=${pageNo}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const getAllCountries = async (
  authData: TAuthData,
  data: PaginationData
): Promise<unknown> => {
  const axiosInstance = getAxiosInstance(authData);
  const { pageNo, pageSize } = data;
  try {
    const response = await axiosInstance.get(
      `/countries?page_no=${pageNo}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return null;
  }
};

export const getVisaTypeByCountry = async (
  authData: TAuthData,
  data: SymbolData
): Promise<unknown> => {
  const axiosInstance = getAxiosInstance(authData);
  const { symbol } = data;
  try {
    const response = await axiosInstance.get(`/visa_types?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching country details:", error);
    return null;
  }
};

export const getVisaRequirements = async (
  authData: TAuthData,
  visa_type_id: string
): Promise<unknown> => {
  const axiosInstance = getAxiosInstance(authData);
  try {
    const response = await axiosInstance.get(
      `/visa_types/requirements?visa_type_id=${visa_type_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    return null;
  }
};

export const createOrder = async (
  authData: TAuthData,
  data: {
    visa_type_id: string;
    travel_start_date: string;
    travel_end_date: string;
    no_of_travelers: number;
  }
): Promise<unknown> => {
  const axiosInstance = getAxiosInstance(authData);
  try {
    const response = await axiosInstance.post("/orders", data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    return null;
  }
};
