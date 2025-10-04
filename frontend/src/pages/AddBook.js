import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddBook = () => {
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Available genres
  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Biography', 'History', 'Self-Help', 'Business',
    'Technology', 'Health', 'Travel', 'Cooking', 'Art'
  ];

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/books', {
        ...formData,
        publishedYear: parseInt(formData.publishedYear)
      });

      toast.success('Book added successfully!');
      navigate(`/books/${response.data._id}`);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add book';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Add New Book
          </h1>
          <p className="text-text-gray">
            Share a great book with our community of readers
          </p>
        </div>

        {/* Add Book Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-dark mb-2">
              Book Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter the book title"
            />
          </div>

          {/* Author Field */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-text-dark mb-2">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter the author's name"
            />
          </div>

          {/* Genre and Year Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-text-dark mb-2">
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="publishedYear" className="block text-sm font-medium text-text-dark mb-2">
                Published Year *
              </label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                required
                min="1000"
                max={new Date().getFullYear() + 1}
                className="input-field"
                placeholder="e.g., 2023"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-dark mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="textarea-field"
              placeholder="Enter a detailed description of the book..."
            />
            <p className="text-xs text-text-light mt-1">
              Minimum 10 characters required
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Book...
                </div>
              ) : (
                'Add Book'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;