import axios from "axios";
import { TAuthData } from "../Context";

const getAuthDataFromLocalStorage = () => {
  const authData = localStorage.getItem("authData");
  return authData ? JSON.parse(authData) : null;
};

const authDataFromLocalStorage: TAuthData = getAuthDataFromLocalStorage();

const config = {
  baseURL: `${authDataFromLocalStorage?.server}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Authorization: authDataFromLocalStorage?.token,
  },
};
export const globalApiInstance = axios.create(config);
