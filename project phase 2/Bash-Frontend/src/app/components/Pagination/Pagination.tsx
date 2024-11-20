import { useState } from "react";
import { Pagination } from "@nextui-org/react";

interface PaginationButtonProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}
      id="Pagination"
    >
      <Pagination
        total={totalPages} // Use calculated total pages
        showControls
        initialPage={1} // Initial page on component mount
        page={currentPage} // Controlled page state
        onChange={onPageChange} // Handle page change
        classNames={{
          item: "w-10 h-10 text-medium rounded-full bg-transparent font-adlam shadow-inner text-[#674636]",
          cursor:
            "bg-[#674636] rounded-full shadow-lg from-default-300 to-default-500 dark:from-default-300 dark:to-default-100 text-white font-bold",
          next: "w-10 h-10 flex items-center justify-center bg-[#674636] text-white rounded-full transition-all",
          prev: "w-10 h-10 flex items-center justify-center bg-[#674636] text-white rounded-full transition-all",
        }}
      />
    </div>
  );
};

export default PaginationButton;