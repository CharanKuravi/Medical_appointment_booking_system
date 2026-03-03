// WebRTC Signaling Server using Socket.io
// Handles peer-to-peer connection establishment and data channel signaling

const setupSignalingServer = (io) => {
  const rooms = new Map(); // roomId -> Set of socket IDs

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a room
    socket.on('join-room', ({ roomId, userId, role }) => {
      socket.join(roomId);
      
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }
      rooms.get(roomId).add(socket.id);

      socket.userId = userId;
      socket.role = role;
      socket.roomId = roomId;

      console.log(`User ${userId} (${role}) joined room ${roomId}`);

      // Notify others in the room
      socket.to(roomId).emit('user-joined', { userId, role, socketId: socket.id });

      // Send list of existing users in room
      const existingUsers = Array.from(rooms.get(roomId))
        .filter(id => id !== socket.id)
        .map(id => {
          const userSocket = io.sockets.sockets.get(id);
          return {
            socketId: id,
            userId: userSocket?.userId,
            role: userSocket?.role
          };
        });

      socket.emit('existing-users', existingUsers);
    });

    // WebRTC Offer
    socket.on('offer', ({ offer, to }) => {
      console.log(`Sending offer from ${socket.id} to ${to}`);
      io.to(to).emit('offer', {
        offer,
        from: socket.id
      });
    });

    // WebRTC Answer
    socket.on('answer', ({ answer, to }) => {
      console.log(`Sending answer from ${socket.id} to ${to}`);
      io.to(to).emit('answer', {
        answer,
        from: socket.id
      });
    });

    // ICE Candidate
    socket.on('ice-candidate', ({ candidate, to }) => {
      io.to(to).emit('ice-candidate', {
        candidate,
        from: socket.id
      });
    });

    // Sign language translation
    socket.on('sign-translation', ({ text }) => {
      if (socket.roomId) {
        socket.to(socket.roomId).emit('sign-translation', {
          text,
          from: socket.userId,
          timestamp: Date.now()
        });
      }
    });

    // Speech transcript
    socket.on('speech-transcript', ({ text }) => {
      if (socket.roomId) {
        socket.to(socket.roomId).emit('speech-transcript', {
          text,
          from: socket.userId,
          timestamp: Date.now()
        });
      }
    });

    // Leave room
    socket.on('leave-room', () => {
      if (socket.roomId) {
        const room = rooms.get(socket.roomId);
        if (room) {
          room.delete(socket.id);
          if (room.size === 0) {
            rooms.delete(socket.roomId);
          }
        }
        socket.to(socket.roomId).emit('user-left', { userId: socket.userId });
        socket.leave(socket.roomId);
        console.log(`User ${socket.userId} left room ${socket.roomId}`);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      if (socket.roomId) {
        const room = rooms.get(socket.roomId);
        if (room) {
          room.delete(socket.id);
          if (room.size === 0) {
            rooms.delete(socket.roomId);
          }
        }
        socket.to(socket.roomId).emit('user-left', { userId: socket.userId });
      }
    });
  });

  console.log('WebRTC Signaling Server initialized');
};

module.exports = setupSignalingServer;
