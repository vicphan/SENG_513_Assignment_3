import Dot from "./dot";
import HorizontalLine from "./horizontal_line";

// Represents a row with dots on the game board
// Includes dots and horizontal lines
const RowWithDots = ({indices, handleClick}) => {
    return (
        <tr>
            <td><Dot /></td>
            <td><HorizontalLine index={indices[0]} handleClick={handleClick}/></td>
            <td><Dot /></td>
            <td><HorizontalLine index={indices[1]} handleClick={handleClick}/></td>
            <td><Dot /></td>
            <td><HorizontalLine index={indices[2]} handleClick={handleClick}/></td>
            <td><Dot /></td>
        </tr>
    )
}

export default RowWithDots;