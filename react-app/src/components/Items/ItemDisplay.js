import Cost from '../Cost'
import BuyItemModal from './BuyItemModal'
import OpenModalButton from '../OpenModalButton'
import './ItemDisplay.css'
const ItemDisplay = ({ item, ramen }) => {
    return (
        <div id='item-for-sale'>
            <h4> {item.name}</h4> Price: <Cost cost={item.ramen_cost} />

            {(ramen >= item.ramen_cost) ? <div><OpenModalButton
                modalComponent={<BuyItemModal item={item} />}
                className='item-modal-button'
                buttonText='Buy'
            /></div> :
                <div className='inaccessible'>Too expensive.</div>}
        </div >
    )
}

export default ItemDisplay