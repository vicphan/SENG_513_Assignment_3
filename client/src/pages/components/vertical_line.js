// Represents each vertical line on the game board
// Each vertical line is given a unique index for identification purposes to determine a winner
const VerticalLine = ({index, handleClick}) => {
    const line_id = "line_"+index;
    return (
        <div className="vl_div">
            <div className="empty_vl_div"></div>
            <div className="v_line" id={line_id} onClick={() => handleClick(index)}></div>
            <div className="empty_vl_div"></div>
        </div>
    )
}

export default VerticalLine;