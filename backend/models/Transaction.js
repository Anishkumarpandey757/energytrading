const db = require('../config/db');

const Transaction = {
    create: (transactionData, callback) => {
        const sql = `INSERT INTO transactions (user_id, energy_traded, price_per_unit, total_revenue, status) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [
            transactionData.user_id,
            transactionData.energy_traded,
            transactionData.price_per_unit,
            transactionData.total_revenue,
            transactionData.status
        ], callback);
    },
    getByUserId: (userId, callback) => {
        const sql = `SELECT * FROM transactions WHERE user_id = ?`;
        db.query(sql, [userId], callback);
    }
};

module.exports = Transaction;
