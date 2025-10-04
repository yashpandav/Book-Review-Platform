import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  
  // State variables
  const [userBooks, setUserBooks] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('books');

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    if (!user) return;
    
    try {
      const [booksResponse, reviewsResponse] = await Promise.all([
        axios.get(`/api/books?search=&genre=&sortBy=createdAt&sortOrder=desc&limit=100`),
        axios.get(`/api/reviews/user/${user.id}`)
      ]);

      // Filter books added by current user
      const myBooks = booksResponse.data.books.filter(book => book.addedBy._id === user.id);
      setUserBooks(myBooks);
      setUserReviews(reviewsResponse.data.reviews || reviewsResponse.data);
    } catch (error) {
      toast.error('Failed to fetch profile data');
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Render star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${
            i < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
          <p className="text-text-gray">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Profile Header */}
      <div className="card p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-dark mb-2">
              {user.name}'s Profile
            </h1>
            <p className="text-text-gray mb-4 font-medium">{user.email}</p>
            
            {/* Stats */}
            <div className="flex items-center space-x-8 text-sm">
              <div className="text-center bg-teal-light bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold text-teal">{userBooks.length}</div>
                <div className="text-text-light font-medium">Books Added</div>
              </div>
              <div className="text-center bg-brown-light bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold text-brown">{userReviews.length}</div>
                <div className="text-text-light font-medium">Reviews Written</div>
              </div>
            </div>
          </div>
          
          {/* Profile Icon */}
          <div className="text-6xl bg-cream-dark rounded-full p-4">👤</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-8 pt-6">
            <button
              onClick={() => setActiveTab('books')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'books'
                  ? 'border-teal text-teal'
                  : 'border-transparent text-text-gray hover:text-text-dark'
              }`}
            >
              My Books ({userBooks.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'reviews'
                  ? 'border-teal text-teal'
                  : 'border-transparent text-text-gray hover:text-text-dark'
              }`}
            >
              My Reviews ({userReviews.length})
            </button>
          </nav>
        </div>

        <div className="p-8">
          
          {/* Books Tab */}
          {activeTab === 'books' && (
            <div>
              {userBooks.length > 0 ? (
                <div className="space-y-4">
                  {userBooks.map((book) => (
                    <div key={book._id} className="border border-gray-200 rounded-lg p-4 hover:bg-cream-dark transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-text-dark mb-1">
                            <Link 
                              to={`/books/${book._id}`}
                              className="text-teal hover:text-teal-dark transition-colors"
                            >
                              {book.title}
                            </Link>
                          </h3>
                          <p className="text-text-gray mb-2">by {book.author}</p>
                          <div className="flex items-center space-x-4 text-sm text-text-light">
                            <span className="bg-gray-200 px-2 py-1 rounded">{book.genre}</span>
                            <span>{book.publishedYear}</span>
                            <div className="flex items-center">
                              {renderStars(book.averageRating)}
                              <span className="ml-1">
                                {book.averageRating.toFixed(1)} ({book.totalReviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/edit-book/${book._id}`}
                            className="btn-outline text-sm"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/books/${book._id}`}
                            className="btn-primary text-sm"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-lg font-semibold text-text-dark mb-2">
                    No books added yet
                  </h3>
                  <p className="text-text-gray mb-4">
                    Start building your library by adding your first book!
                  </p>
                  <Link to="/add-book" className="btn-primary">
                    Add Your First Book
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              {userReviews.length > 0 ? (
                <div className="space-y-6">
                  {userReviews.map((review) => (
                    <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-text-dark mb-1">
                            <Link 
                              to={`/books/${review.bookId._id}`}
                              className="text-teal hover:text-teal-dark transition-colors"
                            >
                              {review.bookId.title}
                            </Link>
                          </h4>
                          <p className="text-text-gray text-sm mb-2">
                            by {review.bookId.author}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-text-light">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-text-gray leading-relaxed">
                        {review.reviewText}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-text-dark mb-2">
                    No reviews written yet
                  </h3>
                  <p className="text-text-gray mb-4">
                    Share your thoughts by reviewing books in our library!
                  </p>
                  <Link to="/" className="btn-primary">
                    Browse Books
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;