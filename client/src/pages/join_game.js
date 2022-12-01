import Header from './components/header';
import { useState } from 'react';
import { socket } from '../context/socket';
import ButtonWithText from './components/button_with_text';
import ButtonWithIcon from './components/button_with_icon';

// page where user can enter a game code to enter name and game code to join game
const JoinGamePage = ({nav, setPlayerInfo}) => {

    const [name, setName] = useState('');
    const [gameCode, setGameCode] = useState('');
    const [displayJoinGameButton, setDisplayJoinGameButton] = useState('display_element');
    const [displayWaitingAnimation, setDisplayWaitingAnimation] = useState('hide_element');

    const onClick = () => {
        if (gameCode.length !== 8){
            alert('Invalid game code');
            return;
        }

        if (name === ""){
            alert('Please enter a name');
            return;
        }
        
        setDisplayJoinGameButton('hide_element');
        setDisplayWaitingAnimation('display_element');
        socket.connect();

        socket.on("responseJoinGame", function(data){
            if (data.code === 1){
                alert(data.message);
            }
        });
        socket.on("playerInfo", function(data){
            setPlayerInfo(data);
        })
        socket.on("startGame", function(data){
            const navigateToMain = nav[1];
            navigateToMain();
        });
        socket.emit("joinGame", {name, gameCode});

    }

    return(
        <div className='page'>
            <Header id="header_main" />
            <ButtonWithIcon type="back" onClick={nav[0]}/>
            <div className="center column">
                <label htmlFor="name" className="text_label">Please enter your name:</label>
                <input className="text_field" type="text" value={name} id="name" name="name" maxLength={10} onChange={(e) => setName(e.target.value)}></input>
                <br></br>

                <label htmlFor="game_code" className="text_label">Please enter game code to join game:</label>
                <input className="text_field" type="text" value={gameCode} id="game_code" name="game_code" maxLength={8} onChange={(e) => setGameCode(e.target.value)}></input>
                <br></br>
            </div>
            
            {/* join game button */}
            <div className={displayJoinGameButton}>
                <ButtonWithText text="Join game!" onClick={onClick}/>
            </div>

            {/* display waiting animation */}
            <div className={displayWaitingAnimation}>
                <div className="loader_div">
                    <div className='loader'>
                        <span className='loader_dot'></span>
                        <span className='loader_dot'></span>
                        <span className='loader_dot'></span>
                        <span className='loader_dot'></span>
                    </div>
                </div>
                <p>Waiting for other players to join...</p>
            </div>
            
        </div>
    )
}

export default JoinGamePage;


