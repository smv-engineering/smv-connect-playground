import { Select } from "antd";
import { Country } from "../../utils/interfaces";

interface VisaSearchProps {
  countries: Country[];
  handleCountryChange: (value: string) => void;
}

export const VisaSearch = ({
  countries,
  handleCountryChange,
}: VisaSearchProps) => (
  <div className="w-md">
    <p>Please Select a Country</p>
    <Select
      showSearch
      placeholder="Select a country"
      optionFilterProp="children"
      onChange={handleCountryChange}
      filterOption={(input, option) =>
        option?.children
          ?.toString()
          .toLowerCase()
          .includes(input.toLowerCase()) ?? false
      }
      allowClear
      className="w-full mb-4"
    >
      {countries?.map((country) => (
        <Select.Option key={country._id} value={country._id}>
          {country.name} ({country.symbol})
        </Select.Option>
      ))}
    </Select>
  </div>
);
