const router = require('express').Router()
const readRouter = require('./booksRead')
const swaggerRouter = require('./swagger')

router.use('/', swaggerRouter)

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World]
    res.send('Hello World')
})

router.use('/read', readRouter);

module.exports = router