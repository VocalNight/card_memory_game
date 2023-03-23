
export default function Header({ gameScore, highestScore }) {

    return(
        <div>
            <h1>Dota memory</h1>
            <div>
                Score: {gameScore}
                Highest score: {highestScore}
            </div>
        </div>
    )
}
