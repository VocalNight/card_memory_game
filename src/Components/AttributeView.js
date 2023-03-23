import '../App.css';

export default function AttributeView({heroesList, clickedFunction, setterFunction}) {




  return (
    <div>
      <ul className="strHeroes">
        {heroesList.map((hero) => (
          <li
            key={hero.id}
            onClick={() => clickedFunction(heroesList, hero.id, setterFunction)}
          >
            <img src={hero.img} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
