const express = require('express')
const router = express.Router()
const {
	getAllReadBooks,
	getReadByID,
	addBookRead,
	updateReadBookByID,
} = require('../controllers/readController');
const validation = require('../middleware/validate')

// Get all Read Books
router.get('/', getAllReadBooks)

// Get Read book by ID
router.get('/:id', getReadByID)

// Add a new Read Book
router.post('/', validation.saveBookRead, addBookRead);

// Update a Read Book by ID
router.put(
	'/:id',
    validation.checkID,
	validation.saveBookRead,
	updateReadBookByID
);

module.exports = router