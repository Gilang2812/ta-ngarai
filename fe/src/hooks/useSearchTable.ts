import React, { useState } from "react";

const useSearchTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    handleSearch,
    clearSearchTerm,
  };
};

export default useSearchTable;
