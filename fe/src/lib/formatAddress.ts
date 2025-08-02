import { Address } from "@/type/schema/CheckoutSchema";

export const formatAddress = (address: Address): string => {
  if (!address) return "test";
  // Split the address by commas and trim each part 
  const formatted = Object.values(address).slice(3, -1).join(","); 
  return formatted;
};
