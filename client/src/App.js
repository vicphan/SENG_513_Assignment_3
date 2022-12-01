import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landing';
import MainPage from './pages/main';
import NewGamePage from './pages/new_game';
import JoinGamePage from './pages/join_game';
import {SocketContext, socket} from './context/socket';
import { useState } from 'react';
 

function App() {

  const [player, setPlayer] = useState("Player");
  const [player_number, setPlayerNumber] = useState(0);
  const [player_names, setPlayerNames] = useState(["Player 1", "Player 2", "Player 3"]);

  const setPlayerInfo = (data) => {
    setPlayer(data.name);
    setPlayerNumber(data.playerNumber);
    setPlayerNames(data.players);
  }

  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate('/main');
  }

  const navigateToLanding = () => {
    navigate('/');
  }

  const navigateToNewPage = () => {
    navigate('/new_game');
  }

  const navigateToJoinGame = () => {
    navigate('/join_game');
  }

  return (
    <div>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route exact path="/" element={<LandingPage nav={[navigateToNewPage, navigateToJoinGame]}/>}/>
          <Route exact path="/main" element={<MainPage nav={navigateToLanding} playerInfo={[player, player_number, player_names]}/>}/>
          <Route exact path="/new_game" element={<NewGamePage nav={[navigateToLanding, navigateToMain]} setPlayerInfo={setPlayerInfo}/>} />
          <Route exact path="/join_game" element={<JoinGamePage nav={[navigateToLanding, navigateToMain]} setPlayerInfo={setPlayerInfo}/>}/>
        </Routes>
      </SocketContext.Provider >
    </div>
  )
}

export default App;
