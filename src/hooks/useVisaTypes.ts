import {useState, useEffect} from "react";
import {getVisaTypeByCountry} from "../utils/api";
import {TAuthData} from "../Context";
import {VisaType} from "../types";

export const useVisaTypes = (authData: TAuthData, countrySymbol: string) => {
  const [visaTypes, setVisaTypes] = useState<VisaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVisaTypes = async () => {
      setLoading(true);
      try {
        const response = (await getVisaTypeByCountry(authData, {
          symbol: countrySymbol,
        })) as {data: VisaType[]};

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
    };

    fetchVisaTypes();
  }, [authData, countrySymbol]);

  return {visaTypes, loading, error};
};
