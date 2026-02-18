const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize SQLite database
const db = require('./database/db');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/emergency', require('./routes/emergency'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'SQLite' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`Using SQLite database`);
});
