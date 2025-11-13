 
export const formatObjectLabel = (key: string) => {
  switch (key) {
    case "culinary":
    case "souvenir":
    case "worship":
      return `${key} place`;
    case "traditional":
      return "traditional house";
    default:
      return key;
  }
};
