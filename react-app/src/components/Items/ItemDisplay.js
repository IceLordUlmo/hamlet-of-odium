import Cost from '../Cost'
import BuyItemModal from './BuyItemModal'
import OpenModalButton from '../OpenModalButton'

const ItemDisplay = ({ item, ramen }) => {
    return (
        < div > Name of item: {item.name} Price: <Cost cost={item.ramen_cost} />
            <p hidden={!(ramen >= item.ramen_cost)}>
                <OpenModalButton
                    modalComponent={<BuyItemModal item={item} />}
                    className='item-modal-button'
                    buttonText='Buy'

                />
            </p>
        </div >
    )
}

export default ItemDisplay