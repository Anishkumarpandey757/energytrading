const express = require('express');
const { addEnergy, getAllEnergy } = require('../controllers/energyController'); // Import the controller functions
const router = express.Router();

router.post('/add', addEnergy);  // POST route to add energy
router.get('/all', getAllEnergy);  // GET route to get all energy

module.exports = router;  // Export the router
