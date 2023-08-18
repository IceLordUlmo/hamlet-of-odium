import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
const Victory = () => {
    const fight = useSelector((store) => store.fights.defeated)
    const monsters = useSelector((store) => store.fights.monsters)

    return (<div>
        <p>Victory</p>
        <p>
            Ramen: {monsters[fight.monster_id].ramen}
        </p>
        <p>
            Experience: {monsters[fight.monster_id].experience}
        </p>
        <Link to='/maps'>Back to Maps</Link>
    </div>)
}

export default Victory