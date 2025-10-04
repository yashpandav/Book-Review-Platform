import React from 'react';
import { FaBook } from 'react-icons/fa';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-64">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}>
          <div className="absolute inset-0 border-4 border-teal rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Book icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaBook className="text-teal" />
        </div>
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-text-gray font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;