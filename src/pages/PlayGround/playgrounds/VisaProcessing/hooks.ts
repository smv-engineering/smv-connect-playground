import { useCallback, useState } from "react";
import { useAuthContext } from "../../../../Context";
import {
  CountriesApiResponse,
  Country,
  VisaRequirement,
  VisaRequirementApiResponse,
  VisaType,
  VisaTypesApiResponse,
} from "../../../../utils/interfaces";
import {
  getCountries,
  getCountryDetailsByCountry,
  getVisaRequirements,
} from "../../../../utils/api";

const useVisaProcessing = () => {
  const { authData } = useAuthContext();
  const isAuthenticated = authData.token?.length > 0;
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryLoading, setCountryLoading] = useState(false);
  const [selectedCountryDetails, setSelectedCountryDetails] = useState<
    VisaType[]
  >([]);
  const [selectedVisaRequirementDetails, setSelectedVisaRequirementDetails] =
    useState<VisaRequirement | null>(null);

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

  const fetchSelectedCountryDetails = useCallback(
    async (country: Country) => {
      try {
        setCountryLoading(true);
        const data = (await getCountryDetailsByCountry(authData, {
          symbol: country.symbol,
        })) as VisaTypesApiResponse;
        setSelectedCountryDetails(data.data);
      } catch (err) {
        console.error("Error fetching Selected Country Visa Details:", err);
      } finally {
        setCountryLoading(false);
      }
    },
    [authData]
  );

  const fetchVisaDetails = useCallback(
    async (visaId: string) => {
      try {
        setLoading(true);
        const data = (await getVisaRequirements(authData, {
          visa_type_id: visaId,
        })) as VisaRequirementApiResponse;
        setSelectedVisaRequirementDetails(data.data);
      } catch (err) {
        console.error("Error fetching visa details:", err);
      } finally {
        setLoading(false);
      }
    },
    [authData]
  );

  const handleCountryChange = (countryId: string) => {
    const country = countries.find((c) => c._id === countryId) || null;
    setSelectedCountry(country);
    setSelectedCountryDetails([]);
    setSelectedVisaRequirementDetails(null);

    if (country) {
      fetchSelectedCountryDetails(country);
    }
  };

  const handleVisaClick = (visaId: string) => {
    fetchVisaDetails(visaId);
  };

  return {
    isAuthenticated,
    loading,
    countries,
    selectedCountry,
    countryLoading,
    selectedCountryDetails,
    selectedVisaRequirementDetails,
    fetchCountries,
    fetchSelectedCountryDetails,
    fetchVisaDetails,
    handleCountryChange,
    handleVisaClick,
  };
};

export default useVisaProcessing;
