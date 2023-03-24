import { useEffect, useState } from "react";
import Card from "./Card";

export default function GameContainer({ heroesList, gameStatus, difficulty }) {

  const [level, setLevel] = useState(1);
  const [playingList, setPlayingList] = useState([]);

  useEffect(() => {
    const setListDifficulty = async () => {
      
      setPlayingList(heroesList.filter((hero) => hero.id < 1 + difficulty));
    };
    setListDifficulty();
  }, []);

  function resetGame() {
    setPlayingList(heroesList.filter((hero) => hero.id < 1 + difficulty));
  }

  function setClicked(list, heroId, setFunction) {
    let selectedHero = list.find((hero) => hero.id === heroId);

    if (selectedHero.clicked) {
      console.log("already clicked");
      resetGame();
      gameStatus(false);
    } else {
      gameStatus(true);

      let shuffledList = list.map((hero) => {
        if (hero.id === heroId) {
          return {
            ...hero,
            clicked: true,
          };
        } else {
          return hero;
        }
      });

      let didPlayerClickAll =
        shuffledList.filter((hero) => hero.clicked === false).length === 0;

      if (didPlayerClickAll) {
        advanceLevel();
      } else {
        setFunction([...shuffle(shuffledList)]);
      }
    }
  }

  function advanceLevel() {
    setLevel(level + 1);
    setPlayingList(
      heroesList.filter((hero) => hero.id < playingList.length + difficulty)
    );
  }

  return (
    <div>  
        <Card
          cardList={playingList}
          clickedFunction={setClicked}
          setterFunction={setPlayingList}
        />
    </div>
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
