import { useState } from "react";

export const useDropdown = ()=>{
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => {
        setOpen((prev) =>!prev);
    }
    return {
        open,
        toggleDropdown,
        setOpen
    }
}