export default function GameStart({ setDifficulty }) {

    return(
        <div>
            <div>
                <h3>Choose the difficulty</h3>
                <button onClick={() => setDifficulty(4)}>Easy</button>
                <button onClick={() => setDifficulty(5)}>Medium</button>
                <button onClick={() => setDifficulty(6)}>Hard</button>
            </div>
        </div>
    )
}
