const db = require('../config/db');

// Add a new transaction to the transaction history
exports.addTransaction = (req, res) => {
    const { buyer_id, seller_id, units, total_price } = req.body;

    // Validate the required fields
    if (!buyer_id || !seller_id || !units || !total_price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert the transaction into the database
    const sql = `INSERT INTO transactions (buyer_id, seller_id, units, total_price) VALUES (?, ?, ?, ?)`;
    db.query(sql, [buyer_id, seller_id, units, total_price], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to add transaction' });
        }
        res.status(201).json({ message: 'Transaction added successfully', transactionId: result.insertId });
    });
};

// Fetch all transactions for transaction history
exports.getAllTransactions = (req, res) => {
    const sql = `SELECT * FROM transactions ORDER BY created_at DESC`;

    db.query(sql, [], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch transactions' });
        }
        res.status(200).json(result);
    });
};
