// SidebarContext.tsx
'use client';
import { useDropdown } from '@/utils/DropDownUtils';
import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextProps {
  open: boolean;
  toggleSidebar: () => void;
  openDd: boolean;
  toggleDropdown: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen((prev) => !prev);
  const {open:openDd,toggleDropdown} = useDropdown()
  return (
    <SidebarContext.Provider value={{ open, toggleSidebar,openDd,toggleDropdown }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
