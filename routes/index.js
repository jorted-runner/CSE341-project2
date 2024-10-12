const router = require('express').Router()
const readRouter = require('./booksRead')
const tbrRouter = require('./booksTBR')
const swaggerRouter = require('./swagger')

router.use('/', swaggerRouter)

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World]
    res.send('Hello World')
})

router.use('/read', readRouter);
router.use('/tbr', tbrRouter)

module.exports = router