import React, {useCallback, useMemo, useState} from "react";
import {Tabs, Spin, Divider} from "antd";
import type {TabsProps} from "antd";
import {useVisaTypes} from "../../hooks/useVisaTypes";
import {TAuthData} from "../../Context";
import {VisaType, VisaTypeData} from "../../types";
import {calculateTotalPrice} from "../../utils/total-price-util";
import VisaCard from "./VisaCard";

interface VisaSelectionProps {
  authData: TAuthData;
  countrySymbol: string;
  onChange: (value: VisaTypeData) => void;
}

const VisaSelection: React.FC<VisaSelectionProps> = React.memo(
  ({countrySymbol, authData, onChange}) => {
    const [selectedVisa, setSelectedVisa] = useState<string>("");

    const {visaTypes, loading} = useVisaTypes(authData, countrySymbol);

    //This function will help us group visas by their purpose to display them in form of tabs later.
    const groupedVisaTypes = useMemo(() => {
      return visaTypes.reduce((acc, visa) => {
        visa.purpose.forEach((purpose) => {
          if (!acc[purpose]) {
            acc[purpose] = [];
          }
          acc[purpose].push(visa);
        });
        return acc;
      }, {} as Record<string, VisaType[]>);
    }, [visaTypes]);

    //This function will help us handle the selection of a visa type.
    // useCallback is used to memoize the function and prevent unnecessary re-creations on every render.
    const handleVisaSelection = useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        const visaId = e.currentTarget.getAttribute("data-visa-id");
        if (visaId) {
          setSelectedVisa(visaId);
        }
        // Find the selected visa data and pass it to the parent component.
        const selectedVisaData = visaTypes.find((visa) => visa._id === visaId);
        if (selectedVisaData) {
          // This onchange function will take the selected visa data to the parent component.
          onChange({
            ...selectedVisaData,
            _id: selectedVisaData._id,
          });
        }
      },

      [visaTypes, onChange]
    );

    //This function will help us generate tabs for each visa type based on their purpose.
    const generatePurposeTabs = (): TabsProps["items"] => {
      return Object.keys(groupedVisaTypes).map((purpose) => ({
        key: purpose,
        label: purpose.charAt(0) + purpose.slice(1).toLowerCase(),
        children: (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {groupedVisaTypes[purpose].map((visa) => renderVisaCard(visa))}
          </div>
        ),
      }));
    };

    //This function will help us render each visa card.
    const renderVisaCard = (visa: VisaType) => {
      const isSelected = selectedVisa === visa._id;
      const totalPrice = calculateTotalPrice(visa.pricing);

      return (
        // Visa card is a custom component that will display the visa details.
        <VisaCard
          handleVisaSelection={handleVisaSelection}
          isSelected={isSelected}
          totalPrice={totalPrice}
          visa={visa}
        />
      );
    };

    if (loading) {
      return (
        <div className="flex justify-center p-12">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div className="max-h-[500px] overflow-x-hidden">
        <Divider orientation="left">All Available Visas</Divider>

        {/* This is where we will display the tabs for each visa type. */}
        {Object.keys(groupedVisaTypes).length > 0 ? (
          <Tabs
            defaultActiveKey={Object.keys(groupedVisaTypes)[0]}
            items={generatePurposeTabs()}
            type="card"
          />
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            No visa types available for this country. Please select another
            country.
          </div>
        )}
      </div>
    );
  }
);

export default VisaSelection;
