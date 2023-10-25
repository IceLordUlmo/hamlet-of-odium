import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Maps.css'
import * as mapActions from '../../store/maps'
import MapLocation from './MapLocation'

const Map = () => {
    const user = useSelector((state) => state.session.user)
    const locations = useSelector((state) => state.maps.locations)

    const dispatch = useDispatch();

    let locationsList = Object.values(locations)


    useEffect(() => {
        dispatch(mapActions.loadMapThunk())
        //dispatch(itemActions.loadInventoryThunk())
    }, [dispatch])

    return (
        <div>
            <h1 id='map-text'>Map</h1>
            <div id='map-grid'>

                {locationsList.map(location => <MapLocation key={location.id} location={location} level={user.level} />)}

            </div>
        </div>
    )
}

export default Map