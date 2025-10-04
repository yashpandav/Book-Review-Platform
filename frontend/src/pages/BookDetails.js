import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/api';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import RatingChart from '../components/RatingChart';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State variables
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetch book details
  const fetchBookDetails = useCallback(async () => {
    try {
      const response = await api.get(`/api/books/${id}`);
      setBook(response.data);
    } catch (error) {
      toast.error('Failed to fetch book details');
      navigate('/');
    }
  }, [id, navigate]);

  // Fetch reviews for the book
  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get(`/api/reviews/book/${id}`);
      setReviews(response.data.reviews || response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Load data when component mounts
  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [fetchBookDetails, fetchReviews]);

  // Handle delete book
  const handleDeleteBook = async () => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      try {
        await api.delete(`/api/books/${id}`);
        toast.success('Book deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  // Render star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 text-xl">☆</span>);
    }
    
    return stars;
  };

  // Check if user has already reviewed this book
  const userHasReviewed = reviews.some(review => review.userId._id === user?.id);

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
          <p className="text-text-gray">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Show error if book not found
  if (!book) {
    return (
      <div className="text-center py-12 card">
        <h2 className="text-2xl font-semibold text-text-dark mb-4">
          Book not found
        </h2>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Book Details Card */}
      <div className="card p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-text-dark mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-text-gray mb-4">by {book.author}</p>
            
            {/* Rating Display */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {renderStars(book.averageRating)}
                <span className="ml-2 text-text-gray">
                  {book.averageRating.toFixed(1)} ({book.totalReviews} reviews)
                </span>
              </div>
            </div>

            {/* Book Info */}
            <div className="flex items-center space-x-6 text-sm text-text-light mb-6">
              <span className="bg-brown-light text-white px-3 py-1 rounded-full font-medium">
                {book.genre}
              </span>
              <span>Published: {book.publishedYear}</span>
              <span>Added by: {book.addedBy?.name}</span>
            </div>
          </div>

          {/* Action Buttons for Book Owner */}
          {user && user.id === book.addedBy?._id && (
            <div className="flex space-x-2">
              <Link
                to={`/edit-book/${book._id}`}
                className="btn-outline"
              >
                Edit
              </Link>
              <button
                onClick={handleDeleteBook}
                className="btn-secondary"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Book Description */}
        <div>
          <h3 className="text-lg font-semibold text-text-dark mb-3">
            Description
          </h3>
          <p className="text-text-gray leading-relaxed whitespace-pre-wrap">
            {book.description}
          </p>
        </div>
      </div>

      {/* Rating Distribution Chart */}
      {reviews.length > 0 && (
        <div className="card p-6 mb-8">
          <h3 className="text-xl font-semibold text-text-dark mb-4">
            Rating Distribution
          </h3>
          <RatingChart reviews={reviews} />
        </div>
      )}

      {/* Reviews Section */}
      <div className="card p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-text-dark">
            Reviews ({reviews.length})
          </h3>
          
          {/* Write Review Button */}
          {user && !userHasReviewed && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-primary"
            >
              {showReviewForm ? 'Cancel Review' : 'Write Review'}
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && user && (
          <div className="mb-8">
            <ReviewForm
              bookId={id}
              onReviewSubmitted={() => {
                fetchReviews();
                fetchBookDetails();
                setShowReviewForm(false);
              }}
            />
          </div>
        )}

        {/* Login Prompt for Non-Authenticated Users */}
        {!user && (
          <div className="bg-cream-dark border border-gray-300 rounded-lg p-4 mb-6">
            <p className="text-text-gray">
              <Link to="/login" className="text-teal hover:text-teal-dark font-semibold">
                Sign in
              </Link>{' '}
              to write a review for this book.
            </p>
          </div>
        )}

        {/* Reviews List */}
        <ReviewList
          reviews={reviews}
          currentUserId={user?.id}
          onReviewUpdated={() => {
            fetchReviews();
            fetchBookDetails();
          }}
        />
      </div>
    </div>
  );
};

export default BookDetails;