// src/hooks/useCountries.ts
import {useState, useEffect} from "react";
import {CountriesResponse, Country} from "../types";
import {getAllCountries} from "../utils/api";
import {TAuthData} from "../Context";

interface UseCountriesReturn {
  countries: Country[];
  loading: boolean;
  error: Error | null;
}

export const useCountries = (
  authData: TAuthData,
  pageNo: number = 1,
  pageSize: number = 100
): UseCountriesReturn => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = (await getAllCountries(authData, {
          pageNo,
          pageSize,
        })) as CountriesResponse;

        if (response.success && response.statusCode === 200) {
          setCountries(response.data);
          setError(null);
        } else {
          throw new Error("API response unsuccessful");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [authData, pageNo, pageSize]);

  return {countries, loading, error};
};
