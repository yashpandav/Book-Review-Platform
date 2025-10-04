import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-lg">★</span>
      );
    }
    
    // Add empty stars
    for (let i = fullStars; i < 5; i++) {
      stars.push(
        <span key={i} className="text-gray-300 text-lg">☆</span>
      );
    }
    
    return stars;
  };

  return (
    <div className="card p-6">
      {/* Book Title and Author */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-text-dark mb-2">
          <Link 
            to={`/books/${book._id}`}
            className="text-teal hover:text-teal-dark"
          >
            {book.title}
          </Link>
        </h3>
        <p className="text-text-gray font-medium mb-2">
          by {book.author}
        </p>
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-brown-light text-white px-3 py-1 rounded-full text-sm font-medium">
            {book.genre}
          </span>
          <span className="text-sm text-text-light">
            • {book.publishedYear}
          </span>
        </div>
      </div>

      {/* Book Description */}
      <p className="text-text-gray mb-4 leading-relaxed line-clamp-3">
        {book.description}
      </p>

      {/* Rating and View Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(book.averageRating)}
          </div>
          <span className="text-sm text-text-light font-medium">
            {book.averageRating.toFixed(1)} ({book.totalReviews} reviews)
          </span>
        </div>
        
        <Link
          to={`/books/${book._id}`}
          className="btn-primary text-sm"
        >
          View Details
        </Link>
      </div>

      {/* Added By Info */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-text-light">
          Added by <span className="font-medium text-text-gray">
            {book.addedBy?.name || 'Unknown'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BookCard;