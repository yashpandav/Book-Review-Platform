const Book = require('../models/Book');
const Review = require('../models/Review');

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

const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const genre = req.query.genre || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }

    const books = await Book.find(query)
      .populate('addedBy', 'name')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.json({
      message: 'Books retrieved successfully',
      books,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error retrieving books' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({
      message: 'Book retrieved successfully',
      ...book.toObject()
    });
  } catch (error) {
    console.error('Get book error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).json({ message: 'Server error retrieving book' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, description, genre, publishedYear } = req.body;

    // Basic validation
    const errors = validateInput(req.body, ['title', 'author', 'description', 'genre', 'publishedYear']);
    
    if (description && description.trim().length < 10) {
      errors.push('Description must be at least 10 characters');
    }
    
    const year = parseInt(publishedYear);
    if (publishedYear && (isNaN(year) || year < 1000 || year > new Date().getFullYear() + 1)) {
      errors.push('Please enter a valid published year');
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const book = new Book({
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      genre: genre.trim(),
      publishedYear: year,
      addedBy: req.user._id
    });

    await book.save();
    await book.populate('addedBy', 'name');

    res.status(201).json({
      message: 'Book created successfully',
      ...book.toObject()
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error creating book' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, description, genre, publishedYear } = req.body;

    // Basic validation
    const errors = validateInput(req.body, ['title', 'author', 'description', 'genre', 'publishedYear']);
    
    if (description && description.trim().length < 10) {
      errors.push('Description must be at least 10 characters');
    }
    
    const year = parseInt(publishedYear);
    if (publishedYear && (isNaN(year) || year < 1000 || year > new Date().getFullYear() + 1)) {
      errors.push('Please enter a valid published year');
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user owns the book
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this book' });
    }

    book.title = title.trim();
    book.author = author.trim();
    book.description = description.trim();
    book.genre = genre.trim();
    book.publishedYear = year;

    await book.save();
    await book.populate('addedBy', 'name');

    res.json({
      message: 'Book updated successfully',
      ...book.toObject()
    });
  } catch (error) {
    console.error('Update book error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).json({ message: 'Server error updating book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user owns the book
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this book' });
    }

    // Delete all reviews for this book
    await Review.deleteMany({ bookId: req.params.id });
    
    // Delete the book
    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: 'Book and associated reviews deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).json({ message: 'Server error deleting book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};