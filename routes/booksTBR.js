const express = require('express');
const router = express.Router();
const {
	getAllTbrBooks,
	getTbrByID,
	addBookTbr,
	updateTbrBookByID,
	deleteTbrBook,
} = require('../controllers/tbrController');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all TBR Books
router.get('/', getAllTbrBooks);

// Get tbr book by ID
router.get('/:id', validation.checkID, getTbrByID);

// Add a new tbr Book
router.post('/', isAuthenticated, validation.saveBookTbr, addBookTbr);

// Update a trb Book by ID
router.put(
	'/:id',
	isAuthenticated,
	validation.checkID,
	validation.saveBookTbr,
	updateTbrBookByID
);

// Delete a tbr Book by ID
router.delete('/:id', isAuthenticated, validation.checkID, deleteTbrBook);

module.exports = router;
