import './BuyItemModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useEffect, useState } from 'react'
import * as itemActions from '../../store/items.js'
import { useHistory } from 'react-router-dom'

export default function BuyItemModal({ item }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
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
        form.append('quantity', quantity)
        form.append('itemId', item.id)
        //form.append('damage')

        dispatch(itemActions.buyItemThunk(form)).then((responseData) => {
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
        let max = Math.floor(user.ramen / item.ramen_cost)
        if (max > 1000) max = 1000;
        if (name.length < 1 || name.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (description.length < 1 || description.length > 255) newErrors.push("Description must be between 1 and 255 characters");
        if (parseInt(quantity) < 1 || parseInt(quantity) > max) newErrors.push(`Quantity must be between 1 and ${max}`)
        setError(newErrors);

        if (newErrors.length) {
            setDisableButton(true);
        };
    }

    useEffect(() => {
        setDisableButton(false);
        errorCheck();
    }, [name, description, quantity])

    return (
        <div className='buy-item-modal-external'>
            <h1>Name and describe this item:</h1>
            {error.length ? error.map(e => <p className='buy-item-modal-error'>{e}</p>) : null}
            <form className='buy-item-form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor='buy-item-label'>
                    Item Name
                </label>
                <input
                    id='buy-item-text-field'
                    type='text'
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name this item' />
                <label htmlFor='buy-item-label'>
                    Item Description
                </label>
                <input
                    id='buy-item-text-field'
                    type='text'
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Describe this item' />
                <input
                    id='buy-item-text-field'
                    type='integer'
                    value={quantity}
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder='How many would you like to buy?' />
                <button id='buy-item-submit-button'
                    type='submit'
                    disabled={disableButton}>
                    Make Purchase
                </button>
            </form>
        </div>
    )
}