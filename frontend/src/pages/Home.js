import React, { useState, useEffect, useCallback } from 'react';
import api from '../config/api';
import { toast } from 'react-toastify';
import BookCard from '../components/BookCard';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import { FaBook } from 'react-icons/fa';

const Home = () => {
  // State variables
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Fetch books function
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 5,
        ...filters
      };

      const response = await api.get('/api/books', { params });
      setBooks(response.data.books || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalBooks(response.data.totalBooks || 0);
    } catch (error) {
      toast.error('Failed to fetch books');
      console.error('Error fetching books:', error);
      setBooks([]);
      setTotalPages(1);
      setTotalBooks(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  // Load books when component mounts or dependencies change
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Handle search
  const handleSearch = (search) => {
    setFilters(prev => ({ ...prev, search }));
    setCurrentPage(1);
  };

  // Handle filter
  const handleFilter = (genre) => {
    setFilters(prev => ({ ...prev, genre }));
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (sortBy, sortOrder) => {
    setFilters(prev => ({ ...prev, sortBy, sortOrder }));
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading && books.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
          <p className="text-text-gray">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-8 card p-8">
        <h1 className="text-4xl font-bold text-text-dark mb-4">
          Welcome to Modern Scholar
        </h1>
        <p className="text-lg text-text-gray max-w-2xl mx-auto leading-relaxed">
          Discover, review, and share your favorite books in our modern digital library. 
          Join fellow book lovers in building a vibrant community of literary enthusiasts.
        </p>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
      />

      {/* Results Summary */}
      <div className="mb-6 card p-4">
        <p className="text-text-gray font-medium">
          {loading ? 'Loading...' : `Showing ${books.length} of ${totalBooks} books`}
        </p>
      </div>

      {/* Books Grid */}
      {books.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12 card">
          <div className="text-6xl mb-4 flex justify-center">
            <FaBook className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-text-dark mb-2">
            No books found
          </h3>
          <p className="text-text-gray mb-4">
            {filters.search || filters.genre
              ? 'Try adjusting your search or filter criteria.'
              : 'Be the first to add a book to our library!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;