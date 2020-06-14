// Require router to create controllers
const router = require('express').Router()
// Use the Transcation model
const Transaction = require('../models/transaction.js')

// Post request for a transaction to MongoDB
router.post('/api/transaction', ({ body }, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// Post request to post offline transactions in bulk
router.post('/api/transaction/bulk', ({ body }, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})
// Get request to retrieve all of the transactions
router.get('/api/transaction', (req, res) => {
  Transaction.find({})
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

module.exports = router
