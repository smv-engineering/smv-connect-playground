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
