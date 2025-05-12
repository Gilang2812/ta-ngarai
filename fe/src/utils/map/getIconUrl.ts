import { iconMapping } from "@/data/iconUrlMapping";

export const getIconUrl = (id: string) => {
  if (!id) return "/images/marker-kage.png";
  const normalized = id.toLowerCase();
  const keyOneLetter = normalized.slice(0, 1);
  const keyTwoLetter = normalized.slice(0, 2);
  if (iconMapping[keyOneLetter]) return iconMapping[keyOneLetter];
  if (iconMapping[keyTwoLetter]) return iconMapping[keyTwoLetter];

  return "/images/marker-kage.png";
};
