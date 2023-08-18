import * as attackActions from '../../store/attacks'
import { useDispatch } from 'react-redux'
import Cost from '../Cost'

const LearnedAttack = ({ attack }) => {
    const dispatch = useDispatch()

    return (
        <div><p>Attack name: {attack.name}</p> Damage: {attack.damage}

        </div>
    )
}

export default LearnedAttack