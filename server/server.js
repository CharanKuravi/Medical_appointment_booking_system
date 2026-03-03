const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Socket.io setup with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize SQLite database
const db = require('./database/db');

// Initialize WebRTC signaling server
const setupSignalingServer = require('./socket/signalingServer');
setupSignalingServer(io);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/emergency', require('./routes/emergency'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'SQLite', websocket: 'Socket.io' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`Using SQLite database`);
  console.log(`WebSocket server ready for video calls`);
});
