import { useAuthContext } from "../Context";

const useAuthStatus = () => {
  const { authData } = useAuthContext();
  return { isAuthenticated: authData.token?.length > 0, authData };
};

export default useAuthStatus;
