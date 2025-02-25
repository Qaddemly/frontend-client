import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const half = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= half + 1) {
      pages.push(
        ...Array.from({ length: maxVisiblePages }, (_, i) => i + 1),
        "...",
        totalPages,
      );
    } else if (currentPage >= totalPages - half) {
      pages.push(
        1,
        "...",
        ...Array.from(
          { length: maxVisiblePages },
          (_, i) => totalPages - maxVisiblePages + i + 1,
        ),
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }

    return pages;
  };

  return (
    <div className="mx-auto mt-10 flex w-fit items-center justify-center space-x-1 rounded-lg border border-gray-300 px-3 py-1 shadow-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              page === currentPage
                ? "bg-main font-semibold text-white shadow-md"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
