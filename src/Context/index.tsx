import { createContext, useState, useContext } from "react";
import { generateAuthToken } from "../utils/api";


export type TAuthData = {
  clientId: string;
  clientSecret: string;
  server: string;
  environment: string;
  token: string;
}

export type TAuthContext = {
  authData: TAuthData;
  setAuthData: (data: TAuthData) => void;
  generateAuthToken: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<TAuthData>({
    clientId: "",
    clientSecret: "",
    environment: "",
    token: "",
    server: "",
  });

  const _generateAuthToken = async () => {
    try {
      const token = await generateAuthToken(authData);
      setAuthData({ 
        clientId: authData.clientId,
        clientSecret: authData.clientSecret,
        environment: authData.environment,
        token,
        server: authData.server,
      });
    } catch (error) {
      console.error("Error generating auth token:", error);
      throw new Error("Failed to generate token");
    };
  }

  return (
    <AuthContext.Provider value={{ authData, setAuthData, generateAuthToken: _generateAuthToken }}>
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