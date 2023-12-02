import { Server } from 'socket.io';

let onlineUsers = [];

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? false
          : ['http://localhost:5173'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('addNewUser', (userId) => {
      !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({
          userId,
          socketId: socket.id,
        });

      io.emit('getOnlineUsers', onlineUsers);
    });

    // add message
    socket.on('sendMessage', (message) => {
      const user = onlineUsers.find(
        (user) => user.userId === message.recepientId
      );
      console.log('message', message);
      if (user) {
        console.log('user', user);
        io.to(user.socketId).emit('getMessage', message);
      }
    });

    // disconnect the socket
    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit('getOnlineUsers', onlineUsers);
    });

    // Additional event listeners and logic can be added here
  });

  return io;
};

export default configureSocket;
