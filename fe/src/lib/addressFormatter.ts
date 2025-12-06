import { SimplifiedObject } from "@/types/schema/PackageSchema";

export const formatAddress = (object: SimplifiedObject): string => {
  const parts = [
    object?.street,
    object?.location?.village,
    object?.location?.district,
    object?.location?.regency,
    object?.location?.province,
    object?.location?.country,
    object?.location?.postal_code
  ].filter(Boolean);
  
  return parts.join(", ");
};
