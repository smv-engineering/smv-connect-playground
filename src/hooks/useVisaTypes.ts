import { useState, useEffect, useCallback } from "react";
import { getVisaTypeByCountry } from "../utils/api";
import { VisaType } from "../types";
import { useAuthContext } from "../Context";

export const useVisaTypes = (countrySymbol: string) => {
  const [visaTypes, setVisaTypes] = useState<VisaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { authData } = useAuthContext();

  const fetchVisaTypes = useCallback(
    async (countrySymbol: string) => {
      setLoading(true);
      try {
        const response = (await getVisaTypeByCountry(authData, {
          symbol: countrySymbol,
        })) as { data: VisaType[] };

        if (response && response.data) {
          setVisaTypes(response.data);
          setError(null);
        } else {
          throw new Error("API response unsuccessful");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setVisaTypes([]);
      } finally {
        setLoading(false);
      }
    },
    [authData]
  );

  useEffect(() => {
    fetchVisaTypes(countrySymbol);
  }, [fetchVisaTypes, countrySymbol]);

  return { visaTypes, loading, error, fetchVisaTypes };
};
