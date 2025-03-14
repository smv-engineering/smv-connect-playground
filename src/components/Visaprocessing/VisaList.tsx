import { List, Spin } from "antd";
import { VisaRequirement, VisaType } from "../../utils/interfaces";
import { VisaTags } from "./VisaTags";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

interface VisaListProps {
  countryLoading: boolean;
  selectedCountryDetails: VisaType[];
  handleVisaClick: (id: string) => void;
  visaRequirement: VisaRequirement | null;
}

interface EnumSectionProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const EnumSection = ({ title, value, icon }: EnumSectionProps) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p className="text-xs text-gray-500 font-medium">{title}</p>
        <p className="text-xs font-semibold text-gray-700">
          {value === -1 ? "-" : `${value} days`}
        </p>
      </div>
    </div>
  );
};

export const VisaList = ({
  countryLoading,
  selectedCountryDetails,
  handleVisaClick,
  visaRequirement,
}: VisaListProps) => {
  return (
    <div className="w-1/3 max-h-[100vh] p-2 border-gray-200 border-r mt-3 overflow-y-auto">
      <p className="text-md font-semibold text-gray-600 mb-4 border-b pb-2 border-gray-200">
        Select Visa Type
      </p>
      <div className="w-full max-h-[100vh] overflow-y-auto p-1 pr-3 rounded-lg">
        {countryLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={selectedCountryDetails}
            renderItem={(visa) => {
              const isSelected = visaRequirement?._id === visa._id;
              return (
                <List.Item
                  onClick={() => handleVisaClick(visa._id)}
                  className={`cursor-pointer transition-all duration-300 rounded-lg border-none
                  ${isSelected ? "border-blue-50" : "border-gray-200"} 
                   hover:-translate-y-1
                `}
                >
                  <div
                    className={`bg-white rounded-lg shadow border w-full transition-all duration-300 border-gray-200`}
                  >
                    <div
                      className={`mb-1 w-full p-2 rounded-lg
                      ${isSelected ? "bg-blue-300" : "bg-gray-200"}
                    `}
                    >
                      <p className="text-md font-bold text-gray-800 border-gray-200">
                        {visa.visa_type}
                      </p>
                    </div>
                    <div className="p-2">
                      <div
                        className="
                        mb-4
                        flex
                        items-center
                        justify-between
                      "
                      >
                        <div className="mb-2 mt-2 flex flex-wrap gap-2">
                          <VisaTags tags={visa.tags} />
                        </div>
                        {visa.entries_permitted !== -1 && (
                          <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full inline-block">
                            {visa.entries_permitted}{" "}
                            {visa.entries_permitted === 1 ? "Entry" : "Entries"}{" "}
                            Allowed
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <EnumSection
                          title="Processing Time"
                          value={visa.processing_time}
                          icon={<ClockCircleOutlined />}
                        />
                        <EnumSection
                          title="Validity Period"
                          value={visa.validity_period}
                          icon={<CheckCircleOutlined />}
                        />
                        <EnumSection
                          title="Duration Permitted"
                          value={visa.duration_permitted}
                          icon={<ClockCircleOutlined />}
                        />
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <p className="text-xs uppercase text-gray-500 font-medium">
                          Visa Fee
                        </p>
                        <p className="text-2xl font-bold text-green-600 flex items-center gap-2">
                          {visa.pricing.visa_fee.currency}{" "}
                          {visa.pricing.visa_fee.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
