// Require dependencies
// Used to create the express app
const express = require('express')
// Morgan used for the debugging process
const logger = require('morgan')
// Mongoose used as the ORM for mongoDB
const mongoose = require('mongoose')
// Used to compress files and improve performance
const compression = require('compression')

// Create the port for production or else use port 3000
const PORT = process.env.PORT || 3000
// Create the express app
const app = express()
// Use logger for development
app.use(logger('dev'))
// Use compression middleware to compress files
app.use(compression())
// Parse the requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Use static files in public
app.use(express.static('public'))
// Connect to the production or development database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// routes
app.use(require('./routes/api.js'))
// Listen on the port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})
