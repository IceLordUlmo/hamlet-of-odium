import EditItemModal from './EditItemModal'
import DropItemModal from './DropItemModal'
import OpenModalButton from '../OpenModalButton'
const InventoryDisplay = ({ inventoryItem }) => {
    inventoryItem = { ...inventoryItem }

    return (
        <div>{inventoryItem.name} Quantity in inventory: {inventoryItem.quantity}
            <p><OpenModalButton
                modalComponent={<EditItemModal inventoryItem={inventoryItem} />}
                className='item-modal-button'
                buttonText='Edit this Item'

            />
                <OpenModalButton
                    modalComponent={<DropItemModal inventoryItem={inventoryItem} />}
                    className='item-modal-button'
                    buttonText='Drop Item(s)'

                /></p></div>
    )
}

export default InventoryDisplay