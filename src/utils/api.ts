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
