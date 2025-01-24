const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transactionController');
const router = express.Router();

// Route to add a transaction
router.post('/add', addTransaction);

// Route to get all transactions
router.get('/all', getAllTransactions);

module.exports = router;
