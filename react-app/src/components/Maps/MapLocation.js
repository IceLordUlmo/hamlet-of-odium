const MapLocation = ({ location }) => {
    return (
        <a>
            <p>Location: {location.name}</p>
            <p>Description: {location.description}</p>
        </a>
    )

}

export default MapLocation