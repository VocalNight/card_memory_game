export default function Card({ cardList, clickedFunction, setterFunction }) {

    return(
        <div>
            <ul className="strHeroes">
            {cardList.map((hero) => (
          <li
            key={hero.id}
            onClick={() => clickedFunction(cardList, hero.id, setterFunction)}
          >
            <img src={hero.img} alt="" />
          </li>
        ))}
            </ul>
        </div>
    )
}
