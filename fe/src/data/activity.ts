import { objectRoutesType } from "@/type/common/ObjectRouteType";

export const activityTypes: {
  id: "A" | "CP" | "FC" | "SP" | "TH" | "WO";
  name: objectRoutesType;
}[] = [
  {
    id: "A",
    name: "attractions",
  },
  {
    id: "CP",
    name: "culinary",
  },
  {
    id: "FC",
    name: "facilities",
  },
  {
    id: "SP",
    name: "souvenirs",
  },
  {
    id: "TH",
    name: "traditional",
  },
  {
    id: "WO",
    name: "worship",
  },
];
