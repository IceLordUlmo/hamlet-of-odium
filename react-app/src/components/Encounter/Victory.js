import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import './Victory.css'
const Victory = () => {
    const fight = useSelector((store) => store.fights.defeated)
    const monsters = useSelector((store) => store.fights.monsters)
    if (!fight) {
        return null;
    }
    const monster = monsters[fight.monster_id];

    return (<div id='victory-container'>
        <h1>Victory</h1>
        <h2>The {monster.name} has been defeated!</h2>
        <h3>You receive:</h3>
        <div id='rewards-styling'>
            <div id='victory-rewards'>
                <h3>
                    Ramen: {monster.ramen}
                </h3>
                <h3>
                    Experience: {monster.experience}
                </h3>

            </div>

        </div>
        <h3><Link to='/maps'>Back to Maps</Link></h3>
    </div>)
}

export default Victory