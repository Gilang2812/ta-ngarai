import React, { useState } from "react";

const useSearchTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm: searchTerm,
    handleSearch,
  };
};

export default useSearchTable;
