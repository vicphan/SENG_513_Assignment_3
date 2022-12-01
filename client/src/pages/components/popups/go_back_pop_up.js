import Popup from 'reactjs-popup';
import ButtonWithText from '../button_with_text';

// pop up that appears when user wants to go back to main menu
// will prompt user to ensure that users actually wants to go back
// will stop game if user does
const GoBackPopUp = ({open_go_back, close_window, main_menu}) => {

    return (
        <Popup open={open_go_back} modal>
            <button className="close" onClick={() => close_window()}>
                &times;
            </button>
            <div className="modal">
                <p className='info_text'>Are you sure you want to go back?</p>
                <ButtonWithText text='Yes' onClick={main_menu}/>
            </div>
        </Popup>
    )
}

export default GoBackPopUp;