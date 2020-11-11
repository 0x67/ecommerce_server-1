require('dotenv').config()

const express = require('express');
const cors = require('cors')
const router = require('./routers/index')
const port = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use('/', router)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

module.exports = app