 
export const formatObjectLabel = (key: string) => {
  switch (key) {
    case "culinary":
    case "souvenir":
      return `${key} place`;
    case "traditional":
      return "traditional house";
    default:
      return key;
  }
};
