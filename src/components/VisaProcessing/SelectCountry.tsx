import React from "react";
import {Select, Spin} from "antd";
import {useCountries} from "../../hooks/useCountries";
import {Country} from "../../types";
import {GlobalOutlined} from "@ant-design/icons";

const {Option} = Select;

interface CountrySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  placeholder = "Select a country",
  disabled = false,
}) => {
  const {countries, loading} = useCountries();

  return (
    <Select
      allowClear
      showSearch
      value={value}
      onChange={onChange}
      placeholder={
        <span className="text-gray-400 flex items-center">
          <GlobalOutlined className="mr-2" /> {placeholder}
        </span>
      }
      disabled={disabled || loading}
      className="w-full mb-4 rounded-lg shadow-sm border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-all duration-200"
      loading={loading}
      filterOption={(input, option) =>
        (option?.children as unknown as string)
          ?.toLowerCase()
          .includes(input.toLowerCase()) ?? false
      }
      notFoundContent={
        loading ? (
          <div className="flex justify-center py-2">
            <Spin size="small" className="text-blue-500" />
          </div>
        ) : (
          <span className="text-gray-500">No countries found</span>
        )
      }
      optionLabelProp="label"
      optionFilterProp="children"
    >
      {countries.map((country: Country) => (
        <Option
          key={country._id}
          value={country.symbol}
          label={country.name}
          className="hover:bg-blue-50 transition-colors duration-150"
        >
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center">
              <span className="text-gray-800 font-medium">
                {country.name} ({country.symbol})
              </span>
            </span>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default CountrySelect;
