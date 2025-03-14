import { useState } from "react";
import useCountries from "../../../../hooks/use-countries";
import useVisaTypes from "../../../../hooks/use-visa-types";
import useVisaRequirement from "../../../../hooks/use-visa-requirements";
import { Country } from "../../../../utils/interfaces";
import useAuthStatus from "../../../../hooks/use-auth";

const useVisaProcessing = () => {
  const { isAuthenticated } = useAuthStatus();
  const {
    loading: countriesLoading,
    countries,
    fetchCountries,
  } = useCountries();

  const {
    loading: visaTypesLoading,
    visaTypes,
    fetchVisaTypes,
  } = useVisaTypes();

  const {
    loading: visaReqLoading,
    visaRequirement,
    fetchVisaRequirement,
  } = useVisaRequirement();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountryChange = (countryId: string) => {
    const country = countries.find((c) => c._id === countryId) || null;
    setSelectedCountry(country);
    fetchVisaTypes(country as Country);
  };

  const handleVisaClick = (visaId: string) => {
    if (visaId === visaRequirement?._id) return;
    fetchVisaRequirement(visaId);
  };

  return {
    isAuthenticated,
    countriesLoading,
    visaTypesLoading,
    visaReqLoading,
    countries,
    selectedCountry,
    visaTypes,
    visaRequirement,
    fetchCountries,
    handleCountryChange,
    handleVisaClick,
  };
};

export default useVisaProcessing;
