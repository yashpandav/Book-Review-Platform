import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/api';
import { useAuth } from '../context/AuthContext';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State for form data and loading
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Available genres
  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Biography', 'History', 'Self-Help', 'Business',
    'Technology', 'Health', 'Travel', 'Cooking', 'Art'
  ];

  // Fetch book data
  const fetchBook = useCallback(async () => {
    try {
      const response = await api.get(`/api/books/${id}`);
      const book = response.data;

      // Check if user owns this book
      if (book.addedBy._id !== user.id) {
        toast.error('You are not authorized to edit this book');
        navigate('/');
        return;
      }

      setFormData({
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        publishedYear: book.publishedYear.toString()
      });
    } catch (error) {
      toast.error('Failed to fetch book details');
      navigate('/');
    } finally {
      setInitialLoading(false);
    }
  }, [id, user.id, navigate]);

  // Load book data when component mounts
  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

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
      await api.put(`/api/books/${id}`, {
        ...formData,
        publishedYear: parseInt(formData.publishedYear)
      });

      toast.success('Book updated successfully!');
      navigate(`/books/${id}`);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update book';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while fetching book data
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
          <p className="text-text-gray">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Edit Book
          </h1>
          <p className="text-text-gray">
            Update the book information
          </p>
        </div>

        {/* Edit Book Form */}
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
                  Updating Book...
                </div>
              ) : (
                'Update Book'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(`/books/${id}`)}
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

export default EditBook;