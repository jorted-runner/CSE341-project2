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

// Get all TBR Books
router.get('/', getAllTbrBooks);

// Get tbr book by ID
router.get('/:id', validation.checkID, getTbrByID);

// Add a new tbr Book
router.post('/', validation.saveBookTbr, addBookTbr);

// Update a trb Book by ID
router.put(
	'/:id',
	validation.checkID,
	validation.saveBookTbr,
	updateTbrBookByID
);

// Delete a tbr Book by ID
router.delete('/:id', validation.checkID, deleteTbrBook);

module.exports = router;
