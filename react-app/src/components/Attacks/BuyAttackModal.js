import './BuyAttackModal.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useState, useEffect } from 'react'
import * as attackActions from '../../store/attacks.js'
import { useHistory } from 'react-router-dom'

export default function AttackFormModal({ attack }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [error, setError] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();


        errorCheck()
        if (error.length > 0) {

            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('description', description)
        form.append('attackId', attack.id)
        //form.append('damage')

        dispatch(attackActions.trainAttackThunk(form)).then((responseData) => {
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
        if (name.length < 1 || name.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (description.length < 1 || description.length > 255) newErrors.push("Description must be between 1 and 255 characters");

        setError(newErrors);

        if (newErrors.length) {
            setDisableButton(true);
        };
    }

    useEffect(() => {
        setDisableButton(false);
        errorCheck();
    }, [name, description])

    return (
        <div className='buy-attack-modal-external'>
            <h1>Name and describe this attack:</h1>
            {error.length ? error.map(e => <p key={error.indexOf(e)} className='buy-attack-modal-error'>{e}</p>) : null}
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
                <button id='buy-attack-submit-button'
                    type='submit'
                    disabled={disableButton}>
                    Create New Attack
                </button>
            </form>
        </div>
    )
}