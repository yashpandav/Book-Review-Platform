import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const ReviewList = ({ reviews, currentUserId, onReviewUpdated }) => {
  const [editingReview, setEditingReview] = useState(null);

  // Handle delete review
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`/api/reviews/${reviewId}`);
        toast.success('Review deleted successfully');
        onReviewUpdated();
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  // Render star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${
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
      month: 'long',
      day: 'numeric'
    });
  };

  // Show message if no reviews
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 card">
        <div className="text-4xl mb-4">📝</div>
        <h4 className="text-lg font-semibold text-text-dark mb-2">
          No reviews yet
        </h4>
        <p className="text-text-gray">
          Be the first to share your thoughts about this book!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
          {editingReview === review._id ? (
            <ReviewForm
              bookId={review.bookId}
              existingReview={review}
              onReviewSubmitted={() => {
                setEditingReview(null);
                onReviewUpdated();
              }}
            />
          ) : (
            <div>
              {/* Review Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-medium text-text-dark">
                      {review.userId?.name || 'Anonymous'}
                    </h5>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-text-light">
                    {formatDate(review.createdAt)}
                  </p>
                </div>

                {/* Edit/Delete buttons for review owner */}
                {currentUserId === review.userId?._id && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingReview(review._id)}
                      className="text-teal hover:text-teal-dark text-sm font-medium transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Review Text */}
              <p className="text-text-gray leading-relaxed whitespace-pre-wrap">
                {review.reviewText}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;