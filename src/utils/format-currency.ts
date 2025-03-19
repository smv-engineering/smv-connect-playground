// Function to format currency
export const formatCurrency = (amount: number, currency: string) => {
  return amount === -1 ? "N/A" : `${amount} ${currency}`;
};
