import './DropItemModal.css'
import { useModal } from '../../context/Modal';
import * as itemActions from '../../store/items';
import { useDispatch } from 'react-redux';

export default function DeleteItemModal({ inventoryItem }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const deleteItem = () => {
        const form = new FormData()
        form.append('inventoryItemId', inventoryItem.id)
        dispatch(itemActions.dropItemThunk(form))
        closeModal();
    }

    return (
        <div>
            <div> Are you sure you want to drop these {inventoryItem.quantity} {inventoryItem.name}s?</div>
            <div>
                <div id='drop-button'>
                    <button onClick={deleteItem}>Drop them!</button>
                </div>
                <div id='drop-button'>
                    <button onClick={closeModal}>On second thought, let's keep them.</button>
                </div>
            </div>
        </div>
    )
}