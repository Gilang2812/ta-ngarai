export const getAttractionCategory = (category: 1 | 2) => {
  switch (category) {
    case 1:
      return "group";
    case 2:
      return "individu";
    default:
      return "Unknown Category";
  }
};
