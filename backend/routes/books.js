const express = require('express');
const auth = require('../middleware/auth');
const { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', auth, createBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;