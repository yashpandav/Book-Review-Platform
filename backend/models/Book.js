const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  publishedYear: {
    type: Number,
    required: true,
    min: 1000,
    max: new Date().getFullYear() + 1
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

module.exports = mongoose.model('Book', bookSchema);