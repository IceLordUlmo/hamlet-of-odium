import EditAttackModal from './EditAttackModal'
import ForgetAttackModal from './ForgetAttackModal'
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
            <OpenModalButton
                modalComponent={<ForgetAttackModal userAttack={userAttack} />}
                className='attack-modal-button'
                buttonText='Forget' />
        </div>
    )
}

export default LearnedAttack