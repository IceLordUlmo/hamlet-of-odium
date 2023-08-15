import * as itemActions from '../../store/items'
import { useDispatch } from 'react-redux'

const InventoryDisplay = ({ item }) => {
    const dispatch = useDispatch()
    function sell() {
        dispatch(itemActions.sellItemThunk(item.id))
    }

    return (
        <div>{item.name} {item.quantity} <p><button onClick={sell}>Sell</button></p></div>
    )
}

export default InventoryDisplay