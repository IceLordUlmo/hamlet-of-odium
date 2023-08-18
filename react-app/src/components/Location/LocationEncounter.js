import { Link } from 'react-router-dom'
import './LocationEncounter.css'

const Encounter = ({ encounter }) => {
    return (
        <a>
            <p>Encounter: <Link to={`/encounters/${encounter.id}`}>{encounter.name}</Link></p>
            <p>Description: {encounter.description}</p>
        </a>
    )
}

export default Encounter