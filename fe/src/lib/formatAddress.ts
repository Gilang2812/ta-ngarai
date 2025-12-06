import { Address } from "@/types/schema/CheckoutSchema";

export const formatAddress = (address: Address): string => {
  if (!address) return "test";
  let formatted = "";

  if (address.street) {
    formatted += address.street;
  }
  if (address.location) {
    if (formatted) formatted += ", ";
    formatted += [
      address.location.village,
      address.location.district,
      address.location.regency,
      address.location.province,
      address.location.country,
      address.location.postal_code,
    ]
      .filter(Boolean)
      .join(", ");
  }
  return formatted;
};
