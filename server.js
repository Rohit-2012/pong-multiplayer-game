import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = 3000;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

httpServer.listen(PORT);
console.log(`Listening on port: ${PORT}`);

let readyPlayerCount = 0

io.on("connection", (socket) => {
    console.log("A user is connected", socket.id);
    
    // Listener for starting the game & assigning the referee
    socket.on('ready', () => {
        console.log('Player ready', socket.id)

        readyPlayerCount++

        if (readyPlayerCount === 2) {
            io.emit('startGame', socket.id)
        }
    })

    // Listener for paddle movement
    socket.on('paddleMove', (paddleData) => {
        socket.broadcast.emit('paddleMove', paddleData)
    })

    // Listener for ball move event
    socket.on('ballMove', (ballData) => { 
        socket.broadcast.emit('ballMove', ballData)
    })
});
