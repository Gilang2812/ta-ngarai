// src/components/SubmitButton.tsx
import React from "react";
import { Spinner } from "@/components/loading/Spinner";

interface SubmitButtonProps {
  value: string;
  className?: string;
  onClick?: () => void;
  isLoading?:boolean
}

export const  FormSubmit: React.FC<SubmitButtonProps> = ({ value, className = "", onClick ,isLoading}) => {
  return (
    <button
      type="submit" 
      className={`w-full bg-primary hover:bg-secondary flex justify-center text-center transition-ease-in-out rounded-md px-2 py-2 text-white drop-shadow-xl mb-4 cursor-pointer transition-colors duration-300 ease-in-out ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >{isLoading?<Spinner />:value} </button>
  );
};

 
