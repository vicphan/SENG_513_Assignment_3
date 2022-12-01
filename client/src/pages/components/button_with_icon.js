import {FaArrowLeft, FaRedo} from 'react-icons/fa';

// Represents each button that has an icon
// Uses icons from font-awesome (part of react icons)
const ButtonWithIcon = ({type, onClick}) => {

    const getIcon = (type) => {
        const map = {"back": <FaArrowLeft/>,
               "replay": <FaRedo/>};

        return map[type];
    }

    return (
        <button className="button icon" onClick={() => onClick()}>
            {getIcon(type)}
        </button>
    )
}

export default ButtonWithIcon;