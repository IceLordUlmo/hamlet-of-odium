import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session"
import './Items.css'
import { Link } from 'react-router-dom'
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


    function LogOut(e) {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <div>
            <p>Items for Sale:</p>
            <p>
                {itemsList.map(item => <ItemDisplay key={item.id} item={item} />)}
            </p>
            <p>
                {inventoryList.map(item => <InventoryDisplay key={item.id} item={item} />)}
            </p>
            <Link to='/'>Main</Link>
            <button onClick={LogOut}>Log Out</button>
        </div>
    )
}

export default Items