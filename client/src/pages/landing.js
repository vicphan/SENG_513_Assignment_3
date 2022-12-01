import Header from './components/header';
import ButtonWithText from './components/button_with_text';

// Landing page where players can choose to create or join a game
const LandingPage = ({nav}) => {

    return(
        <div className='page'>
            <Header id="header_landing" />
            <div className='button_div'>
                <ButtonWithText text="Create a new game" onClick={nav[0]}/>
                <ButtonWithText text="Join a game" onClick={nav[1]}/>
            </div>
        </div>
    )
}

export default LandingPage;