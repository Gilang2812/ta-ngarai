import React, { useEffect, useState } from "react";

const useTableManagement = <T>(filteredData: T[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;
  useEffect(() => {
    if (totalPages == 1) setCurrentPage(1);
  }, [totalPages]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Number(totalPages)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };
  return {
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
  };
};

export default useTableManagement;
