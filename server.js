const express = require('express')
const app = express()
const router = require('./routes')

const port = process.env.PORT || 8080

app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})