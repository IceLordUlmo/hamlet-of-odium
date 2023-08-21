import EditItemModal from './EditItemModal'
import DropItemModal from './DropItemModal'
import OpenModalButton from '../OpenModalButton'
import './InventoryDisplay.css'
const InventoryDisplay = ({ inventoryItem }) => {
    inventoryItem = { ...inventoryItem }

    return (
        <div><h2>{inventoryItem.name}</h2><h3>{inventoryItem.description}</h3> Quantity in inventory: {inventoryItem.quantity}
            <div id='display-modal-button'>
                <OpenModalButton
                    id='display-modal-button'
                    modalComponent={<EditItemModal inventoryItem={inventoryItem} />}
                    className='item-modal-button'
                    buttonText='Edit this Item'

                />
            </div>
            <div id='display-modal-button'>


                <OpenModalButton

                    modalComponent={<DropItemModal inventoryItem={inventoryItem} />}
                    className='item-modal-button'
                    buttonText='Drop Item(s)'

                />
            </div>
        </div>
    )
}

export default InventoryDisplay