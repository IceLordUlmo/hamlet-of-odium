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
        if (parseInt(quantity) < 1 || parseInt(quantity) > max) newErrors.push(`Quantity must be between 1 and ${max}`)
        setError(newErrors);

        if (newErrors.length) {
            setDisableButton(true);
        };
    }

    useEffect(() => {
        setDisableButton(false);
        errorCheck();
    }, [quantity])

    return (
        <div className='modal-external'>
            <h1>Name and describe this item:</h1>
            {error.length ? error.map(e => <p id='error'>{e}</p>) : null}
            <form className='modal-form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor='modal-label'>
                    Item Name: {item.name}
                </label>

                <label htmlFor='modal-label'>
                    Item Description: {item.description}
                </label>

                <label htmlFor='modal-label'>
                    Quantity
                </label>
                <input
                    id='modal-text-field'
                    type='integer'
                    value={quantity}
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder='How many would you like to buy?' />
                <button id='modal-submit-button'
                    type='submit'
                    disabled={disableButton}>
                    Make Purchase
                </button>
            </form>
        </div>
    )
}