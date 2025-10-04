const Review = require('../models/Review');
const Book = require('../models/Book');

// Simple validation helper
const validateInput = (data, requiredFields) => {
  const errors = [];
  
  for (const field of requiredFields) {
    if (!data[field] || data[field].toString().trim() === '') {
      errors.push(`${field} is required`);
    }
  }
  
  return errors;
};

// Helper function to update book rating
const updateBookRating = async (bookId) => {
  try {
    const reviews = await Review.find({ bookId });
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    await Book.findByIdAndUpdate(bookId, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews
    });
  } catch (error) {
    console.error('Error updating book rating:', error);
  }
};

const getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Reviews retrieved successfully',
      reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error retrieving reviews' });
  }
};

const createReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;

    // Basic validation
    const errors = validateInput(req.body, ['bookId', 'rating', 'reviewText']);
    
    const ratingNum = parseInt(rating);
    if (rating && (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5)) {
      errors.push('Rating must be between 1 and 5');
    }
    
    if (reviewText && reviewText.trim().length < 10) {
      errors.push('Review must be at least 10 characters');
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ bookId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      bookId,
      userId: req.user._id,
      rating: ratingNum,
      reviewText: reviewText.trim()
    });

    await review.save();
    await review.populate('userId', 'name');

    // Update book rating
    await updateBookRating(bookId);

    res.status(201).json({
      message: 'Review created successfully',
      ...review.toObject()
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error creating review' });
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;

    // Basic validation
    const errors = validateInput(req.body, ['rating', 'reviewText']);
    
    const ratingNum = parseInt(rating);
    if (rating && (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5)) {
      errors.push('Rating must be between 1 and 5');
    }
    
    if (reviewText && reviewText.trim().length < 10) {
      errors.push('Review must be at least 10 characters');
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = ratingNum;
    review.reviewText = reviewText.trim();

    await review.save();
    await review.populate('userId', 'name');

    // Update book rating
    await updateBookRating(review.bookId);

    res.json({
      message: 'Review updated successfully',
      ...review.toObject()
    });
  } catch (error) {
    console.error('Update review error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(500).json({ message: 'Server error updating review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    const bookId = review.bookId;
    await Review.findByIdAndDelete(req.params.id);

    // Update book rating
    await updateBookRating(bookId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(500).json({ message: 'Server error deleting review' });
  }
};

const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId })
      .populate('bookId', 'title author')
      .sort({ createdAt: -1 });

    res.json({
      message: 'User reviews retrieved successfully',
      reviews
    });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Server error retrieving user reviews' });
  }
};

module.exports = {
  getReviewsByBook,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByUser
};