import { List, Spin } from "antd";
import { VisaType } from "../../utils/interfaces";
import { VisaTags } from "./VisaTags";

interface VisaListProps {
  countryLoading: boolean;
  selectedCountryDetails: VisaType[];
  handleVisaClick: (id: string) => void;
}

interface EnumSectionProps {
  title: string;
  value: string | number;
}

const EnumSection = ({ title, value }: EnumSectionProps) => {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium">{title}</p>
      <p className="text-sm font-semibold text-gray-700">
        {value === -1 ? "-" : `${value} days`}
      </p>
    </div>
  );
};

export const VisaList = ({
  countryLoading,
  selectedCountryDetails,
  handleVisaClick,
}: VisaListProps) => {
  return (
    <div className="w-1/3 max-h-100 overflow-y-auto">
      {countryLoading ? (
        <Spin />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={selectedCountryDetails}
          renderItem={(visa) => (
            <List.Item
              onClick={() => handleVisaClick(visa._id)}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 w-full mr-4">
                <div className="mb-4">
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    {visa.visa_type}
                  </p>
                  {visa.entries_permitted !== -1 && (
                    <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full inline-block">
                      {visa.entries_permitted}{" "}
                      {visa.entries_permitted === 1 ? "Entry" : "Entries"}
                    </div>
                  )}
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <VisaTags tags={visa.tags} />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <EnumSection
                    title="Processing Time"
                    value={visa.processing_time}
                  />
                  <EnumSection
                    title="Validity Period"
                    value={visa.validity_period}
                  />
                  <EnumSection
                    title="Duration Permitted"
                    value={visa.duration_permitted}
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-xs uppercase text-gray-500 font-medium">
                      Visa Fee
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {visa.pricing.visa_fee.currency}{" "}
                      {visa.pricing.visa_fee.amount}
                    </p>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
