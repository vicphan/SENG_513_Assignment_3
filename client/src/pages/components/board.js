import RowWithDots from "./row_with_dots";
import RowWithVerticalLines from "./row_with_vl";
import React from "react";

// Game board where each line and box is assigned an ID.
// Each ID will be used for determining a winner
const Board = ({empty_box_ids, handleClick}) => {

    return (
        <div className="board">
            <table>
                <tbody>
                    <RowWithDots indices={[0, 1, 2]} handleClick={handleClick}/>
                    <RowWithVerticalLines empty_box_ids={empty_box_ids[0]} indices={[3, 4, 5, 6]} handleClick={handleClick}/>
                    <RowWithDots indices={[7, 8, 9]} handleClick={handleClick}/>
                    <RowWithVerticalLines empty_box_ids={empty_box_ids[1]} indices={[10, 11, 12, 13]} handleClick={handleClick}/>
                    <RowWithDots indices={[14, 15, 16]} handleClick={handleClick}/>
                    <RowWithVerticalLines empty_box_ids={empty_box_ids[2]} indices={[17, 18, 19, 20]} handleClick={handleClick}/>
                    <RowWithDots indices={[21, 22, 23]} handleClick={handleClick}/>
                </tbody>
            </table>
        </div>
    )

}

export default Board;