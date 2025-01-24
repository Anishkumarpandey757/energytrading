const Energy = require('../models/Energy');  // Import your Energy model

// Controller to handle adding energy
exports.addEnergy = (req, res) => {
    const { added_by, energy_units, price_per_unit, location } = req.body;

    if (!added_by || !energy_units || !price_per_unit || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    Energy.add({ added_by, energy_units, price_per_unit, location }, (err, result) => {
        if (err) {
            console.error('Error adding energy:', err);
            return res.status(500).json({ error: 'Failed to add energy' });
        }
        res.status(201).json({ message: 'Energy added successfully' });
    });
};

// Controller to handle getting all energy data
exports.getAllEnergy = (req, res) => {
    Energy.getAll((err, energyList) => {
        if (err) {
            console.error('Error fetching energy data:', err);
            return res.status(500).json({ error: 'Failed to fetch energy data' });
        }
        res.status(200).json(energyList);
    });
};
