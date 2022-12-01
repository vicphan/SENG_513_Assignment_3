import Popup from "reactjs-popup";
import ButtonWithText from "../button_with_text";

// pop up that appears on the main page if a player has disconnected from the game
// displays button for user to go back to main menu
const PlayerDisconnected = ({player_disconnected, close_window, main_menu}) => {

    return (
        <Popup open={player_disconnected} modal>
            <button className="close" onClick={() => close_window()}>
                &times;
            </button>
            <div className="modal">
                <p className='info_text'>A player disconnected before the game ended.</p>
                <ButtonWithText text='Back to main menu' onClick={main_menu}/>
            </div>
        </Popup>
    )
}

export default PlayerDisconnected;