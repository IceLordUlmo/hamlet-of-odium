import './ForgetAttackModal.css'
import { useModal } from '../../context/Modal';
import * as attackActions from '../../store/attacks';
import { useDispatch } from 'react-redux';

export default function ForgetAttackModal({ userAttack }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const deleteItem = () => {
        const form = new FormData()
        form.append('userAttackId', userAttack.id)
        dispatch(attackActions.forgetThunk(form))
        closeModal();
    }

    return (
        <div>
            <div> Are you sure you want to forget the {userAttack.name} attack?</div>
            <div>
                <div id='forget-button'>
                    <button onClick={deleteItem}>I don't know kung-fu! (forget)</button>
                </div>
                <div id='forget-button'>
                    <button onClick={closeModal}>Remember us. Remember that we once lived. (don't forget)</button>
                </div>
            </div>
        </div>
    )
}