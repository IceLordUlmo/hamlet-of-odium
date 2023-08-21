import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Encounter from './LocationEncounter'
import { useEffect } from 'react'
import * as mapActions from '../../store/maps'
import './Location.css'
const Location = () => {
    let { locationId } = useParams()
    const encounters = useSelector((state) => state.maps.encounters)
    const locations = useSelector((state) => state.maps.locations)



    const locationHere = (Object.values(locations).filter((location) => location.id == locationId))[0]
    const encountersList = Object.values(encounters).filter((encounter) => encounter.location_id === parseInt(locationId))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(mapActions.loadMapThunk())
    }, [dispatch])
    if (!locationHere) {
        return null;
    }
    console.log(typeof locationId)
    console.log('encounters ', Object.values(encounters)[0])
    return (
        <div>
            <h1 id='location-text'>{locationHere.name}</h1>
            <h2 id='location-text'> {locationHere.description}</h2>

            <h3>Encounters:</h3>
            <p id='location-grid'>
                {encountersList.map(encounter => <Encounter key={encounter.id} encounter={encounter} />)}
            </p>
        </div>
    )
}

export default Location