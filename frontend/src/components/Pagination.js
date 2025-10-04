import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't show pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const pages = [];
  const maxVisiblePages = 5;

  // Calculate start and end pages
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Create array of page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-card-bg text-text-dark border border-gray-300 hover:bg-teal hover:text-white'
        } transition-colors duration-200`}
      >
        Previous
      </button>

      {/* First page if not visible */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg bg-card-bg text-text-dark border border-gray-300 hover:bg-teal hover:text-white transition-colors duration-200 font-medium"
          >
            1
          </button>
          {startPage > 2 && <span className="text-text-light">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            page === currentPage
              ? 'bg-teal text-white'
              : 'bg-card-bg text-text-dark border border-gray-300 hover:bg-teal hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page if not visible */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-text-light">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg bg-card-bg text-text-dark border border-gray-300 hover:bg-teal hover:text-white transition-colors duration-200 font-medium"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-card-bg text-text-dark border border-gray-300 hover:bg-teal hover:text-white'
        } transition-colors duration-200`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;