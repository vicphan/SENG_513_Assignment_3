import Board from "./board";
import React, { useEffect, useState } from "react";
import WinnerPopUp from "./popups/winner_pop_up";
import GoBackPopUp from "./popups/go_back_pop_up";
import PlayerDisconnected from "./popups/pd_pop_up";
import ButtonWithIcon from "./button_with_icon";
import { socket as soc} from '../../context/socket';
import { useCookies } from "react-cookie";

// Includes all the game logic on the client side
const Game = ({nav, p, player_number, player_names}) => {

    const socket = soc;
    const playerColor = ["blue", "yellow", "red"];
    const emptyBoxIDs = [
        ["empty_box_0", "empty_box_1", "empty_box_2"],
        ["empty_box_3", "empty_box_4", "empty_box_5"],
        ["empty_box_6", "empty_box_7", "empty_box_8"]
    ];
    const player = p;
    const playerNumber = player_number;
    const playerNames = player_names;
    const [cookies, setCookies, removeCookie] = useCookies(['step', 'board', 'score', 'playerTurn']);
    const [playerTurn, setPlayerTurn] = useState(cookies.playerTurn || 1);
    const [step, setStep] = useState(cookies.step || 1);
    const [board, setBoard] = useState(cookies.board || Array(24).fill(null));
    const [score, setScore] = useState(cookies.score || Array(3).fill(0));
    // flags to open popups on the main page
    const [openWindow, setOpenWindow] = useState(false);
    const [openGoBack, setOpenGoBack] = useState(false);
    const [playerDisconnected, setPlayerDisconnected] = useState(false);

    useEffect(() => {
        // handles events from the server
        // calls appropriate methods
        function initSocketEvents() {
            socket.on("playerTurnTaken", function(data){
                updateState(data.player_turn, data.step, data.board, data.score);
                const index = data.index;
                const color = playerColor[data.player-1];
                changeLineColor(index, color);
            })
            socket.on("boxFilled", function(data){
                displayBoxColor(data.indices, playerColor[data.player-1]);
            })
            socket.on("gameOver", function(data){
                gameOver();
            })
            socket.on("playerDisconnected", function(data){
                removeCookies();
                socket.disconnect();
                setPlayerDisconnected(true);
            })
            socket.on("restartGame", function(data){
                restartGame();
            })
        }

        // sets the color of lines when players play or hover over
        function displayLine() {
            displayLineColor(playerColor[playerNumber-1]);
        }

        // if board already existed (from cookies), color the board with
        // existing colors 
        function colorLines() {
            for (let i=0; i<24; i++){
                let player = board.at(i);
                if (player !== null){
                    let color = playerColor[player-1];
                    changeLineColor(i, color);
                }
            }
        }

        initSocketEvents();
        displayLine();
        if (step !== 1){
            colorLines();
        }
    })

    // removes cookies from user's browser
    const removeCookies = () => {
        removeCookie('playerTurn', {path: '/'});
        removeCookie('step', {path: '/'});
        removeCookie('board', {path: '/'});
        removeCookie('score', {path: '/'});
    }

    // routine when game ends
    const gameOver = () => {
        removeCookies();
        socket.disconnect();
        setOpenGoBack(false);
        setOpenWindow(true);
        setPlayerDisconnected(false);
    }

    // directs the pop up to appear 
    // that asks the user if they want to go to the main page
    const goBackPopUpAppear = () => {
        setOpenGoBack(true);
        setOpenWindow(false);
        setPlayerDisconnected(false);
    }

    // updates game state 
    const updateState = (player_turn, _step, _board, _score) => {
        setPlayerTurn(player_turn);
        setCookies('playerTurn', player_turn, {path: '/'});
        setStep(_step);
        setCookies('step', _step, {path: '/'});
        setBoard(_board);
        setCookies('board', _board, {path: '/'});
        setScore(_score);
        setCookies('score', _score, {path: '/'});
    }

    // Method that updates game logic when a horizontal or vertical line has been clicked/completed
    // Takes in unique identifier (ID) assigned to all lines in board 
    // Sends click to server to update game logic
    const handleClick = (i) => {
        if (playerTurn !== playerNumber){
            alert("Not your turn!");
            return;
        }
        if (board.at(i) !== null){
            alert("Invalid move!");
            return;
        }
        const index = i;
        const player = playerNumber;
        socket.emit("handleClick", {player, index});
    }

    // changes either vertical or horizontal line based on color passed in
    const displayLineColor = (color) => {
        let css_h_line = ".h_line:hover{ background-color: " + color + " }";
        let css_v_line = ".v_line:hover{ background-color: " + color + " }";

        let style = document.createElement('style');

        style.appendChild(document.createTextNode(css_h_line));
        style.appendChild(document.createTextNode(css_v_line));

        document.getElementsByTagName('head')[0].appendChild(style);
    }

    // displays box color based on indice and color specified
    const displayBoxColor = (indices, color) => {
        for (let i = 0; i < indices.length; i++) {
            let index = indices[i];
            if (document.getElementById("empty_box_" + index)) {
                document.getElementById("empty_box_" + index).style.backgroundColor = color;
            }
            else {
                let css = "#empty_box_" + index + "{ background-color: " + color + " }";
                let style = document.createElement('style');

                style.appendChild(document.createTextNode(css));
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        }

    }

    // resets boxes to default color
    const resetBoxColors = () => {
        displayBoxColor([0, 1, 2, 3, 4, 5, 6, 7, 8], "black");
    }

    // changes specified line to specified color
    const changeLineColor = (index, color) => {
        document.getElementById("line_" + index).style.backgroundColor = color;
    }

    // reset all line colors to default
    const resetLineColors = () => {
        for (let i = 0; i < 24; i++) {
            document.getElementById("line_" + i).style.backgroundColor = null;
        }
    }

    // restarts game by resetting states
    const restartGame = () => {
        alert("Game was restarted by one of the players");
        removeCookies();
        setPlayerTurn(1);
        setStep(1);
        setBoard(Array(24).fill(null));
        setScore(Array(3).fill(0));
        setOpenGoBack(false);
        setOpenWindow(false);
        setPlayerDisconnected(false);
        resetLineColors();
        displayLineColor(playerColor[playerTurn - 1]);
        resetBoxColors();
    }

    // lets the server to know to restart game
    const sendRestartGame = () => {
        socket.emit("restartGame");
    }

    // closes the game info window
    const closeWinnerWindow = () => {
        setOpenWindow(false);
    }
    
    // closes the go back to main menu window 
    const closeGoBackWindow = () => {
        setOpenGoBack(false);
    }

    // closes the player disconnected window
    // lets the user know that other players have disconnected from the game
    const closePlayerDisWindow = () => {
        setPlayerDisconnected(false);
    }

    // indicates to the server that the player disconnected
    // routine to clean up 
    const quitGame = () => {
        socket.emit("playerDisconnected", {playerNumber});
        removeCookies();
        socket.disconnect();
        const goBack = nav;
        goBack();
    }

    return(
        <div>
            <div className="center">
                <p className="info_text"><b>Current turn:</b> {playerNames[playerTurn-1]}</p>
                <p className="info_text">{playerNames[0]}: {score[0]}</p>
                <p className="info_text">{playerNames[1]}: {score[1]}</p>
                <p className="info_text">{playerNames[2]}: {score[2]}</p>
            </div>
            <div className="button_div center padding_top_bottom">
                <ButtonWithIcon type="back" onClick={goBackPopUpAppear} />
                <ButtonWithIcon type="replay" onClick={sendRestartGame.bind(this)} />
            </div>
            <Board empty_box_ids={emptyBoxIDs} handleClick={handleClick.bind(this)} />
            <WinnerPopUp open_window={openWindow} close_window={closeWinnerWindow.bind(this)} main_menu={nav} player_names={playerNames} score={score}/>
            <GoBackPopUp open_go_back={openGoBack} close_window={closeGoBackWindow.bind(this)} main_menu={quitGame.bind(this)} />
            <PlayerDisconnected player_disconnected={playerDisconnected} close_window={closePlayerDisWindow.bind(this)} main_menu={nav} />
        </div>
    )
}

export default Game;