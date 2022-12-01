const {Game} = require('./Game');

// Class that generates games
class GameGenerator{
    constructor(){
        this.sockets = {};
    }

    // generates game code for users to join games
    generateGameCode(){
        const length = 8;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log(`New game code generated: ${result}`)
        return result;
    }

    // connects user to games 
    connectGame(game_code, socket, name){
        const obj = {};
        obj[name] = socket;
        if (game_code in this.sockets){
            if (Object.keys(this.sockets[game_code]).includes(socket)){
                return {"code": 1, "message": "You already joined."};
            }
            else if (this.sockets[game_code].length >= 3){
                return {"code": 1, "message": "Error. Three users have already joined using this game code."};
            }
            else{
                this.addSocket(game_code, name, socket);
                return {"code": 0, "message": "Successfully joined the game."};
            }
        }
        else{
            this.sockets[game_code] = obj;
            return {"code": 0, "message": "Successfully created the game."};
        }
    }

    // helper method to add socket to associated game code
    addSocket(game_code, name, socket){
        this.sockets[game_code][name] = socket;
        if (Object.keys(this.sockets[game_code]).length === 3){
            this.startGame(this.sockets[game_code]);
        }
    }

    // starts game
    startGame(player_sockets){
        const players = Object.keys(player_sockets);
        let player_numbers = {};
        let game_sockets = [];
        let player_names = [];
        for (let i=1; i<=players.length; i++){
            const name = players[i-1];
            player_numbers[name] = i;
            game_sockets.push(player_sockets[name]);
            player_names.push(name);
        }
        for (const [name, socket] of Object.entries(player_sockets)){
            const playerNumber = player_numbers[name];
            socket.emit("playerInfo", {name, playerNumber, players});
        }
        const game = new Game(game_sockets, player_names);
        game.startGame();
    }

}

module.exports = {GameGenerator}