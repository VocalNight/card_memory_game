import { useEffect, useState } from "react";
import AttributeView from "./AttributeView";
import Card from "./Card";

export default function GameContainer({ gameStatus, difficulty }) {
  const [heroesList, setHeroesList] = useState([]);
  const [strHeroes, setStrHeroes] = useState([]);
  const [agiHeroes, setAgiHeroes] = useState([]);
  const [intHeroes, setIntHeroes] = useState([]);
  const [level, setLevel] = useState(1);
  const [playingList, setPlayingList] = useState([]);

  useEffect(() => {
    const loadHeroes = async () => {
      setHeroesList(await fetchHeroes());
    };

    loadHeroes();
  }, []);

  useEffect(() => {
    const setListDifficulty = async () => {
        while (playingList.length < 1 + difficulty) {
            setPlayingList(playingList.concat(heroesList.find(hero => hero.id === Math.floor(Math.random() * 140))))
        }
      setPlayingList(heroesList.filter((hero) => hero.id < 1 + difficulty));
    };
    setListDifficulty();
  }, [heroesList]);

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

  function strHerosGenerate() {
    setStrHeroes(heroesList.filter((hero) => hero.attribute === "str"));
  }

  function agiHerosGenerate() {
    setAgiHeroes(heroesList.filter((hero) => hero.attribute === "agi"));
  }

  function intHerosGenerate() {
    setIntHeroes(heroesList.filter((hero) => hero.attribute === "int"));
  }

  function showLists() {
    console.log(heroesList);
    console.log(strHeroes);
    console.log(intHeroes);
    console.log(agiHeroes);
  }

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
      {difficulty === 3 ? (
        <div>
          <h1>Strenght</h1>
          <AttributeView
            heroesList={strHeroes}
            clickedFunction={setClicked}
            setterFunction={setStrHeroes}
          />
          <h1>Agility</h1>
          <AttributeView
            heroesList={agiHeroes}
            clickedFunction={setClicked}
            setterFunction={setAgiHeroes}
          />
          <h1>Intelligence</h1>
          <AttributeView
            heroesList={intHeroes}
            clickedFunction={setClicked}
            setterFunction={setIntHeroes}
          />
          <button onClick={showLists}>Show lists</button>
        </div>
      ) : (
        <Card
          cardList={playingList}
          clickedFunction={setClicked}
          setterFunction={setPlayingList}
        />
      )}
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
