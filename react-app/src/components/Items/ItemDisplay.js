import * as itemActions from '../../store/items'
import { useDispatch } from 'react-redux'
import Cost from '../Cost'
const ItemDisplay = ({ item }) => {
    const dispatch = useDispatch()

    function purchase() {
        dispatch(itemActions.buyItemThunk(item.id))
    }

    return (
        < div > Name of item: {item.name} Price: <Cost cost={item.ramen_cost} />
            < button onClick={purchase} > Buy</button >
        </div >
    )
}

export default ItemDisplay