import { useHistory } from 'react-router-dom'
import './LocationEncounter.css'
import * as fightActions from '../../store/fights'
import { useDispatch } from 'react-redux'

const Encounter = ({ encounter }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    function MakeItSo() {
        if (encounter.fight_monster_id) {
            dispatch(fightActions.startFightThunk(encounter.fight_monster_id))
        }
        history.push(`/encounters/${encounter.id}`)
    }
    return (
        <a>
            <p>Encounter: <button onClick={MakeItSo}>{encounter.name}</button></p>
            <p>Description: {encounter.description}</p>
        </a>
    )
}

export default Encounter