import {Pricing} from "../types";

//This function will help us calculate the total price of a visa application.
export const calculateTotalPrice = (pricing: Pricing): number => {
  return (
    pricing.visa_fee.amount +
    pricing.vfs_fee.amount +
    pricing.service_fee.amount
  );
};
