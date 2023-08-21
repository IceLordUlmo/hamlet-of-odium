import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Items.css'
import * as itemActions from '../../store/items'
import ItemDisplay from './ItemDisplay'
import InventoryDisplay from './InventoryDisplay'

const Items = () => {
    const user = useSelector((state) => state.session.user)
    const items = useSelector((state) => state.items.items)
    const inventory = useSelector((state) => state.items.inventory)
    const dispatch = useDispatch();

    let itemsList = Object.values(items)
    let inventoryList = Object.values(inventory)

    useEffect(() => {
        dispatch(itemActions.loadItemsThunk())
        dispatch(itemActions.loadInventoryThunk())
    }, [dispatch])

    return (
        <div>
            <p>Items for Sale:</p>
            <p>
                {itemsList.map(item => <ItemDisplay key={item.id} item={item} ramen={user.ramen} />)}
            </p>
            <p>
                {inventoryList.map(item => <InventoryDisplay key={item.id} inventoryItem={item} />)}
            </p>
        </div>
    )
}

export default Items