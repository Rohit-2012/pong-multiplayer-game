let readyPlayerCount = 0

function socketListen(io) {
  io.on("connection", (socket) => {
    console.log("A user is connected", socket.id);

    // Listener for starting the game & assigning the referee
    socket.on("ready", () => {
      console.log("Player ready", socket.id);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        io.emit("startGame", socket.id);
      }
    });

    // Listener for paddle movement
    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    // Listener for ball move event
    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    // Disconnect Event
    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected : ${reason}`);
    });
  });
}

export default socketListen