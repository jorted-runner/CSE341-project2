const express = require('express')
const router = express.Router()
const { getAllReadBooks, addBookRead } = require('../controllers/readController')
const validation = require('../middleware/validate')

router.get('/', getAllReadBooks)

router.post('/', validation.saveBookRead, addBookRead);

module.exports = router