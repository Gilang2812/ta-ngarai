import { useState } from "react";

export const useMapTools = () => {
  const [isTerrain, setIsTerrain] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  return {isTerrain,setIsTerrain,setShowLabel,showLabel}
};
