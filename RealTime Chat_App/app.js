const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

let socketConnected = new Set();

io.on('connection', onConnected);

function onConnected(socket) {
    console.log('Socket connected:', socket.id);
    socketConnected.add(socket.id);
    
    // Emit total clients
    io.emit('clients-total', socketConnected.size);

    // Listen for message
    socket.on('message', (data) => {
        console.log('Message received:', data);
        socket.broadcast.emit('chat-message', data);
    });

    // Listen for typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing-feedback', data);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
        socketConnected.delete(socket.id);
        io.emit('clients-total', socketConnected.size);
    });
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
