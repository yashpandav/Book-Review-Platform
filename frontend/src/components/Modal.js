import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="modal-overlay flex items-center justify-center p-4">
      <div 
        className="modal-content w-full max-h-[90vh] overflow-y-auto p-6"
        style={{ maxWidth: sizeClasses[size] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary-200">
          <h2 className="section-header mb-0">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-text-light hover:text-text-primary transition-all duration-200 
                     hover:scale-110 transform-gpu p-2 rounded-full hover:bg-primary-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;