const router = require('express').Router()
const readRouter = require('./booksRead')

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.use('/read', readRouter);

module.exports = router