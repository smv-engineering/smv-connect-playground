import { useState, useCallback } from "react";
import useAuthStatus from "./use-auth";
import { Country, VisaType, VisaTypesApiResponse } from "../utils/interfaces";
import { getCountryDetailsByCountry } from "../utils/api";

const useVisaTypes = () => {
  const { authData } = useAuthStatus();
  const [loading, setLoading] = useState(false);
  const [visaTypes, setVisaTypes] = useState<VisaType[]>([]);

  const fetchVisaTypes = useCallback(
    async (country: Country) => {
      try {
        setLoading(true);
        const data = (await getCountryDetailsByCountry(authData, {
          symbol: country.symbol,
        })) as VisaTypesApiResponse;
        setVisaTypes(data.data);
      } catch (err) {
        console.error("Error fetching visa types:", err);
      } finally {
        setLoading(false);
      }
    },
    [authData]
  );

  return { loading, visaTypes, fetchVisaTypes };
};

export default useVisaTypes;
