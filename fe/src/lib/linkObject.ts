import { ROUTES } from "@/data/routes";

const {
  DETAIL_ATTRACTION,
  DETAIL_CULINARY,
  DETAIL_HOMESTAY_OBJECT,
  DETAIL_SOUVENIR,
  DETAIL_WORSHIP,
} = ROUTES;

export const linkObject = (id: string): string => {
  if (id?.startsWith("AT")) return DETAIL_ATTRACTION(id);
  if (id?.startsWith("CP")) return DETAIL_CULINARY(id);
  if (id?.startsWith("SP")) return DETAIL_SOUVENIR(id);
  if (id?.startsWith("HO")) return DETAIL_HOMESTAY_OBJECT(id);
  if (id?.startsWith("WO")) return DETAIL_WORSHIP(id);
  return "/web";
};
