import VerticalLine from "./vertical_line";

// Represents rows with vertical lines on the game board
// Includes vertical lines and boxes (that will colored by the player who completed it)
// Each box is assigned an ID for css styling
const RowWithVerticalLines = ({empty_box_ids, indices, handleClick}) => {
    return (
        <tr>
            <td><VerticalLine index={indices[0]} handleClick={handleClick}/></td>
            <td><div className="empty_box" id={empty_box_ids[0]}></div></td>
            <td><VerticalLine index={indices[1]} handleClick={handleClick}/></td>
            <td><div className="empty_box" id={empty_box_ids[1]}></div></td>
            <td><VerticalLine index={indices[2]} handleClick={handleClick}/></td>
            <td><div className="empty_box" id={empty_box_ids[2]}></div></td>
            <td><VerticalLine index={indices[3]} handleClick={handleClick}/></td>
        </tr>
    )
}

export default RowWithVerticalLines;