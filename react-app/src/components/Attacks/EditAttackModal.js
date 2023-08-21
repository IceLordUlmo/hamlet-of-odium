import './BuyAttackModal.js'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useState, useEffect } from 'react'
import * as attackActions from '../../store/attacks.js'
import { useHistory } from 'react-router-dom'

export default function AttackEditFormModal({ userAttack }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [name, setName] = useState(userAttack.name)
    const [description, setDescription] = useState(userAttack.description)

    const [error, setError] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        errorCheck()
        if (error.length) {
            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('description', description)
        form.append('userAttackId', userAttack.id)
        //form.append('damage')
        dispatch(attackActions.editAttackThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error)
            } else {
                history.push('/attacks')
                closeModal();
            }
        })
    }
    function errorCheck() {
        const newErrors = []
        if (!name.length || name.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (!description.length || description.length > 255) newErrors.push("Description must be between 1 and 255 characters");

        if (newErrors.length) {
            setError(newErrors);
            setDisableButton(true);
        };
    }

    useEffect(() => {
        setDisableButton(false);
        errorCheck();
    }, [name, description])

    return (
        <div className='edit-attack-modal-external'>
            <h1>Name and describe this attack:</h1>
            {error.length ? error.map(e => <p className='buy-attack-modal-error'>{e}</p>) : null}
            <form className='buy-attack-form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor='buy-attack-label'>
                    Attack Name
                </label>
                <input
                    id='buy-attack-text-field'
                    type='text'
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name this attack' />
                <label htmlFor='buy-attack-label'>
                    Attack Description
                </label>
                <input
                    id='buy-attack-text-field'
                    type='text'
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Describe this attack' />
                <button id='edit-attack-submit-button' type='submit'
                    disabled={disableButton}>
                    Update Attack Information
                </button>
            </form>
        </div>
    )
}