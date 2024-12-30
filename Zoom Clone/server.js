const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const { v4: uuidV4 } = require('uuid');
const path = require('path');

// App setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Peer server setup
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});

// Middleware
app.use('/peerjs', peerServer);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

// Socket.io connection handling
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    if (!roomId || !userId) {
      return;
    }

    socket.join(roomId);
    // Using to() instead of deprecated broadcast
    socket.to(roomId).emit('user-connected', userId);

    // Handle chat messages
    socket.on('message', (message) => {
      if (message) {
        io.to(roomId).emit('createMessage', message);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });

    // Error handling for socket events
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 8090;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated');
  });
});