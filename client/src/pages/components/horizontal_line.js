// Represents each horizontal line on the game board
// Each horizontal line is given a unique index for identification purposes to determine a winner
const HorizontalLine = ({index, handleClick}) => {
    const line_id = "line_"+index;
    return (
        <div className="hr_div">
            <div className="empty_hr_div"></div>
            <div className="h_line" id={line_id} onClick={() => handleClick(index)}></div>
            <div className="empty_hr_div"></div>
        </div>
    )
}

export default HorizontalLine;