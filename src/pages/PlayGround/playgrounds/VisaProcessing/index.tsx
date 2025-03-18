import { useEffect } from "react";
import useVisaProcessing from "./hooks";
import { VisaSearch } from "../../../../components/Visaprocessing/VisaSearch";
import { VisaList } from "../../../../components/Visaprocessing/VisaList";
import { VisaDetails } from "../../../../components/Visaprocessing/VisaDetails";

const VisaProcessing = () => {
  const {
    isAuthenticated,
    visaTypesLoading,
    visaReqLoading,
    countries,
    selectedCountry,
    visaTypes,
    visaRequirement,
    fetchCountries,
    handleCountryChange,
    handleVisaClick,
  } = useVisaProcessing();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  if (!isAuthenticated) {
    return (
      <div>
        <p className="mt-4">
          Unauthenticated user. Please log in to access the visa processing
          page.
        </p>
        <p className="mt-4">
          <a href="/auth" className="text-blue-500 underline">
            Click here to login
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg max-h-[100vh]">
      <VisaSearch
        countries={countries}
        handleCountryChange={handleCountryChange}
      />
      {selectedCountry && (
        <div className="flex flex-col overflow-y-auto max-h-[100vh] border border-gray-200 rounded-lg p-6 mt-3">
          <div>
            <p className="text-2xl font-bold text-gray-700 border-b pb-2 border-gray-200">
              {selectedCountry.name}
            </p>
          </div>
          <div
            className="
            flex gap-4
            overflow-y-auto
            max-h-[100vh]
          "
          >
            <VisaList
              countryLoading={visaTypesLoading}
              selectedCountryDetails={visaTypes}
              handleVisaClick={handleVisaClick}
              visaRequirement={visaRequirement}
            />

            <VisaDetails
              loading={visaReqLoading}
              selectedVisaRequirementDetails={visaRequirement}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaProcessing;
