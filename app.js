const express = require('express')
const app = express()
const dotenv = require('dotenv')
const route = require('./src/modules')
const db = require('./src/config/db')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

dotenv.config()
app.use(express.json())

//API docs
const options = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0',
        },
    },
    apis: ['./src/modules/**/*.route.js'],
}

const openapiSpecification = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

//Connect router
route(app)

//Connect database
db.testConnect()

app.post('/login', (req, res) => {
    // Your implementation comes here ...
})

app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})
