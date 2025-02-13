import React from "react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const maxPagesToShow = 10;
  const pageNumbers = [];

  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      onPageChange(undefined as unknown as React.ChangeEvent<unknown>, newPage);
    }
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-2 border rounded-md ${
          page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-300"
        }`}
      >
        {"<"}
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={`px-3 py-2 border rounded-md ${
              page === 1 ? "bg-[#02a67f] text-white" : "hover:bg-gray-300"
            }`}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 py-2">...</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={`px-3 py-2 border rounded-md ${
            num === page ? "bg-[#02a67f] text-white" : "hover:bg-gray-300"
          }`}
        >
          {num}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 py-2">...</span>}
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-2 border rounded-md ${
              page === totalPages
                ? "bg-[#02a67f] text-white"
                : "hover:bg-gray-300"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-2 border rounded-md ${
          page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-300"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default PaginationControls;
