import { Link } from "react-router-dom"

export default function NonCombat({ encounter, items }) {


    return (
        <div>
            <h1>{encounter.name}</h1>
            <h2>{encounter.description}</h2>
            {encounter.reward_item_id ? <h3>You get: {items[encounter.reward_item_id].name}</h3> : null}
            <Link to='/maps'>Back to Maps</Link>
        </div >
    )
}