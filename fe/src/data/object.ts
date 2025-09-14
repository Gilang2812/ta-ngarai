export type ObjectDataType = typeof objectsData & {
  [key: string]: boolean;
};

export const objectsData = {
  attraction: false,
  culinary: false,
  homestay: false,
  souvenir: false,
  worship: false,
  tranditional:false
};

export const objectRoutes = [
  "attractions",
  "culinary",
  "facilities",
  "homestays",
  "souvenirs",
  "worship",
  "traditional",
];
