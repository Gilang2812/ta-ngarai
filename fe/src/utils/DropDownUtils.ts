import { useState } from "react";

export const useDropdown = (defaultOpen = false) => {
    const [open, setOpen] = useState(defaultOpen);

    const toggleDropdown = () => {
        setOpen((prev) =>!prev);
    }
    return {
        open,
        toggleDropdown,
        setOpen
    }
}