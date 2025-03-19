import {createContext, useState, useContext} from "react";
import {generateAuthToken} from "../utils/api";

export type TAuthData = {
  clientId: string;
  clientSecret: string;
  server: string;
  environment: "staging" | "production";
  token: string;
};

export type TAuthContext = {
  authData: TAuthData;
  setAuthData: (data: TAuthData) => void;
  generateAuthToken: (data: TAuthData) => Promise<void>;
  isAuthenticated: () => boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_CREDENTIALS: TAuthData = {
  clientId: "BJPuwh-D9j3EV-L9vgdW",
  clientSecret: "rFaQeB-06eJQb-H3eWK8",
  environment: "staging",
  token: "",
  server: "https://api.qa.stampmyvisa.com",
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthWrapper = ({children}: {children: React.ReactNode}) => {
  const [authData, setAuthData] = useState<TAuthData>({
    clientId: "",
    clientSecret: "",
    environment: "staging",
    token: "",
    server: "",
  });

  const _generateAuthToken = async (data: TAuthData) => {
    try {
      const token = await generateAuthToken(data);
      // Modified this setAuthData to update the authData in the local storage.
      setAuthData((prev) => {
        const updatedAuthData = {
          ...prev,
          clientId: data.clientId,
          clientSecret: data.clientSecret,
          environment: data.environment,
          token,
          server: data.server,
        };

        return updatedAuthData;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isAuthenticated = () => !!authData.token;

  return (
    <AuthContext.Provider
      value={{authData, setAuthData, generateAuthToken: _generateAuthToken, isAuthenticated}}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
