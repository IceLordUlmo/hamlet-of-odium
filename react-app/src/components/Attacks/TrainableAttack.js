import * as attackActions from '../../store/attacks'
import { useDispatch } from 'react-redux'
import Cost from '../Cost'

const TrainableAttack = ({ attack, ramen }) => {
    const dispatch = useDispatch()

    function train() {
        dispatch(attackActions.trainAttackThunk(attack.id))
    }
    return (
        <div><p>Attack name: {attack.name}</p> Price: <Cost cost={attack.ramen_cost} />
            <button onClick={train} hidden={!(ramen >= attack.ramen_cost)}> Buy </button>
        </div>
    )
}

export default TrainableAttack