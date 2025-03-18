import { useState, useCallback } from "react";
import useAuthStatus from "./use-auth";
import { CountriesApiResponse, Country } from "../utils/interfaces";
import { getCountries } from "../utils/api";

const useCountries = () => {
  const { authData } = useAuthStatus();
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchCountries = useCallback(async () => {
    try {
      setLoading(true);
      const data = (await getCountries(authData, {
        pageNo: 1,
        pageSize: 100,
      })) as CountriesApiResponse;
      setCountries(data.data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    } finally {
      setLoading(false);
    }
  }, [authData]);

  return { loading, countries, fetchCountries };
};

export default useCountries;
