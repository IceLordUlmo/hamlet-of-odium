import './EditItemModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useEffect, useState } from 'react'
import * as itemActions from '../../store/items.js'
import { useHistory } from 'react-router-dom'

export default function EditItemModal({ inventoryItem }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [name, setName] = useState(inventoryItem.name)
    const [description, setDescription] = useState(inventoryItem.description)
    const [error, setError] = useState([]);
    const [disableButton, setDisableButton] = useState(true);
    const user = useSelector((state) => state.session.user)
    const handleSubmit = async (e) => {
        e.preventDefault();

        errorCheck()
        if (error.length > 0) {
            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('description', description)
        form.append('inventoryItemId', inventoryItem.id)
        //form.append('damage')

        dispatch(itemActions.editItemThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error)
            } else {
                history.push('/items')
                closeModal();
            }
        })
    }

    function errorCheck() {
        const newErrors = []
        let max = Math.floor(user.ramen / inventoryItem.ramen_cost)
        if (max > 1000) max = 1000;
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
        <div className='modal-external'>
            <h1>Name and describe this item:</h1>
            {error.length ? error.map(e => <p key={error.indexOf(e)} id='error'>{e}</p>) : null}
            <form className='buy-item-form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor='modal-label'>
                    Item Name
                </label>
                <input
                    id='modal-text-field'
                    type='text'
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name this item' />
                <label htmlFor='modal-label'>
                    Item Description
                </label>
                <input
                    id='modal-text-field'
                    type='text'
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Describe this item' />

                <button id='modal-submit-button'
                    type='submit'
                    disabled={disableButton}>
                    Submit Item Changes
                </button>
            </form>
        </div>
    )
}