import React, { useState } from 'react';

const SearchFilter = ({ onSearch, onFilter, onSort }) => {
  // State for form inputs
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Available genres
  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Biography', 'History', 'Self-Help', 'Business',
    'Technology', 'Health', 'Travel', 'Cooking', 'Art'
  ];

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  // Handle genre change
  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre);
    onFilter(selectedGenre);
  };

  // Handle sort change
  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    onSort(field, order);
  };

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-xl font-semibold text-text-dark mb-4">
        🔍 Search & Filter Books
      </h2>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              onSearch('');
            }}
            className="btn-outline"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Filters and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Filter by Genre
          </label>
          <select
            value={genre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="input-field"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Sort By
          </label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value, sortOrder)}
              className="input-field flex-1"
            >
              <option value="createdAt">Date Added</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="publishedYear">Published Year</option>
              <option value="averageRating">Rating</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(sortBy, e.target.value)}
              className="input-field"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;