const socketIo = require('socket.io');
const userModel = require('./models/user.model'); 
const captainModel = require('./models/captain.model'); 

let io ;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', async (data) => {
        const {userId, userType} = data;
        
        if(userType === 'user'){
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } 
        else if(userType === 'captain'){
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } 
    });

    socket.on('updateLocation-captain', async (data) => {
      const { userId, location } = data;

      if(!location || !location.lat || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' });
      }

      await captainModel.findByIdAndUpdate(userId, { 
        location :{
          lat:location.lat,
          lng:location.lng
      }});
    });

    socket.on('disconnect', async () => {
        console.log(`User disconnected: ${socket.id}`);
    });
  });
}


function sendMessageToSocketId(socketId, dataobject) {
  if (io) {
    console.log(`Emitting event ${dataobject.event} to socketId: ${socketId}`); // Log event emission
    io.to(socketId).emit(dataobject.event, dataobject.data);
  } else {
    console.log('Socket.io not initialized');
  }
}


module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
