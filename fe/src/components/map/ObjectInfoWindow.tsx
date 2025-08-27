import { SimplifiedObject } from "@/type/schema/PackageSchema";
import {
  FaAddressBook,
  FaMapPin,
  FaMoneyBill,
  FaPersonPraying,
  FaSpa,
} from "react-icons/fa6";
export const getIconAndTextSecondLine = (properties: SimplifiedObject) => {
  if (properties.type !== undefined) {
    return { icon: <FaSpa />, text: properties.type };
  } else if (properties.contact_person !== undefined) {
    return { icon: <FaAddressBook />, text: properties.contact_person };
  } else if (properties.capacity !== undefined) {
    return { icon: <FaPersonPraying />, text: properties.capacity };
  } else {
    return { icon: <FaSpa />, text: "object " };
  }
};
export const getIconAndTextThirdLine = (properties: SimplifiedObject) => {
  if (properties.type !== undefined) {
    return { icon: <FaMoneyBill />, text: properties.price };
  } else if (properties.contact_person !== undefined) {
    return { icon: <FaMapPin />, text: properties.address };
  } else {
    return { icon: <FaMoneyBill />, text: "free" };
  }
};
