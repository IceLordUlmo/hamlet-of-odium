import EditAttackModal from './EditAttackModal'
import OpenModalButton from '../OpenModalButton'
import { useDispatch } from 'react-redux'
import * as attackActions from '../../store/attacks'
const LearnedAttack = ({ userAttack }) => {
    const dispatch = useDispatch()

    function forget() {
        const form = new FormData()
        form.append('userAttackId', userAttack.id)
        dispatch(attackActions.forgetThunk(form))
    }

    return (

        <div><p>Attack name: {userAttack.name}</p> Damage: {userAttack.damage}
            <OpenModalButton
                modalComponent={<EditAttackModal userAttack={userAttack} />}
                className='attack-modal-button'
                buttonText='Update' />
            <button onClick={forget}>Forget</button>
        </div>
    )
}

export default LearnedAttack