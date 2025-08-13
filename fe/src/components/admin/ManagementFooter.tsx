import React from "react";
import Button from "../common/Button";

type Props = {
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

const ManagementFooter = ({
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}: Props) => {
  return (
    <footer
      aria-label="Pagination"
      className="flex items-center justify-between mt-4"
    >
      <div>
        Showing {indexOfFirstItem + 1} to &nbsp;
        {Math.min(indexOfLastItem, totalItems)} of &nbsp;
        {totalItems} entries
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={handlePrevPage}
          variant={"secondary"}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          Previous
        </Button>
        <span className="px-4 py-2 border rounded-sm border-stone-500 bg-gradient-to-b from-white to-gray-300">
          {currentPage}
        </span>
        <Button
          variant={"secondary"}
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Next Page"
        >
          Next
        </Button>
      </div>
    </footer>
  );
};

export default ManagementFooter;
