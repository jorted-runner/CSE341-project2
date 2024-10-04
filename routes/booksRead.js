const express = require('express')
const router = express.Router()
const { getAllReadBooks, addBookRead } = require('../controllers/readController')

router.get('/', getAllReadBooks)

router.post('/', addBookRead)

module.exports = router