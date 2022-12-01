import Header from './components/header';
import ButtonWithText from './components/button_with_text';
import ButtonWithIcon from './components/button_with_icon';
import { socket } from '../context/socket';
import { useState } from 'react';

// page where user can enter their name and generate a code to start a game
const NewGamePage = ({nav, setPlayerInfo}) => {

    const [name, setName] = useState("");
    const [gameCode, setGameCode] = useState("");
    const [displayGameCode, setDisplayGameCode] = useState('hide_element');
    const [displayGenerateButton, setDisplayGenerateButton] = useState('display_element');
    const [displayWaitingAnimation, setDisplayWaitingAnimation] = useState('hide_element');

    const onClick = () => {
        if (name === ""){
            alert('Please enter a name');
            return;
        }
        setDisplayGenerateButton('hide_element');
        socket.connect();
        socket.on("responseCreateGame", function(data) {
            if (data.code === 0){
                setDisplayGameCode('display_element');
                setGameCode(data.gameCode);
                setDisplayWaitingAnimation('display_element');
                return;
            }
            alert(data.message);
            
        });
        socket.on("startGame", function(data){
            const navigateToMain = nav[1];
            navigateToMain();
        });
        socket.on("playerInfo", function(data){
            setPlayerInfo(data);
        })
        socket.emit("createGame", {name});
    }

    return (
        <div className='page'>
            <Header id="header_main" />
            <ButtonWithIcon type="back" onClick={nav[0]}/>
            <div className='center column'>
                <label htmlFor="name" className="text_label">Please enter your name:</label>
                <input className="text_field" type="text" value={name} id="name" name="name" maxLength={10} onChange={(e) => setName(e.target.value)}></input>
                <br></br>
            </div>
            
            <div className={displayGenerateButton}>
                <ButtonWithText text="Generate Game Code" onClick={onClick} />
            </div>
            <br></br>

            {/* Displays game code to start game */}
            <div className={displayGameCode}>
                <p>Generated game code is:</p>
                <p><b>{gameCode}</b></p>
                <p>Give this code to two other players to start the game.</p>
            </div>

            {/* Displays waiting animation */}
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

export default NewGamePage;