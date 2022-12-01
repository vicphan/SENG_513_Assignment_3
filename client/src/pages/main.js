import Header from "./components/header";
import Game from "./components/game";

// Main page that includes the game board
const MainPage = ({nav, playerInfo}) => {

    return (
        <div className="page">
            <Header id="header_main" />
            <Game nav={nav} p={playerInfo[0]} player_number={playerInfo[1]} player_names={playerInfo[2]}/>
        </div>
    )
}

export default MainPage;