import { useCallback, useState } from "react";

export default function useToggleOpen() {
     const [isOpen, setIsOpen] = useState(false);
    
      const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
    
  return {isOpen,toggle} 
}
