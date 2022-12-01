// Represents buttons that have text
const ButtonWithText = ({text, onClick}) => {
    return (
        <button className="button" onClick={() => onClick()}>
            <p>{text}</p>
        </button>
    )
}

export default ButtonWithText;