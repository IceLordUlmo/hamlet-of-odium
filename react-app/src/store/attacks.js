// imports
import { refresh } from './session'
// action types
const GET_TRAINABLE = 'odium/attacks/GET_TRAINABLE'
const GET_LEARNED = 'odium/attacks/GET_LEARNED'
// action creators
export const loadTrainableAction = (trainable) => {
    return {
        type: GET_TRAINABLE,
        trainable
    }
}

export const loadLearnedAction = (learned) => {
    return {
        type: GET_LEARNED,
        learned
    }
}
// thunk creators
export const loadTrainableAttacksThunk = () => async (dispatch) => {
    const res = await fetch('/api/attacks', {
        headers: {
            method: "GET",
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();
    console.log('trainable data', data)
    return dispatch(loadTrainableAction(data));
}

export const loadLearnedAttacksThunk = () => async (dispatch) => {
    const res = await fetch('/api/attacks/learned', {
        headers: {
            method: "GET",
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();
    console.log('learned data', data)
    return dispatch(loadLearnedAction(data));
}

export const trainAttackThunk = (formData) => async (dispatch) => {
    const res = await fetch(`api/attacks/train`, {
        method: "POST",
        body: formData
    })

    const data = await res.json();
    dispatch(refresh(data.user_id));
    return dispatch(loadLearnedAttacksThunk())
}

export const editAttackThunk = (formData) => async (dispatch) => {
    const res = await fetch(`api/attacks/train`, {
        method: "PUT",
        body: formData
    })

    const data = await res.json();
    dispatch(refresh(data.user_id));
    return dispatch(loadLearnedAttacksThunk())
}

export const forgetThunk = (formData) => async (dispatch) => {
    await fetch(`api/attacks/train`, {
        method: "DELETE",
        body: formData
    })

    dispatch(loadLearnedAttacksThunk())
}
// initial state
const initialState = { trainable: {}, learned: {} };
// reducer

const Reducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_TRAINABLE:
            newState = { ...state }
            newState.trainable = {}
            action.trainable.forEach((item) => newState.trainable[item.id] = item);
            return newState;
        case GET_LEARNED:
            newState = { ...state }
            newState.learned = {}
            action.learned.forEach((item) => newState.learned[item.id] = item);
            return newState;
        default:
            return state;
    }
}

export default Reducer;