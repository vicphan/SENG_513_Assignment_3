const express = require('express');
const app = express();
const socketIo = require('socket.io');
const port = 5678;
const http = require('http');
const cors = require('cors');
const { GameGenerator } = require('./GameGenerator');

app.use(cors());
app.use(express.json());

// Generates games
const game_generator = new GameGenerator();

const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
      origin: "*"
    }
});

// Handles socket connections 
io.on("connection", (socket) => {
    console.log(`New client connected ${socket.id}`);
    socket.emit("connectionReceived");
    socket.on("joinGame", function(data){
        const response = game_generator.connectGame(data.gameCode, socket, data.name);
        const code = response["code"];
        const message = response["message"];
        socket.emit("responseJoinGame", {code, message});
    })
    socket.on("createGame", function(data){
        const gameCode = game_generator.generateGameCode();
        const response = game_generator.connectGame(gameCode, socket, data.name);
        const code = response["code"];
        const message = response["message"];
        socket.emit("responseCreateGame", {code, gameCode, message});
    })
})

server.listen(port, ()=> {
    console.log(`Server is up on port ${port}.`)
});