const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // Import auth routes
const energyRoutes = require('./routes/energyRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Enable CORS for frontend requests
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true
}));

app.use(express.json());  // Parse incoming JSON requests

// Use the authentication routes at /api/auth
app.use('/api/auth', authRoutes);  // Make sure this line is present and correct

// Use other routes
app.use('/api/energy', energyRoutes);
app.use('/api/transactions', transactionRoutes);

// Catch-all route for unhandled requests
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
