import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../config/api';

const ReviewForm = ({ bookId, onReviewSubmitted, existingReview = null }) => {
  // State for form data
  const [formData, setFormData] = useState({
    rating: existingReview?.rating || 5,
    reviewText: existingReview?.reviewText || ''
  });
  const [loading, setLoading] = useState(false);

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
      if (existingReview) {
        // Update existing review
        await api.put(`/api/reviews/${existingReview._id}`, formData);
        toast.success('Review updated successfully!');
      } else {
        // Create new review
        await api.post('/api/reviews', {
          ...formData,
          bookId,
          rating: parseInt(formData.rating)
        });
        toast.success('Review submitted successfully!');
      }
      
      onReviewSubmitted();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit review';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Render star rating selector
  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className={`text-2xl transition-colors duration-200 ${
              star <= formData.rating
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            ★
          </button>
        ))}
        <span className="ml-2 text-text-gray font-medium">
          {formData.rating} star{formData.rating !== 1 ? 's' : ''}
        </span>
      </div>
    );
  };

  return (
    <div className="card p-6 bg-cream-dark border border-gray-200">
      <h4 className="text-lg font-semibold text-text-dark mb-4">
        {existingReview ? 'Edit Your Review' : 'Write a Review'}
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Rating Selection */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Rating
          </label>
          {renderStarRating()}
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="reviewText" className="block text-sm font-medium text-text-dark mb-2">
            Your Review
          </label>
          <textarea
            id="reviewText"
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            required
            rows={4}
            className="textarea-field"
            placeholder="Share your thoughts about this book..."
          />
          <p className="text-xs text-text-light mt-1">
            Minimum 10 characters required
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || formData.reviewText.length < 10}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {existingReview ? 'Updating...' : 'Submitting...'}
              </div>
            ) : (
              existingReview ? 'Update Review' : 'Submit Review'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;