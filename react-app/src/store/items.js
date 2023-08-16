// imports
import { refresh } from './session'

// action types
const GET_ITEMS = 'odium/items/GET_ITEMS'
const GET_INVENTORY = 'odium/items/GET_INVENTORY'

// action creators
export const loadItemsAction = (items) => {
    return {
        type: GET_ITEMS,
        items
    }
}

export const loadInventoryAction = (inventory) => {
    return {
        type: GET_INVENTORY,
        inventory
    }
}

// thunk creators
export const loadItemsThunk = () => async (dispatch) => {
    const res = await fetch('/api/items', {
        headers: {
            method: "GET",
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    return dispatch(loadItemsAction(data));
}

export const loadInventoryThunk = () => async (dispatch) => {
    const res = await fetch('/api/items/inventory', {
        headers: {
            method: "GET",
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    return dispatch(loadInventoryAction(data));
}

export const buyItemThunk = itemId => async (dispatch) => {
    const res = await fetch(`api/items/${itemId}/buy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            quantity: 1
        })
    })
    const data = await res.json();
    dispatch(refresh(data.user_id))
    return dispatch(loadInventoryThunk())
}

export const sellItemThunk = itemId => async (dispatch) => {
    const res = await fetch(`api/items/${itemId}/buy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            quantity: -1
        })
    })
    const data = await res.json();
    dispatch(refresh(data.user_id))
    return dispatch(loadInventoryThunk())
}

// initial state
const initialState = { items: {}, inventory: {} };
// reducer
const itemsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_ITEMS:
            newState = { ...state }
            newState.items = {}
            action.items.forEach((item) => newState.items[item.id] = item);
            return newState;
        case GET_INVENTORY:
            newState = { ...state }
            newState.inventory = {}
            action.inventory.forEach((item) => newState.inventory[item.id] = item);
            return newState;
        default:
            return state;
    }
}

export default itemsReducer;