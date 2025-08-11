import React, { useState } from "react";

const useSearchTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm: searchTerm.trim().toLowerCase(),
    handleSearch,
  };
};

export default useSearchTable;
