const express = require('express');
const auth = require('../middleware/auth');
const { 
  getReviewsByBook, 
  createReview, 
  updateReview, 
  deleteReview, 
  getReviewsByUser 
} = require('../controllers/reviewController');

const router = express.Router();

router.get('/book/:bookId', getReviewsByBook);
router.post('/', auth, createReview);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);
router.get('/user/:userId', getReviewsByUser);

module.exports = router;