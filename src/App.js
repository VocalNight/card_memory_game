
import { useState } from 'react';
import './App.css';
import GameContainer from './Components/GameContainer';
import Header from './Components/Header';
import GameStart from './Components/GameStart';

function App() {
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [gameState, setGameState] = useState(0); //0 = being played, 1 = game ended
  const [gameDifficulty, setGameDifficulty] = useState(0);

  function scoreSetting(status) {
    if (status) {
      setScore(score + 1);
    } else {
      setScore(0);
      setHighestScore(score > highestScore ? score : highestScore);
    }

  }

  function gameDifficultyConfig(difficulty) {
    setGameDifficulty(difficulty);
  }

 

  return (
    <div>
      <div>
        <Header gameScore={score} highestScore={highestScore}/>
      </div>
      {gameDifficulty === 0 ? (
        <div>
        <GameStart setDifficulty={gameDifficultyConfig}/>
      </div>
      ) : (
        <GameContainer gameStatus={scoreSetting} difficulty={gameDifficulty}/>
      )}
    </div>
  );
}

export default App;
