const db = require('../config/db');

const Energy = {
    add: (energyData, callback) => {
        const sql = `INSERT INTO energy (added_by, energy_units, price_per_unit, location) VALUES (?, ?, ?, ?)`;

        // Execute the query with the provided data
        db.query(sql, [energyData.added_by, energyData.energy_units, energyData.price_per_unit, energyData.location], (err, result) => {
            if (err) {
                console.error('Database error:', err);  // Log any database error
                return callback(err);
            }
            return callback(null, result);
        });
    },
    getAll: (callback) => {
        const sql = `SELECT * FROM energy`;
        db.query(sql, [], callback);
    }
};

module.exports = Energy;
