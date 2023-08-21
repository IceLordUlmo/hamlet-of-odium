import { Link } from 'react-router-dom'
import './MapLocation.css'

const MapLocation = ({ location, level }) => {
    return (
        <a>
            <div id='location-for-grid'>{level >= location.required_level ?
                <div id='location-name-for-grid'><Link to={`/maps/${location.id}`}><h2>{location.name}</h2></Link></div> :
                <div id='location-name-for-grid' class='inaccessible'><h2>{location.name}</h2> <div>Requires level {location.required_level} to enter.</div></div>}
                <div>{location.description}</div>
            </div>
        </a>
    )

}

export default MapLocation