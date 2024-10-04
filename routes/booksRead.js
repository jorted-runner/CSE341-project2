const express = require('express')
const router = express.Router()
const { getAllReadBooks, addBookRead } = require('../controllers/readController')
const validation = require('../middleware/validate')

// Get all Read Books
router.get('/', getAllReadBooks)

// Add a new Read Book
router.post('/', validation.saveBookRead, addBookRead);

module.exports = router