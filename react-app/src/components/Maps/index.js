import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session"
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


    function LogOut(e) {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <div>
            <p>Map</p>

            <p>
                {locationsList.map(location => <MapLocation key={location.id} location={location} />)}
            </p>
        </div>
    )
}

export default Map