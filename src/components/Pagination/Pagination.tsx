import React, { useState } from "react";
import s from "./Pagination.module.css";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3;

    // Первая страница
    pageNumbers.push(
      <li key={1} className={1 === currentPage ? s.active : ""}>
        <button
          className={s.buttonPagination}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      </li>
    );

    // Кнопки в середине
    if (currentPage > visiblePages + 1) {
      pageNumbers.push(<li key="start-dots">...</li>);
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages - 1);
      i++
    ) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? s.active : ""}>
          <button
            className={s.buttonPagination}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (currentPage < totalPages - visiblePages) {
      pageNumbers.push(<li key="end-dots">...</li>);
    }

    // Последняя страница
    if (totalPages > 1) {
      pageNumbers.push(
        <li
          key={totalPages}
          className={totalPages === currentPage ? s.active : ""}
        >
          <button
            className={s.buttonPagination}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className={s.paginationWrapper}>
      <ul className={s.pagination}>
        <li>
          <button
            className={s.buttonPagination}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            prev
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            className={s.buttonPagination}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            next
          </button>
        </li>
      </ul>
    </nav>
  );
};
