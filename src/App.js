
import { useEffect, useState } from 'react';
import './App.css';
import GameContainer from './Components/GameContainer';
import Header from './Components/Header';
import GameStart from './Components/GameStart';

function App() {
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [gameState, setGameState] = useState(0); //0 = being played, 1 = game ended
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [heroesList, setHeroesList] = useState([]);

  useEffect(() => {
    const loadHeroes = async () => {
      setHeroesList(await fetchHeroes());
    };

    loadHeroes();
  }, []);

  const fetchHeroes = async () => {
    const response = await fetch("https://api.opendota.com/api/heroStats");
    const heroes = await response.json();

    const cleanedList = heroes.map((hero) => {
      let simplifiedName = hero.localized_name
        .replace(/\s+/g, "_", "_")
        .toLowerCase();
      return {
        id: hero.id,
        name: hero.localized_name,
        attribute: hero.primary_attr,
        img: `images/heroes/${simplifiedName}.png`,
        clicked: false,
      };
    });

    return cleanedList;
  };


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
        <GameContainer heroesList={heroesList} gameStatus={scoreSetting} difficulty={gameDifficulty}/>
      )}
    </div>
  );
}

export default App;
