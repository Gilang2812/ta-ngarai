import { iconMapping } from "@/data/iconUrlMapping";

export const getIconUrl = (id: string) => {
  if (!id) return "/images/marker-kage.png";
  const normalized = id.toLowerCase();
  const keyTwoLetter = normalized.substring(0, 2);
  if (iconMapping[keyTwoLetter]) return iconMapping[keyTwoLetter];

  return "/images/marker-kage.png";
};
