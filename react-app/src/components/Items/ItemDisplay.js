import * as itemActions from '../../store/items'
import { useDispatch } from 'react-redux'
import Cost from '../Cost'
const ItemDisplay = ({ item, ramen }) => {
    const dispatch = useDispatch()

    function purchase() {
        dispatch(itemActions.buyItemThunk(item.id))
    }

    return (
        < div > Name of item: {item.name} Price: <Cost cost={item.ramen_cost} />
            < button onClick={purchase} hidden={!(ramen >= item.ramen_cost)}> Buy</button >
        </div >
    )
}

export default ItemDisplay