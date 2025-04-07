// server/routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/trending', bookController.getTrendingBooks);
router.get('/:id', bookController.getBook);

module.exports = router;