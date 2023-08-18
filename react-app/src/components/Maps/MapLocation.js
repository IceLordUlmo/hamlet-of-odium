import { Link } from 'react-router-dom'
import './MapLocation.css'

const MapLocation = ({ location }) => {
    return (
        <a>
            <p>Location: <Link to={`/maps/${location.id}`}>{location.name}</Link></p>
            <p>Description: {location.description}</p>
        </a>
    )

}

export default MapLocation