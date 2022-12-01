import Popup from 'reactjs-popup';
import ButtonWithIcon from '../button_with_icon';

// pop up that appears at the end of the game
// Will display game results and back button to return to main menu
const WinnerPopUp = ({ open_window, close_window, main_menu, player_names, score }) => {

    return (
        <Popup open={open_window} modal>
            <button className="close" onClick={() => close_window()}>
                &times;
            </button>
            <div className='modal'>
                <p className='info_text'><em>Final result:</em></p>
                <p className='info_text'>{player_names[0]}: {score[0]}</p>
                <p className='info_text'>{player_names[1]}: {score[1]}</p>
                <p className='info_text'>{player_names[2]}: {score[2]}</p>
                <ButtonWithIcon type="back" onClick={() => main_menu()}/>
            </div>
        </Popup>
    )
}

export default WinnerPopUp;

