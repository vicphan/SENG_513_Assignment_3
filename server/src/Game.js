// Game class that handles logic
class Game {
    constructor(sockets, player_names){
        this.player_turn = 1;
        this.step = 1;
        this.board = Array(24).fill(null);
        this.score = Array(3).fill(0);
        this.sockets = sockets;
        this.player_names = player_names;
        this.handleEvents(sockets);
    }

    // Tells clients that game has started
    startGame = () => {
        for (let i=0; i<this.sockets.length; i++) {
            this.sockets[i].emit("startGame");
        }
    }

    // Helper method to write to sockets
    writeToSockets = (event, message) => {
        for (let i=0; i<this.sockets.length; i++) {
            this.sockets[i].emit(event, message);
        }
    }

    // Handles game logic when a player makes a move
    handleClick = (data) => {
        const player = data.player;
        const index = data.index;

        // update game logic
        this.step += 1;
        this.board[index] = this.player_turn;
        const boxFilled = this.calculateBoxFilled(index);
        this.player_turn += boxFilled;
        this.calculatePlayerTurn();
        const player_turn = this.player_turn;
        const step = this.step;
        const board = this.board;
        const score = this.score;
        this.writeToSockets("playerTurnTaken", {player, index, player_turn, step, board, score});
        if (this.step > 24){
            this.calculateWinner();
        }
    }

    // Helper method to handle events
    handleEvents = (sockets) => {
        const handleClick = this.handleClick;
        const restartGame = this.restartGame;
        const playerDisconnect = this.playerDisconnect;

        for (let i=0; i<this.sockets.length; i++){
            sockets[i].on("handleClick", function(data){
                handleClick(data);
            });
            sockets[i].on("restartGame", function(data){
                restartGame();
            });
            sockets[i].on("disconnect", function(data){
                console.log(`Client ${sockets[i].id} disconnected`);
                playerDisconnect();
            })
            sockets[i].on("playerDisconnected", function(data){
                playerDisconnect(data.playerNumber);
            })
        }
    }

    // Lets clients know that a player has disconnected
    playerDisconnect = () => {
        for (let i=1; i<=3; i++){
            try{
                this.sockets[i].emit("playerDisconnected");
                this.sockets[i].disconnect(0);
            } catch (error){
            }
        }
        
    }

    // Lets clients know that a player has forcefully disconnected
    playerDisconnect = (player_number) => {
        for (let i=1; i<=3; i++){
            if (i!==player_number){
                try{
                    this.sockets[i].emit("playerDisconnected");
                    this.sockets[i].disconnect(0);
                } catch (error){
                }
            }
        }
    }

    // Helper method to calculate player turn
    calculatePlayerTurn = () => {
        if (this.player_turn % 4 === 0) {
            this.player_turn = 1;
        }
    }

    // Resets states
    restartGame = () => {
        console.log("restart game");
        this.player_turn = 1;
        this.step = 1;
        this.board = Array(24).fill(null);
        this.score = Array(3).fill(0);
        this.writeToSockets("restartGame");
    }

    // Lets clients know that game is over
    calculateWinner = () => {
        this.writeToSockets("gameOver");
    }

    // Determines which boxes are have been completed (all four sides have been filled)
    // Takes in game board (array) and index (position on game board that has been recently filled)
    // Writes 
    calculateBoxFilled = (index) =>  {
        const winning_indices = [
            [0, 3, 4, 7],
            [1, 4, 5, 8],
            [2, 5, 6, 9],
            [7, 10, 11, 14],
            [8, 11, 12, 15],
            [9, 12, 13, 16],
            [14, 17, 18, 21],
            [15, 18, 19, 22],
            [16, 19, 20, 23]
        ]

        let indices = [];
        let box_filled = true;

        for (let i = 0; i < winning_indices.length; i++) {
            if (winning_indices[i].includes(index)) {
                for (let j = 0; j < winning_indices[i].length; j++) {
                    if (this.board[winning_indices[i][j]] === null) {
                        box_filled = false;
                    }
                }
                if (box_filled) {
                    indices.push(i);
                }
                box_filled = true;
            }
        }

        if (indices.length > 0){
            this.score[this.player_turn-1] += indices.length;
            const player = this.player_turn;
            this.writeToSockets("boxFilled", {indices, player});
            return 0;
        }
        return 1;
    }

}

module.exports = {Game}