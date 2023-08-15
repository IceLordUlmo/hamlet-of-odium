import * as itemActions from '../../store/items'
import { useDispatch } from 'react-redux'

const ItemDisplay = ({ item }) => {
    const dispatch = useDispatch()

    function purchase() {
        dispatch(itemActions.buyItemThunk(item.id))
    }

    return (
        < div > Name of item: {item.name} Price: {item.ramen_cost} ramen
            < button onClick={purchase} > Buy</button >
        </div >
    )
}

export default ItemDisplay