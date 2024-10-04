const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'API to view read books and to be read books'
    },
    host: 'localhost:8080',
    schemes: ['https', 'http']
}

const outputFile = './swagger.json'
const routeFiles = ['./routes/booksRead.js', './routes/index.js']

swaggerAutogen(outputFile, routeFiles, doc)